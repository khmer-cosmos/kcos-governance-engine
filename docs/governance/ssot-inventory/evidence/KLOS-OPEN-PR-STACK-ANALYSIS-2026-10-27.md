# KLOS Open PR Stack and Merge-Order Analysis — 2026-10-27

**Repository:** `khmer-cosmos/KCOS-Khmer-Language-OS`
**Current main SHA observed:** `930506fc024eb23b5e153392976709bb326181bd`
**Open PR snapshot:** 72 PRs; 0 Draft; 69 last updated in September 2026, 3 last updated in October 2026.
**Boundary:** Metadata/dependency/check snapshot only. No PR merged, rebased, closed, or edited.

## 1. Stack structure

- 7 of 72 open PRs target `main` directly.
- 65 of 72 use a non-main base branch.
- 63 of those 65 non-main base references match the head branch of another currently open PR; they are explicit stacked dependencies, not independent mainline PRs.
- The remaining 2 use base branch `t21-social-public-source-adapter`, which maps to already merged PR #129; this is a closed/merged parent, not an unresolved open parent.
- Branch families include stage-02 → stage-03 → stage-04, T25/T30/T36/T39/T42/T45/T48/T51/T54/T57 gate stages, and T58–T63 siblings. A topological merge order is required; arbitrary bulk merge is unsafe.

## 2. Main-target root PRs and exact-head checks

