# KCOS-SSOT-INVENTORY-001 — Connector Read-Only Census
**Evidence ID:** KCOS-SSOT-INVENTORY-001-CONNECTOR-CENSUS-2026-10-18  
**Observed date:** 2026-10-18  
**Mode:** GitHub connector read-only; no merge, no default-branch mutation, no frozen baseline mutation  
**Status:** PARTIAL — connector-visible repository census and selected-path verification; not a full tree census

## 1. Scope snapshot

The connected GitHub view returned 24 repositories under `khmer-cosmos` and 4 under `ahlis0201-ui`. This is the observed connector-visible scope, not proof that no additional KCOS repositories exist under other owners or installations.

### `khmer-cosmos` (24)
- `khmer-cosmos/KCOS`
- `khmer-cosmos/Human-AI-Knowledge-Base`
- `khmer-cosmos/kcos-governance-engine`
- `khmer-cosmos/cambodia-enterprise-legal-kb`
- `khmer-cosmos/khmer-vocabulary`
- `khmer-cosmos/WB-ACMS-Marketplace`
- `khmer-cosmos/concat-studio`
- `khmer-cosmos/ACE`
- `khmer-cosmos/HOVOD`
- `khmer-cosmos/-khmercos.com`
- `khmer-cosmos/khmercos.com`
- `khmer-cosmos/HOVOD-COMM`
- `khmer-cosmos/SuperAgent`
- `khmer-cosmos/KCOS-Khmer-Language-OS`
- `khmer-cosmos/API-mo-kuai`
- `khmer-cosmos/cdi-foundation`
- `khmer-cosmos/NPP-MUSIC-OS`
- `khmer-cosmos/KHVOD`
- `khmer-cosmos/KH-eBook-studio`
- `khmer-cosmos/KCHAT`
- `khmer-cosmos/KHMALL`
- `khmer-cosmos/khmercos-accounts`
- `khmer-cosmos/HOVOD-INFO-OS`
- `khmer-cosmos/AI-WORK`

### `ahlis0201-ui` (4)
- `ahlis0201-ui/CDI`
- `ahlis0201-ui/-`
- `ahlis0201-ui/3D-office`
- `ahlis0201-ui/khmer-typography`

## 2. Frozen authority source verified

Fetched the canonical lifecycle document at the exact frozen commit:
- Repository: `khmer-cosmos/kcos-governance-engine`
- Path: `docs/governance/document-lifecycle/KCOS-DOCUMENT-LIFECYCLE-GOVERNANCE-SSOT-V1.0.md`
- Commit: `3d8db073b2f05aeca681cca4fbf00f27fb8597fd`
- Returned blob SHA: `e8c810b521e66f31561b85e6790b6a940c1bbeea`
- Document status: `FROZEN`
- Declared scope read from source: `KCOS`, `KCHAT`, `SuperAgent`

**Result: VERIFIED** — the source at the pinned commit returns the expected blob SHA. This verifies identity/integrity of this frozen file only; it does not resolve whether its declared scope is authoritative for every downstream repository.

## 3. Selected-path findings

### F-01 — AI-WORK governance entrypoint gap
- `khmer-cosmos/AI-WORK/README.md` is readable at blob `db25efb3ab7c2cac87ade1b0a51eac37d512f7ce` and declares factory governance baselines and a construction entry rule.
- The standard `.github/workflows/kcos-read-gate.yml` and `docs/governance/read-gate/READ-RECEIPT.md` paths were not found by prior targeted checks.
- Classification: **HIGH / NEEDS RECHECK**. README establishes governance intent; it does not establish executable enforcement or a receipt.

### F-02 — HOVOD-INFO-OS receipt gap
- `khmer-cosmos/HOVOD-INFO-OS/.github/workflows/kcos-read-gate.yml` is readable at blob `5ce6661a7bda0980508bab78408961728c015f44`.
- The workflow fetches the pinned checker from the legacy URL `ahlis0201-ui/kcos-governance-engine` and sets `KCOS_SSOT_REPO` to that old owner path.
- `docs/governance/read-gate/READ-RECEIPT.md` returned 404 on the default branch.
- Classification: **HIGH / NEEDS CONTROLLED REMEDIATION**. No write was made to this downstream repository.

### F-03 — Legacy canonical repository references
- Code search returned multiple downstream read-gate workflows that still reference `ahlis0201-ui/kcos-governance-engine`, including HOVOD and HOVOD-INFO-OS.
- A prior live central read-gate run succeeded using the legacy raw URL; therefore this is migration-reference drift, not proof that the current checker URL is broken.
- Classification: **REVIEW**. Migrate only through controlled, independently validated changes; do not bulk-rewrite workflows.

### F-04 — Governance scope and domain SSOT authority unresolved
- The frozen lifecycle SSOT declares scope KCOS/KCHAT/SuperAgent.
- Multiple downstream repositories reference the same frozen SHA, including repositories not named in that declared scope.
- Classification: **REVIEW REQUIRED**. Do not edit frozen V1.0 in place or auto-promote domain candidates. Resolve authority through a versioned decision/change path.

### F-05 — Personal-owner repository access remains unverified for selected files
- `ahlis0201-ui/3D-office/README.md` and `ahlis0201-ui/khmer-typography/README.md` returned 404 through the connector.
- A 404 through this read path is not sufficient to distinguish absence from access/index limitations.
- Classification: **UNVERIFIED**, not ABSENT.

