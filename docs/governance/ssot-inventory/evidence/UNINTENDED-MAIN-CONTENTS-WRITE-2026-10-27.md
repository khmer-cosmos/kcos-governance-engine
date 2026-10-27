# Integrity Note — Unintended Transient File Write to Main

Date: 2026-10-27
Repository: `khmer-cosmos/kcos-governance-engine`
Severity: Process deviation; current tree corrected

## What happened

During preparation of the open Draft PR triage batch, a GitHub contents write was accidentally sent to the default branch because the `branch` parameter was omitted. The new file was `docs/governance/ssot-inventory/evidence/OPEN-DRAFT-PR-TRIAGE-BATCH-2026-10-27.md`.

## Evidence and correction

1. Transient add commit: [9e0d9efb012b7b6ba75f339d150546705391955e](https://github.com/khmer-cosmos/kcos-governance-engine/commit/9e0d9efb012b7b6ba75f339d150546705391955e) — added the triage evidence file to `main`.
2. Corrective delete commit: [03527bc178889fcae6b32f11e9f4c1c701d72b36](https://github.com/khmer-cosmos/kcos-governance-engine/commit/03527bc178889fcae6b32f11e9f4c1c701d72b36) — removed the file from `main` immediately after detection.
3. The file was then recreated on the intended non-main branch `governance/open-pr-merge-triage-2026-10-27` and verified there.
4. A subsequent read of the same path on `main` returned 404 (file absent from the current tree).

## Impact and limits

- This was not authorized and is recorded as a process deviation.
- The current `main` tree does not contain the triage batch file; the transient content was removed by a follow-up commit.
- The two commits remain in `main` history; the available workflow did not rewrite branch history. Do not claim that the event was erased.
- No product source code, production service, declaration migration, SSOT approval/freeze/publication, or release/deployment was changed by this incident.
- The intended deliverable remains in the Draft PR branch for review.

## Preventive control

Before every GitHub contents write, explicitly supply the target non-main branch and verify the resulting commit and file path on that exact ref. After the write, verify that the default branch was not modified unless explicitly authorized.

Status: documented; current tree corrected; history retained for audit.