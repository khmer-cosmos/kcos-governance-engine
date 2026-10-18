import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const ROOT = process.env.GITHUB_WORKSPACE || process.cwd();
const CONFIG_PATH = path.join(ROOT, 'docs/governance/ssot-inventory/scope.json');
const REPORT_PATH = process.env.REPORT_PATH || path.join(os.tmpdir(), 'kcos-ssot-inventory.json');
const SUMMARY_PATH = process.env.GITHUB_STEP_SUMMARY;
const API = 'https://api.github.com';
const token = process.env.KCOS_AUDIT_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const findings = [];
const repositoryReports = [];
const scanErrors = [];
let frozenBaselineVerified = false;

function addFinding(code, severity, repository, filePath, detail, evidence = {}) {
  const key = [code, repository || '', filePath || '', detail].join('|');
  if (!findings.some(x => x.key === key)) findings.push({ key, code, severity, repository: repository || null, path: filePath || null, detail, evidence });
}
function recordUnreadableCandidate(repo, entry, result, item) {
  item.errors.push(entry.path + ': ' + result.reason);
  scanErrors.push(repo.full_name + '/' + entry.path + ': candidate content not inspected (' + result.reason + ')');
  addFinding('CANDIDATE_CONTENT_UNREADABLE', 'BLOCKED', repo.full_name, entry.path,
    'A discovered candidate file was not inspected; scan completeness must remain false.', {
      reason: result.reason, blob_sha: entry.sha, size: entry.size ?? null, head_sha: item.head_sha
    });
}
function requireCommitTreeSha(commit) {
  const sha = commit?.commit?.tree?.sha;
  if (typeof sha !== 'string' || !/^[0-9a-f]{40}$/i.test(sha)) {
    throw new Error('Default-branch commit response did not include a valid commit.tree.sha; refusing to guess a tree identifier.');
  }
  return sha;
}
function isScaffold(p) {
  return (config.governance_scaffold_paths || []).includes(p);
}
function isCandidate(p) {
  const fixed = new Set([
    'docs/governance/read-gate/KCOS-READ-GATE-001.md',
    'docs/governance/read-gate/READ-RECEIPT.md',
    'docs/governance/execution-infrastructure/EXECUTION-MATERIAL-MANIFEST.md',
    '.github/workflows/kcos-read-gate.yml'
  ]);
  if (fixed.has(p)) return true;
  const base = path.posix.basename(p);
  if (/^(README|AGENTS)\.md$/i.test(base)) return true;
  const allowedDir = /^(docs|contracts|spec|specs|architecture|ssot|schema|schemas|governance|production|database|db|prisma|migrations|config|src|server|public|infra|infrastructure|deploy|product|requirements|design)\//i.test(p);
  const relevantName = /(?:ssot|baseline|contract|spec|architecture|decision|charter|schema|registry|manifest|freeze|read-gate|prd|requirement|product|design|data-model|data-model|erd|api|domain|policy|standard|blueprint|adr)/i.test(base);
  return allowedDir && relevantName && /\.(md|mdx|yaml|yml|json|toml|sql|proto|ts|tsx|js|mjs|py|go)$/i.test(p);
}
function extractReadmeSSOTPaths(text) {
  const found = new Set();
  for (const line of text.split(/\r?\n/)) {
    if (!/(?:SSOT|Canonical SSOT|权威基线)\s*:/i.test(line)) continue;
    const match = line.match(/(?:SSOT|Canonical SSOT|权威基线)\s*:\s*(.+)$/i);
    if (!match) continue;
    const value = match[1].trim().replaceAll(String.fromCharCode(96), '').replace(/^["']|["']$/g, '').replace(/^[*:\s]+/g, '').replace(/[),;*]+$/g, '').split(/\s+/)[0];
    if (value && !value.includes('://') && !/\s/.test(value)) found.add(value.replace(/^\.\//, ''));
  }
  return [...found];
}
function hasDomainSignal(p, text) {
  if (isScaffold(p)) return false;
  const base = path.posix.basename(p);
  const nameSignal = /(?:ssot|baseline|contract|spec|architecture|schema|decision|charter)/i.test(base);
  const contentSignal = /(?:ssot\s*:\s*(?:true|yes)|status\s*:\s*frozen|\*\*status:\*\*\s*frozen|FROZEN BASELINE|唯一真值|single source of truth)/i.test(text);
  return nameSignal || contentSignal;
}
async function api(endpoint) {
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  if (token) headers.Authorization = 'Bearer ' + token;
  const response = await fetch(API + endpoint, { headers });
  const raw = await response.text();
  let body;
  try { body = raw ? JSON.parse(raw) : null; } catch { body = { message: raw.slice(0, 500) }; }
  if (!response.ok) {
    const error = new Error('GitHub API ' + response.status + ' for ' + endpoint + ': ' + (body?.message || response.statusText));
    error.status = response.status;
    throw error;
  }
  return body;
}
async function listPages(endpoint) {
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const separator = endpoint.includes('?') ? '&' : '?';
    const items = await api(endpoint + separator + 'per_page=100&page=' + page);
    if (!Array.isArray(items)) throw new Error('Expected repository list from ' + endpoint);
    all.push(...items);
    if (items.length < 100) return all;
  }
  throw new Error('Pagination safety limit reached for ' + endpoint);
}
async function discoverRepositories() {
  const found = new Map();
  const orgRepos = await listPages('/orgs/' + encodeURIComponent(config.organization) + '/repos?type=all');
  for (const r of orgRepos) found.set(r.full_name.toLowerCase(), { ...r, discovery_source: 'organization:' + config.organization });
  for (const owner of config.additional_owners || []) {
    let repos;
    try { repos = await listPages('/users/' + encodeURIComponent(owner) + '/repos?type=owner'); }
    catch (error) {
      if (error.status !== 404) throw error;
      repos = await listPages('/orgs/' + encodeURIComponent(owner) + '/repos?type=all');
    }
    for (const r of repos) if (!found.has(r.full_name.toLowerCase())) found.set(r.full_name.toLowerCase(), { ...r, discovery_source: 'additional-owner:' + owner });
  }
  return [...found.values()].sort((a, b) => a.full_name.localeCompare(b.full_name));
}
async function readBlob(repo, entry) {
  if (typeof entry.size === 'number' && entry.size > config.max_blob_bytes_to_read) {
    return { skipped: true, reason: 'blob exceeds configured read limit', size: entry.size, sha: entry.sha };
  }
  const blob = await api('/repos/' + repo.full_name + '/git/blobs/' + entry.sha);
  if (blob.encoding !== 'base64' || !blob.content) return { skipped: true, reason: 'blob content encoding unsupported', sha: entry.sha };
  return { content: Buffer.from(blob.content.replace(/\n/g, ''), 'base64').toString('utf8'), sha: entry.sha };
}
async function scanRepository(repo) {
  const item = {
    repository: repo.full_name, discovery_source: repo.discovery_source,
    default_branch: repo.default_branch || null, archived: Boolean(repo.archived),
    visibility: repo.visibility || (repo.private ? 'private' : 'public'),
    head_sha: null, tree_sha: null, tree_truncated: false,
    candidate_files_discovered: 0, candidate_files_reviewed: [],
    read_gate: { spec: false, receipt: false, workflow: false },
    readme_ssot_references: [], domain_ssot_candidates: [], errors: []
  };
  try {
    const commit = await api('/repos/' + repo.full_name + '/commits/' + encodeURIComponent(repo.default_branch));
    item.head_sha = commit.sha;
    const commitTreeSha = requireCommitTreeSha(commit);
    const tree = await api('/repos/' + repo.full_name + '/git/trees/' + encodeURIComponent(commitTreeSha) + '?recursive=1');
    item.tree_sha = tree.sha;
    item.tree_truncated = Boolean(tree.truncated);
    if (tree.truncated) {
      item.errors.push('Git tree is truncated; candidate discovery is incomplete.');
      scanErrors.push(repo.full_name + ': truncated Git tree');
      addFinding('GIT_TREE_TRUNCATED', 'BLOCKED', repo.full_name, null,
        'GitHub returned a truncated recursive tree; candidate discovery cannot be treated as complete.', { head_sha: item.head_sha, tree_sha: tree.sha });
    }
    const blobs = (tree.tree || []).filter(e => e.type === 'blob');
    const byPath = new Map(blobs.map(e => [e.path, e]));
    const candidates = blobs.filter(e => isCandidate(e.path));
    item.candidate_files_discovered = candidates.length;
    const limit = Number(config.candidate_file_limit_per_repository || 30);
    const fixedPaths = ['README.md','AGENTS.md','docs/governance/read-gate/KCOS-READ-GATE-001.md','docs/governance/read-gate/READ-RECEIPT.md','docs/governance/execution-infrastructure/EXECUTION-MATERIAL-MANIFEST.md','.github/workflows/kcos-read-gate.yml'];
    const priority = p => { const i = fixedPaths.indexOf(p); return i < 0 ? 999 : i; };
    candidates.sort((a,b) => priority(a.path) - priority(b.path) || a.path.localeCompare(b.path));
    const selected = candidates.slice(0, limit);
    if (candidates.length > selected.length) {
      item.errors.push('Candidate content review capped at ' + limit + ' of ' + candidates.length + ' files.');
      scanErrors.push(repo.full_name + ': candidate review cap reached');
      addFinding('CANDIDATE_REVIEW_CAP_REACHED', 'BLOCKED', repo.full_name, null,
        'Candidate review limit prevented inspection of every discovered candidate file.', {
          discovered: candidates.length, reviewed_limit: limit, head_sha: item.head_sha
        });
    }
    const contents = new Map();
    for (const entry of selected) {
      try {
        const result = await readBlob(repo, entry);
        item.candidate_files_reviewed.push({ path: entry.path, blob_sha: entry.sha, size: entry.size ?? null, ...result });
        if (result.content !== undefined) contents.set(entry.path, result.content);
        else recordUnreadableCandidate(repo, entry, result, item);
      } catch (error) {
        recordUnreadableCandidate(repo, entry, { reason: 'blob fetch failed: ' + error.message }, item);
      }
    }
    const pathSet = new Set(blobs.map(e => e.path));
    const readmePaths = [...contents.keys()].filter(p => /^(README|AGENTS)\.md$/i.test(path.posix.basename(p)));
    item.readme_ssot_references = readmePaths.flatMap(sourcePath =>
      extractReadmeSSOTPaths(contents.get(sourcePath) || '').map(ref => ({
        source_path: sourcePath, path: ref, exists: pathSet.has(ref), is_governance_scaffold: isScaffold(ref)
      }))
    );
    for (const ref of item.readme_ssot_references) {
      if (!ref.exists) addFinding('BROKEN_README_SSOT_REFERENCE', 'HIGH', repo.full_name, ref.source_path,
        'Repository guidance file declares an SSOT path absent from the default-branch tree.', { reference: ref.path, head_sha: item.head_sha });
      if (ref.is_governance_scaffold) addFinding('GOVERNANCE_ENTRYPOINT_NOT_DOMAIN_PROOF', 'REVIEW', repo.full_name, ref.source_path,
        'Repository guidance file points to a governance lifecycle entrypoint; this does not prove project/domain SSOT coverage.', { reference: ref.path, head_sha: item.head_sha });
    }
    item.read_gate.spec = pathSet.has('docs/governance/read-gate/KCOS-READ-GATE-001.md');
    item.read_gate.receipt = pathSet.has('docs/governance/read-gate/READ-RECEIPT.md');
    item.read_gate.workflow = pathSet.has('.github/workflows/kcos-read-gate.yml');
    if (!item.read_gate.spec || !item.read_gate.receipt || !item.read_gate.workflow) {
      addFinding('READ_GATE_MATERIAL_INCOMPLETE', 'HIGH', repo.full_name, null,
        'One or more expected read-gate materials are absent on the default branch.', item.read_gate);
    }
    const workflow = contents.get('.github/workflows/kcos-read-gate.yml') || '';
    const receipt = contents.get('docs/governance/read-gate/READ-RECEIPT.md') || '';
    if (/ahlis0201-ui\/kcos-governance-engine/i.test(workflow)) {
      addFinding('LEGACY_CANONICAL_REPO_REFERENCE', 'REVIEW', repo.full_name, '.github/workflows/kcos-read-gate.yml',
        'Read-gate workflow references the pre-migration repository owner; verify redirect behavior and migrate through a controlled PR.', { head_sha: item.head_sha });
    }
    const workflowSha = (workflow.match(/KCOS_SSOT_SHA:\s*([^\s#]+)/) || [])[1];
    const receiptSha = (receipt.match(/SSOT Commit \/ Blob SHA:\s*([^\s]+)/) || [])[1];
    if (workflowSha && receiptSha && workflowSha !== receiptSha) {
      addFinding('SSOT_RECEIPT_WORKFLOW_SHA_MISMATCH', 'HIGH', repo.full_name, 'docs/governance/read-gate/READ-RECEIPT.md',
        'Receipt SHA does not match workflow-pinned SSOT commit SHA.', { workflow_sha: workflowSha, receipt_sha: receiptSha });
    }
    for (const entry of selected) {
      const text = contents.get(entry.path);
      if (text !== undefined && hasDomainSignal(entry.path, text)) {
        item.domain_ssot_candidates.push({
          path: entry.path, blob_sha: entry.sha,
          explicit_ssot_marker: /ssot\s*:\s*(?:true|yes)|SSOT\s*:\s*(?:YES|TRUE)|Canonical SSOT/i.test(text),
          frozen_marker: /status\s*:\s*frozen|\*\*status:\*\*\s*frozen|FROZEN BASELINE/i.test(text),
          is_governance_scaffold: isScaffold(entry.path)
        });
      }
    }
    if (!item.domain_ssot_candidates.some(x => !x.is_governance_scaffold)) {
      addFinding('PROJECT_DOMAIN_SSOT_REVIEW_REQUIRED', 'REVIEW', repo.full_name, null,
        'Automated scan did not identify a non-scaffold domain SSOT candidate among reviewed files. This is a review prompt, not proof that no SSOT exists.', {
          reviewed: item.candidate_files_reviewed.length, discovered: item.candidate_files_discovered, head_sha: item.head_sha
        });
    }
  } catch (error) {
    item.errors.push(error.message);
    scanErrors.push(repo.full_name + ': ' + error.message);
    addFinding('REPOSITORY_SCAN_INCOMPLETE', 'BLOCKED', repo.full_name, null,
      'Repository could not be fully inspected; absence of evidence must not be interpreted as absence of SSOT.', { error: error.message });
  }
  return item;
}
function renderMarkdown(report) {
  const lines = [
    '# KCOS SSOT Inventory — Automated Evidence Report', '',
    '- Inventory ID: ' + report.inventory_id,
    '- Generated at: ' + report.generated_at,
    '- Scope: ' + report.scope.organization + ' organization plus additional owners ' + report.scope.additional_owners.join(', '),
    '- Repositories discovered: ' + report.repository_count,
    '- Complete scan: ' + report.complete,
    '- Findings: ' + report.findings.length, '',
    '> Automated results are candidate discovery and integrity checks. They do not certify a document as an authoritative SSOT. Human review is required before marking a domain baseline VERIFIED.', '',
    '## Findings', ''
  ];
  if (!report.findings.length) lines.push('No findings detected by configured checks.');
  for (const f of report.findings.slice(0, 150)) {
    lines.push('- **' + f.severity + ' · ' + f.code + '** — ' + (f.repository || 'ecosystem') + (f.path ? ' / ' + f.path : '') + ': ' + f.detail);
  }
  lines.push('', '## Repository inventory', '', '| Repository | Default branch | HEAD | Gate materials | Domain SSOT candidates reviewed | Errors |', '|---|---|---|---|---:|---:|');
  for (const r of report.repositories) {
    lines.push('| ' + r.repository + ' | ' + (r.default_branch || 'UNKNOWN') + ' | ' + (r.head_sha || 'UNKNOWN') + ' | ' + ['spec','receipt','workflow'].map(k => k + '=' + (r.read_gate[k] ? 'yes' : 'no')).join(', ') + ' | ' + r.domain_ssot_candidates.length + ' | ' + r.errors.length + ' |');
  }
  lines.push('', '## Completeness limitations', '');
  if (report.scan_errors.length) for (const e of report.scan_errors.slice(0, 100)) lines.push('- ' + e);
  else lines.push('- No scan errors were recorded.');
  lines.push('', 'This report is generated by tools/ssot-inventory/scan.mjs. It is not itself an SSOT registry and must not silently promote candidates to authoritative baselines.');
  return lines.join('\n') + '\n';
}
function selfTest() {
  assert.equal(requireCommitTreeSha({ commit: { tree: { sha: '0123456789abcdef0123456789abcdef01234567' } } }), '0123456789abcdef0123456789abcdef01234567');
  assert.throws(() => requireCommitTreeSha({ sha: '0123456789abcdef0123456789abcdef01234567' }), /commit\.tree\.sha/);
  assert.equal(isScaffold('docs/governance/lifecycle/REPOSITORY-END-STATE-001.md'), true);
  assert.equal(isCandidate('docs/contracts/ACCOUNT-CONTRACT-001.md'), true);
  assert.equal(isCandidate('packages/api/README.md'), true);
  assert.equal(isCandidate('docs/product/PRODUCT-PRD.md'), true);
  assert.equal(isCandidate('src/index.ts'), false);
  assert.deepEqual(extractReadmeSSOTPaths('SSOT: ' + String.fromCharCode(96) + 'docs/contracts/IDENTITY-001.md' + String.fromCharCode(96)), ['docs/contracts/IDENTITY-001.md']);
  assert.equal(hasDomainSignal('docs/contracts/IDENTITY-001.md', 'Status: FROZEN'), true);
  const beforeScanErrors = scanErrors.length;
  const fixture = { errors: [], head_sha: '0123456789abcdef0123456789abcdef01234567' };
  recordUnreadableCandidate(
    { full_name: 'self-test/repository' },
    { path: 'docs/SSOT.md', sha: 'abcdef0123456789abcdef0123456789abcdef01', size: 600001 },
    { reason: 'blob exceeds configured read limit' },
    fixture
  );
  assert.equal(fixture.errors.length, 1);
  assert.equal(scanErrors.length, beforeScanErrors + 1);
  assert.equal(findings.some(x => x.code === 'CANDIDATE_CONTENT_UNREADABLE' && x.repository === 'self-test/repository'), true);
  console.log('KCOS-SSOT-INVENTORY-001 self-test PASS');
}
if (process.argv.includes('--self-test')) {
  selfTest();
} else {
  try {
    if (!token) throw new Error('KCOS_AUDIT_TOKEN is required for a complete private-repository inventory; configure it as a repository Actions secret with read access to the declared scope.');
    const discovered = await discoverRepositories();
    for (const repo of discovered) repositoryReports.push(await scanRepository(repo));
    const central = repositoryReports.find(r => r.repository.toLowerCase() === config.canonical_governance_ssot.repository.toLowerCase());
    const centralDoc = central?.candidate_files_reviewed.find(f => f.path === config.canonical_governance_ssot.path)?.content || '';
    const scopeMatch = centralDoc.match(/^scope:\s*\n((?:\s+-[^\n]+\n?)+)/m);
    const declaredScope = scopeMatch ? [...scopeMatch[1].matchAll(/^\s+-\s*(.+?)\s*$/gm)].map(m => m[1]) : [];
    try {
      const pinnedPath = config.canonical_governance_ssot.path.split('/').map(encodeURIComponent).join('/');
      const pinned = await api('/repos/' + config.canonical_governance_ssot.repository + '/contents/' + pinnedPath +
        '?ref=' + encodeURIComponent(config.canonical_governance_ssot.frozen_commit_sha));
      if (pinned.sha !== config.canonical_governance_ssot.blob_sha) {
        addFinding('CENTRAL_FROZEN_SSOT_BLOB_MISMATCH', 'HIGH', config.canonical_governance_ssot.repository,
          config.canonical_governance_ssot.path, 'The frozen commit resolves to a different blob SHA than the scope contract pins.',
          { expected_blob_sha: config.canonical_governance_ssot.blob_sha, actual_blob_sha: pinned.sha, frozen_commit_sha: config.canonical_governance_ssot.frozen_commit_sha });
      } else {
        frozenBaselineVerified = true;
      }
    } catch (error) {
      addFinding('CENTRAL_FROZEN_SSOT_SOURCE_UNVERIFIED', 'BLOCKED', config.canonical_governance_ssot.repository,
        config.canonical_governance_ssot.path, 'Could not verify the pinned frozen SSOT commit/blob through the GitHub Contents API.',
        { frozen_commit_sha: config.canonical_governance_ssot.frozen_commit_sha, error: error.message });
      scanErrors.push('Pinned central SSOT verification: ' + error.message);
    }
    const outsideScopeConsumers = repositoryReports.filter(r => {
      const workflow = r.candidate_files_reviewed.find(f => f.path === '.github/workflows/kcos-read-gate.yml');
      const content = workflow?.content || '';
      const projectName = r.repository.split('/').pop();
      return r.repository.toLowerCase() !== config.canonical_governance_ssot.repository.toLowerCase() &&
        /(?:ahlis0201-ui|khmer-cosmos)\/kcos-governance-engine/i.test(content) &&
        /KCOS_SSOT_SHA:\s*3d8db073b2f05aeca681cca4fbf00f27fb8597fd/.test(content) &&
        !declaredScope.some(scope => scope.toLowerCase() === projectName.toLowerCase());
    }).map(r => r.repository);
    if (!declaredScope.length) addFinding('CENTRAL_SSOT_SCOPE_SOURCE_UNVERIFIED', 'BLOCKED',
      config.canonical_governance_ssot.repository, config.canonical_governance_ssot.path,
      'Could not extract the declared scope from the actual frozen SSOT content; do not infer scope from memory or a hardcoded value.',
      { central_document_content_available: Boolean(centralDoc) });
    else if (outsideScopeConsumers.length) addFinding('CENTRAL_SSOT_SCOPE_REVIEW_REQUIRED', 'REVIEW',
      config.canonical_governance_ssot.repository, config.canonical_governance_ssot.path,
      'The frozen document declares a limited scope, while the same baseline is pinned by additional repositories. Confirm formal scope authority; do not edit frozen V1.0 in place.',
      { declared_scope_read_from_source: declaredScope, downstream_consumers: outsideScopeConsumers });
    const report = {
      inventory_id: config.inventory_id, generated_at: new Date().toISOString(),
      scope: { organization: config.organization, additional_owners: config.additional_owners || [] },
      repository_count: repositoryReports.length, complete: scanErrors.length === 0 && repositoryReports.length > 0,
      central_frozen_ssot_blob_verified: frozenBaselineVerified,
      repositories: repositoryReports, findings, scan_errors: scanErrors
    };
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');
    const markdownPath = REPORT_PATH.replace(/\.json$/i, '.md');
    fs.writeFileSync(markdownPath, renderMarkdown(report), 'utf8');
    if (SUMMARY_PATH) fs.appendFileSync(SUMMARY_PATH, renderMarkdown(report).slice(0, 50000));
    console.log(JSON.stringify({ report_path: REPORT_PATH, markdown_path: markdownPath, repository_count: report.repository_count, complete: report.complete, finding_count: findings.length, scan_error_count: scanErrors.length }, null, 2));
  } catch (error) {
    const report = {
      inventory_id: config.inventory_id, generated_at: new Date().toISOString(),
      scope: { organization: config.organization, additional_owners: config.additional_owners || [] },
      repository_count: repositoryReports.length, complete: false, central_frozen_ssot_blob_verified: frozenBaselineVerified, repositories: repositoryReports,
      findings: [...findings, { code: 'INVENTORY_RUN_FATAL', severity: 'BLOCKED', repository: null, path: null, detail: error.message, evidence: {} }],
      scan_errors: [...scanErrors, error.message]
    };
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');
    fs.writeFileSync(REPORT_PATH.replace(/\.json$/i, '.md'), renderMarkdown(report), 'utf8');
    if (SUMMARY_PATH) fs.appendFileSync(SUMMARY_PATH, renderMarkdown(report).slice(0, 50000));
    console.error('KCOS SSOT inventory incomplete: ' + error.message);
  }
}
