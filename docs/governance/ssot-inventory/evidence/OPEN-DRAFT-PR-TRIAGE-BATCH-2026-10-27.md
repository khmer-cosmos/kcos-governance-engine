# Open Draft PR Triage Batch — 2026-10-27

**Scope:** All 12 Draft PRs returned by the current `org:khmer-cosmos is:pr is:open` search, plus the separate `ahlis0201-ui/kcos-frontend-a11y-demo#1` PR.
**Snapshot:** 119 open PRs in the organization search; 12 are Draft. Including the separate frontend baseline PR gives 120 observed Open PRs in the combined scope and 13 Draft PRs.
**Boundary:** Read-only triage based on exact-head metadata/check runs. This is not independent approval, owner authorization, or a merge instruction. Check results are time-bound.

## Summary

- 4 governance-related drafts in this workstream: PR #2, #5, #7, #8.
- 4 candidates with failing checks: HOVOD #9, HOVOD #8, HOVOD #2, concat-studio #18.
- HOVOD #4 is dirty/non-mergeable; concat-studio #18 is also dirty.
- Frontend baseline PR #1 has no check runs observed for its exact head.
- No draft is automatically merge-ready just because checks pass or GitHub reports mergeable=true.

## Draft PR inventory and current disposition

| PR | Exact head SHA | Exact-head check result observed | Mergeability | Disposition |
|---|---|---|---|---|
| [kcos-governance-engine #2](https://github.com/khmer-cosmos/kcos-governance-engine/pull/2) | `8596947e2fec845c28274c0b1103ba0380a13fef` | 8 runs: 7 success, 1 skipped (Discover and inspect SSOT evidence) | clean | **BLOCKED** — skipped evidence discovery and audit-token blocker; keep Draft until resolved |
| [kcos-governance-engine #5](https://github.com/khmer-cosmos/kcos-governance-engine/pull/5) | `68a946b5706d0309f4727d4c3e3a3a62e75a609a` | 6/6 success | clean | **BLOCKED** — classification candidate needs cross-review findings, independent review, Owner/lifecycle decision |
| [kcos-governance-engine #7](https://github.com/khmer-cosmos/kcos-governance-engine/pull/7) | `01cb73b30f693790fb91b39e50219712651a8885` | 6/6 success | clean | **BLOCKED** — matrix profile mapping, version linkage, schema/registry, waiver and Owner/independent review remain |
| [kcos-governance-engine #8](https://github.com/khmer-cosmos/kcos-governance-engine/pull/8) | `370652e305045f092248e378834ecf4c1159f0fe` | 6 runs: 3 success, 1 neutral, 2 in progress at check time | unstable | **WAIT FOR CHECKS** — re-fetch latest head/checks before disposition |
| [KHVOD #3](https://github.com/khmer-cosmos/KHVOD/pull/3) | `14c3b392f66d326d8270fc6c784293bf47719b07` | 5/5 success | clean | **REVIEW REQUIRED** — verify scope, privacy boundary, and integration impact before merge-ready |
| [HOVOD #9](https://github.com/khmer-cosmos/HOVOD/pull/9) | `dcbf3ac217d886757357558dd753226b498755b6` | 5 success, 1 failure (Smoke test all-in-one + MinIO) | unstable | **BLOCKED** — resolve failing smoke test; green build/typecheck alone is insufficient |
| [HOVOD #8](https://github.com/khmer-cosmos/HOVOD/pull/8) | `52252ef295eb86b0d772d58810c9b347252d6786` | 4 success, 2 failures (smoke test and typecheck/build) | unstable | **BLOCKED** — fix both failures and rerun full suite |
| [khmercos.com #4](https://github.com/khmer-cosmos/khmercos.com/pull/4) | `88f48ba6911172e642bf5e2b4b48017cffa07fd4` | 2/2 Read Gate checks success; no broader quality suite observed in queried endpoint | clean | **BLOCKED** — depends on effective classification and gate contracts; Read Gate is not full acceptance |
| [HOVOD #4](https://github.com/khmer-cosmos/HOVOD/pull/4) | `426ab96224232a985a0a1aa1296530c320ba5e84` | 4/4 success | dirty / not mergeable | **BLOCKED** — resolve branch/base conflict first; review construction scope and dependency baseline |
| [HOVOD-COMM #2](https://github.com/khmer-cosmos/HOVOD-COMM/pull/2) | `731609f49636041c888175134b58261275b88de3` | 2/2 success | clean | **REVIEW REQUIRED** — 36-file native KCHAT integration; verify compatibility, contract, rollback and dependencies |
| [concat-studio #18](https://github.com/khmer-cosmos/concat-studio/pull/18) | `d1383b87427364b6990c29d34792d591c55bee2a` | 9 success, 2 failures (preflight-contract) | dirty / not mergeable | **BLOCKED** — resolve both preflight failures and base conflict, then review continuity/recovery contract |
| [HOVOD #2](https://github.com/khmer-cosmos/HOVOD/pull/2) | `9362ff494453540f6e88985cc865edfbeeca7fb8` | 1 success, 2 failures (smoke test and typecheck/build) | unstable | **BLOCKED** — fix failures; inspect provider configuration, secret handling, OTP abuse/rate-limit controls |
| [kcos-frontend-a11y-demo #1](https://github.com/ahlis0201-ui/kcos-frontend-a11y-demo/pull/1) | `9986b175b2c320568970cc2c29c73e0b0170e6ad` | No check runs returned for this exact head | clean | **BLOCKED** — no CI evidence observed; G0 depends on effective SSOTs and independent design review |

## Next actions

1. Resolve failing tests and dirty branches for HOVOD #9/#8/#4/#2 and concat-studio #18; fetch failing logs and do not infer root causes from check names alone.
2. Keep PR #5/#7 as separate Draft standards. Close cross-review findings, obtain an authorized independent reviewer, and resolve Owner/schema/registry/gate mapping before promotion.
3. PR #2 needs an explicit disposition for the skipped evidence-discovery job and the known audit-token blocker.
4. Recheck PR #8 after in-progress checks complete; update the snapshot if its head SHA changes.
5. For KHVOD #3 and HOVOD-COMM #2, passing checks are necessary but not sufficient; complete scope/dependency review.
6. Do not merge or close any PR solely on age, clean mergeability, or check count. Do not mass-merge old PRs.

## Authority and evidence limitations

The connected GitHub API provided exact-head check-run results and PR metadata, but this batch did not yet fetch full failing logs, every PR diff, all review threads, or all dependency edges. REVIEW REQUIRED items are not merge-ready. This is a first-pass Draft queue, not a complete review of all 120 open PRs.

## Failure-log root-cause evidence (bounded)

The following failed-job logs were inspected. These are observed failure points; they do not yet prove the final remediation.

### HOVOD #9 — MinIO smoke setup

- Failed job: [Smoke test (all-in-one + MinIO)](https://github.com/khmer-cosmos/HOVOD/actions/runs/38044666822/job/114192033736)
- The workflow attempted to start `quay.io/minio/minio:latest`.
- Docker returned: `unauthorized: access to the requested resource is not authorized`; the step exited 125 before the HOVOD container started.
- Disposition: CI image-source/tag contract is invalid or inaccessible in this runner context. Verify the currently supported official MinIO image source and pin a known-good immutable tag/digest before changing the workflow. Do not label this as an application smoke-test defect.

### HOVOD #8 — test/migration consistency plus MinIO smoke setup

- Failed job: [Typecheck & build](https://github.com/khmer-cosmos/HOVOD/actions/runs/37911135587/job/113756537728)
- The migration/schema test reported 92 passed and 9 failed. Failed assertions named `events`, `events_dlq`, `publications`, `publish_decisions`, `follows`, `blocks`, `likes`, `collects`, and `comm_identities`.
- Failed smoke job: [Smoke test (all-in-one + MinIO)](https://github.com/khmer-cosmos/HOVOD/actions/runs/37911135587/job/113757555202)
- The workflow attempted `minio/minio:latest`; Docker returned `pull access denied for minio/minio, repository does not exist or may require 'docker login'`, exit 125.
- Disposition: two distinct blockers. The migration/schema contract needs source-level inspection to determine whether tables or migrations are missing/misaligned; the MinIO image source must be independently validated. Do not patch either based on test names alone.

### HOVOD #2 — OTP integration docs gate plus MinIO smoke setup

- Failed job: [Typecheck & build](https://github.com/khmer-cosmos/HOVOD/actions/runs/36320856016/job/108624277813)
- The test run reported undocumented routes: `/v1/auth/otp/request`, `/v1/auth/otp/resend`, and `/v1/auth/otp/verify`; the docs gate exited 1.
- Failed smoke job: [Smoke test (all-in-one + MinIO)](https://github.com/khmer-cosmos/HOVOD/actions/runs/36320856016/job/108624645841)
- The workflow again attempted `minio/minio:latest` and Docker rejected the pull (repository does not exist or requires login), exit 125.
- Disposition: document the three OTP routes in the canonical route/API inventory if they are in fact part of the authorized contract; first compare implementation, auth/rate-limit behavior, and route docs. Separately validate and pin the MinIO test image.

### concat-studio #18 — preflight contract syntax failure

- Failed job: [preflight-contract](https://github.com/khmer-cosmos/concat-studio/actions/runs/36422990528/job/108930023537)
- Node failed to parse `scripts/host-tunnel-diagnosis.test.mjs` with `SyntaxError: Unexpected string`, at a test fixture containing PowerShell command text around the HTTP status handling.
- Disposition: inspect the exact file patch and quote/escape boundary, add a syntax-only check and focused test, and rerun both preflight-contract jobs. A base conflict is a separate blocker; do not merge until both conflict and test failures are resolved.

No source files in HOVOD or concat-studio were changed during this diagnosis.