| PR | Head branch | Base SHA observed | Changed files | Exact-head checks | Initial disposition |
|---|---|---|---:|---|---|
| [#60 — validate release gate after export fixture fix](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/60) | `kcos-language-os-v0.1-foundation` | `101f55bb2855745c837ca98904cf5ce8509e689f` | 150 | 2/2 success | **BLOCKED for merge review** — base is stale versus current main; large foundational diff; no requested reviewers/review comments observed; validate current branch/stack semantics before disposition |
| [#172 — T64 release admission integration](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/172) | `t64-release-admission-integration` | `101f55bb2855745c837ca98904cf5ce8509e689f` | 198 | 1 failure | **BLOCKED** — failing test and overlapping 198-file stack; no review evidence observed |
| [#173 — T65 final evidence bundle](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/173) | `t65-final-evidence-bundle` | `101f55bb2855745c837ca98904cf5ce8509e689f` | 198 | 1 success | **BLOCKED for merge review** — shares 196 changed paths with #172 but has two different unique paths; must resolve whether these are sibling/alternative integration branches before merging either or both |
| [#178 — map project engineering system to CDI Foundation](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/178) | `cdi/map-v0.1` | `101f55bb2855745c837ca98904cf5ce8509e689f` | 3 | No check runs returned | **BLOCKED / EVIDENCE** — verify exact-head checks and CDI integration contract before review |
| [#229 — KHM-002 E2E runtime contract](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/229) | `construction/khm-002-architecture` | `dec611536a863bb934ef59248bc5106f8149cca3` | 2 | 5/5 failure | **BLOCKED** — Read Gate, mechanical gate and validation all failed; logs were not retrievable in this inspection (artifact log endpoint returned BlobNotFound) |
| [#230 — KHM-010 E2E golden/negative corpus](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/230) | `construction/khm-010-quality` | `a1aa299b86fd71974b14778c6c5e16ef7d01ec2f` | 2 | 5/5 failure | **BLOCKED** — Read Gate, mechanical gate and validation all failed; logs were not retrievable in this inspection |
| [#231 — KHM-007 OBS-2 source-ID migration](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/231) | `construction/khm-007-entity` | `a1aa299b86fd71974b14778c6c5e16ef7d01ec2f` | 10 | 5/5 failure | **BLOCKED** — Read Gate, mechanical gate and validation all failed; logs were not retrievable in this inspection |

All seven root PRs use a base SHA older than the current main SHA observed above. The three October PRs #229–#231 are the most recently updated main-target PRs, but their exact-head checks are fully failing. A clean/unknown mergeability flag cannot override failed checks or stale base evidence.

## 3. Shared diff risk: PR #172 versus #173

Changed-file comparison observed:
- PR #172: 198 changed paths.
- PR #173: 198 changed paths.
- 196 paths are common.
- PR #172 unique paths: `src/kcos_language_os/release_admission_integration.py`, `tests/test_release_admission_integration.py`.
- PR #173 unique paths: `docs/KCOS-FINAL-EVIDENCE-BUNDLE-001.md`, `tests/test_final_evidence_bundle.py`.

This indicates two overlapping large diffs against the same old main base, not two small independent changes. Before either merge, compare commit ancestry and complete final trees, decide the intended integration sequence, refresh against current main, then rerun full tests. Do not merge both solely because one has a passing check.

## 4. Recommended merge queue policy

1. Treat each root branch and each dependent feature branch as a graph node. For every PR, record base branch, base SHA, head branch, head SHA, parent PR (if the base branch matches an open PR head), changed-path overlap, exact-head checks, review state, and current-main divergence.
2. Refresh roots against current main in isolated branches; do not retarget a child PR to main before its parent content is integrated or intentionally superseded.
3. Resolve the #172/#173 overlapping-stack decision before merging either.
4. Diagnose and repair KHM-002/KHM-010/KHM-007 failures from exact logs; current log retrieval returned BlobNotFound, so the failure causes remain unknown.
5. After each parent integration, re-evaluate direct children against the new base SHA and run their exact-head checks again.
6. Require independent review and owner disposition; no merge is authorized by this report.

## 5. Evidence limitations

GitHub PR metadata and exact-head check-run summaries were available. Detailed workflow logs for #229–#231 could not be retrieved because the log endpoint returned BlobNotFound. This analysis does not yet inspect all 72 PR diffs, every check run, or every review thread; it establishes the dependency graph and identifies root-queue blockers for the next review batch.
## Follow-up repair — KHM-010 corpus file encoding

After the initial snapshot, direct file inspection of KLOS PR #230 showed both new `.yaml` corpus files contained Base64 text instead of readable YAML. The first bytes decoded to the expected `# KHM-010 ...` YAML comments and included `corpus_id`/`cases` fields.

A bounded correction was made on PR #230's existing non-main branch only:
- `registry/quality/corpus/golden-e2e-v1.yaml`: decoded content now verified; new blob `28465ce128fafc730affef2ecffe5e673253b50a`.
- `registry/quality/corpus/negative-e2e-v1.yaml`: decoded content now verified; new blob `09629fcffe7a2a8191b0b9dd93bc989080415fba`.
- Latest commit after these two changes: `b14a14f87c5f8c4c56796c2650f939aac667c017`.

The new exact-head checks were queued at the time of inspection. This corrects the observed file encoding defect, but does not establish that PR #230 passes validation, Read Gate, or mechanical gate. The base is still the older SHA `a1aa299b86fd71974b14778c6c5e16ef7d01ec2f`, while current `main` was observed at `930506fc024eb23b5e153392976709bb326181bd`; after checks finish, refresh/reconcile the base under the approved workflow and rerun evidence.

No main branch or production runtime was changed by this repair.
### KHM-010 post-repair result

After the Base64-to-YAML correction, the exact-head check suite on `b14a14f87c5f8c4c56796c2650f939aac667c017` still reported failures in `factory-governance`, `validation`, `mechanical-gate`, and `KCOS-READ-GATE-001`. The new workflow-job log endpoints returned `BlobNotFound`; job metadata exposed no failed step summaries. Therefore the encoding defect is corrected, but it is **not** sufficient to pass the PR and no additional fix should be guessed without usable failure evidence. PR #230 remains BLOCKED.

## KHM-010 disposition update

- File-format defect: corrected and blob-verified on the PR branch.
- CI/Read Gate/mechanical gate: still failing on the new head; detailed logs unavailable.
- Base SHA: still older than current main.
- Merge status: **BLOCKED** pending recoverable failure evidence, correction, full checks, and base reconciliation.

## Recheck — 2026-10-27T08:00+07:00

The post-correction head of KLOS PR #230 is `b14a14f87c5f8c4c56796c2650f939aac667c017`. Fresh workflow runs are complete and all four gate jobs still fail:

| Workflow / gate | Run ID | Job ID | Result |
|---|---:|---:|---|
| mother-repo-validation | 40434890262 | 121961101036 | failure |
| Factory Governance Gate | 40434890421 | 121961101533 | failure |
| KCOS Read Gate | 40434890242 | 121961100794 | failure |
| KCOS Khmer Language OS — Integration Gate | 40434890265 | 121961100814 | failure |

Fresh log retrieval was attempted for all four job IDs; each returned Azure `BlobNotFound`. This confirms the failure state but does not expose the failure causes. No further code change is justified without a reproducible local run, downloadable artifact, or alternative check output. The YAML encoding correction remains a verified narrow fix, not a gate pass.

### KLOS merge queue — current disposition

- **Queue class A — resolve overlap before either merge:** PR #172 and #173. Their 196 shared paths and old common base require an ancestry/tree reconciliation decision and a single integrated validation sequence.
- **Queue class B — root PRs requiring base refresh before review:** PR #60 and #178 target `main` from stale base SHAs; refresh only after recording the exact current main SHA and confirming no dependent stack assumes the old base.
- **Queue class C — blocked quality roots:** PR #229 (5/5 checks failed), #230 (4/4 gate jobs failed after the encoding fix), #231 (5/5 checks failed). Root-cause evidence must be recovered; do not infer causes from titles or shared batch numbering.
- **Queue class D — dependent branch stacks:** 65 non-main-base PRs, 63 whose base refs match another open PR head. Keep parent/child relationships intact; validate in topological order after each parent decision. Do not retarget children directly to main merely to make the queue look mergeable.

The queue is a **review and repair order**, not merge authorization. Required review, exact-head green checks, current-base reconciliation, owner disposition, and applicable SSOT gates remain mandatory.