## 4. Search coverage signals (not complete inventory)

Prior code searches returned:
- `KCOS-READ-GATE-001`: 72 results across 23 organization repositories.
- `READ-RECEIPT.md`: 71 results across 23 organization repositories.
- `.github/workflows/kcos-read-gate.yml`: 23 results across 23 organization repositories; AI-WORK did not appear.
- `ahlis0201-ui/kcos-governance-engine`: 49 legacy-reference results across 23 organization repositories.

GitHub code search is a discovery aid, not a complete tree enumeration. Search result counts must not be treated as exact file counts or as proof of absence.

## 5. Automation implementation review

The draft scanner uses GitHub REST tree/blob APIs, records per-repository HEAD/tree SHAs, caps candidate content review, emits JSON and Markdown, and does not auto-promote candidates to VERIFIED. It also writes a fatal/incomplete report when a scan cannot start.

**Operational blocker:** full cross-repository automation remains **BLOCKED** until the Actions runtime has a `KCOS_AUDIT_TOKEN` with read access to the declared scope. The secret value must never be placed in issues, source files, or chat. A public/default repository token must not be silently treated as proof of complete private-repository coverage.

**Workflow reliability risk to test:** the scan job currently uses `continue-on-error: true`; artifact upload and issue update are `if: always()`. The scanner is designed to emit a fatal report, but a failure before checkout/script execution could still leave no report and make artifact/issue-update steps fail. Add an explicit fallback-report path or verify the runner behavior before declaring the durable issue update path production-ready.

## 6. Explicit exclusions

This evidence does **not** claim:
- all 28 repositories have been recursively enumerated or have known HEAD/tree SHAs;
- all project/domain SSOTs have been identified;
- branch protection or required status checks have been verified;
- the scheduled workflow has completed a full organization scan;
- any downstream remediation has been applied;
- PR #2 is ready to merge.

## 7. Acceptance path

1. Confirm runtime secret presence and read coverage without disclosing secret material.
2. Execute a scheduled/manual full scan and retain the JSON/Markdown artifacts.
3. Verify every discovered repository has a HEAD SHA, tree SHA, and explicit error/coverage classification.
4. Inspect branch protection and required checks with a supported read path; where unavailable, record **UNVERIFIED**.
5. Resolve lifecycle SSOT scope authority and map domain-specific SSOTs to owners, version, status, and enforcement gate.
6. Remediate downstream gaps only in controlled per-repository changes with tests and read-back verification.
7. Keep PR #2 draft until scan completeness, durable issue updates, and acceptance gates are demonstrated.

---
This file is evidence attached to the draft implementation PR. It is not an SSOT, does not change frozen baselines, and is not a substitute for the automated full scan.


## 8. Scanner implementation defect found during independent code review

A review of `tools/ssot-inventory/scan.mjs` found that recursive tree retrieval had been constructed with the default branch name as the Git Trees API identifier. The Git Trees endpoint expects a tree SHA; branch names should not be assumed to resolve as tree identifiers.

Correction committed to the draft branch:
- Commit: `ca76d3279c8ca9566d1a407ab8bbc75c3b3b0168` — use the default-branch commit's `commit.tree.sha`.
- Commit: `e6e74fb7c5fe047282bf0810b03d12df1a827f88` — validate the tree SHA shape and add self-test coverage for valid and missing tree SHA data.

This was a potentially scan-blocking defect; it is now corrected in the candidate implementation. The corresponding GitHub Actions PR checks have been queued/in progress, and the full scheduled/manual scan has still not been demonstrated. Do not mark the inventory workflow operationally accepted until the new self-test passes and a complete scan produces artifacts and updates the tracking issue.


## 9. Fail-closed completeness correction — 2026-10-19

A further code review found that candidate blobs skipped by the configured maximum blob-size limit were recorded in a repository-local error list, but did not increment the scan-wide error list. That could allow the top-level `complete` flag to remain true even though a discovered candidate had not been inspected.

Correction committed to the draft branch:
- Commit: `5f80a1406d94256289672e2f6ccc6f36ef553db1`
- Blob SHA after read-back: `def6c038c1e611c012e1c85284b67020851ad7e3`
- A skipped/unreadable candidate now adds a scan-wide error and a `CANDIDATE_CONTENT_UNREADABLE` BLOCKED finding.
- A truncated recursive tree now emits `GIT_TREE_TRUNCATED` BLOCKED.
- Candidate review cap exhaustion now emits `CANDIDATE_REVIEW_CAP_REACHED` BLOCKED.
- Post-write read-back confirmed all three finding markers and the scan-wide error path are present.

This is source read-back evidence, not runtime acceptance. The offline self-test and full scheduled/manual scan still require execution evidence; do not infer a workflow PASS from the commit alone.


## 10. Regression self-test added — 2026-10-19

Commit `e4bc26585d082b82881ee946427f44f0683976b0` extracts the unreadable-candidate handling into `recordUnreadableCandidate` and adds offline assertions that an oversized/unreadable candidate:
- records a repository-local error;
- increments the scan-wide error list (therefore prevents `complete: true`);
- emits a `CANDIDATE_CONTENT_UNREADABLE` BLOCKED finding.

Read-back verified the test code is present at blob `2afce65be44ab2bef4e788a2bb6f433a1feb1a13`. The connector returned no workflow runs or commit status checks for this latest commit at the time of this read-back; therefore the new test has not been claimed as executed. PR #2 remains Draft and unmerged.
