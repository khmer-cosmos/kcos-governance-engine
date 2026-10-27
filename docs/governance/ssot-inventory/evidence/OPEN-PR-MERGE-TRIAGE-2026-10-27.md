# KCOS / Khmer Cosmos Open Pull Request Inventory & Merge Triage — 2026-10-27

**Record type:** Read-only snapshot and triage register
**Authority:** Inventory only; not merge approval, gate PASS, or SSOT approval
**Snapshot source:** GitHub API open pull-request search for `org:khmer-cosmos is:pr is:open`, plus `ahlis0201-ui/kcos-frontend-a11y-demo` open PRs.

## Scope and limits

- 117 open PRs returned for the `khmer-cosmos` organization across 16 repositories.
- 1 additional open PR(s) found in the separate `ahlis0201-ui/kcos-frontend-a11y-demo` repository, included because it is the current KCOS frontend framework baseline workstream.
- Open does not mean merge-ready. This register does not assert passing CI, mergeability, review approval, dependency satisfaction, or authorization. Each PR requires live detail/check/review/dependency verification before any merge decision.
- Snapshot is time-bound; PRs may change after capture. This report does not close, merge, or modify any PR.

## Summary

- Total inventory: 118 open PRs (117 in org search + 1 frontend baseline PR).
- Draft: 11; non-draft: 107.
- Last-updated before 2026-10-01: 80 (age alone is not grounds for closure).

| Initial triage bucket | Count | Meaning |
|---|---:|---|
| FACTORY / GATE / INFRA | 58 | Keyword-based routing only; not a review verdict |
| KLOS ASSET / LANGUAGE PIPELINE | 46 | Keyword-based routing only; not a review verdict |
| PRODUCT / FEATURE | 8 | Keyword-based routing only; not a review verdict |
| SSOT / GOVERNANCE | 4 | Keyword-based routing only; not a review verdict |
| OTHER / UNTRIAGED | 2 | Keyword-based routing only; not a review verdict |

## Full open-PR inventory

| Repo | PR | Title | Draft | Updated (UTC date) | Initial routing | Link |
|---|---:|---|---|---|---|---|
| `ahlis0201-ui/kcos-frontend-a11y-demo` | #1 | [DRAFT] Establish KCOS Frontend Industrial Framework Design Baseline V0.1 | Yes | 2026-10-27 | FACTORY / GATE / INFRA | [PR](https://github.com/ahlis0201-ui/kcos-frontend-a11y-demo/pull/1) |
| `khmer-cosmos/cambodia-enterprise-legal-kb` | #1 | CONSTRUCTION: map project to CDI Foundation | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/cambodia-enterprise-legal-kb/pull/1) |
| `khmer-cosmos/cdi-foundation` | #1 | CONSTRUCTION: establish CDI Foundation SSOT and project migration contract | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/cdi-foundation/pull/1) |
| `khmer-cosmos/cdi-foundation` | #4 | factory: establish local remote execution boundary | No | 2026-10-07 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/cdi-foundation/pull/4) |
| `khmer-cosmos/cdi-foundation` | #10 | fix: make decision-chain e2e proof remotely observable | No | 2026-10-08 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/cdi-foundation/pull/10) |
| `khmer-cosmos/cdi-foundation` | #43 | factory: add Windows infrastructure recon collector | No | 2026-10-08 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/cdi-foundation/pull/43) |
| `khmer-cosmos/cdi-foundation` | #45 | factory: capture host observation at commit time | No | 2026-10-08 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/cdi-foundation/pull/45) |
| `khmer-cosmos/concat-studio` | #18 | feat: add customer service continuity and recovery surface | Yes | 2026-09-28 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/concat-studio/pull/18) |
| `khmer-cosmos/concat-studio` | #19 | CONSTRUCTION: map project engineering system to CDI Foundation | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/concat-studio/pull/19) |
| `khmer-cosmos/concat-studio` | #20 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/concat-studio/pull/20) |
| `khmer-cosmos/concat-studio` | #21 | factory: establish native app surface + Tauri runtime | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/concat-studio/pull/21) |
| `khmer-cosmos/HOVOD` | #2 | feat(auth): integrate Mocean Verify OTP | Yes | 2026-09-27 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/HOVOD/pull/2) |
| `khmer-cosmos/HOVOD` | #3 | CONSTRUCTION: map project engineering system to CDI Foundation | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/HOVOD/pull/3) |
| `khmer-cosmos/HOVOD` | #4 | construction: HOVOD Information OS full-line foundation | Yes | 2026-10-03 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/HOVOD/pull/4) |
| `khmer-cosmos/HOVOD` | #6 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/HOVOD/pull/6) |
| `khmer-cosmos/HOVOD` | #8 | docs(HOVOD): establish IG03 playback defect governance baseline [DRAFT-PENDING] | Yes | 2026-10-09 | SSOT / GOVERNANCE | [PR](https://github.com/khmer-cosmos/HOVOD/pull/8) |
| `khmer-cosmos/HOVOD` | #9 | HOVOD-FRONTEND-STRUCTURE-001: route contract and quality gates | Yes | 2026-10-10 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/HOVOD/pull/9) |
| `khmer-cosmos/HOVOD-COMM` | #1 | CONSTRUCTION: map project engineering system to CDI Foundation | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/HOVOD-COMM/pull/1) |
| `khmer-cosmos/HOVOD-COMM` | #2 | feat: start native KCHAT communication integration | Yes | 2026-10-03 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/HOVOD-COMM/pull/2) |
| `khmer-cosmos/KCHAT` | #2 | construction: KCHAT native bridge v0.1 recommissioned | No | 2026-10-03 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/KCHAT/pull/2) |
| `khmer-cosmos/KCHAT` | #4 | construction: KCHAT native bridge commissioning v2 | No | 2026-10-03 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/KCHAT/pull/4) |
| `khmer-cosmos/KCHAT` | #5 | construction: KCHAT native bridge final gate | No | 2026-10-03 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCHAT/pull/5) |
| `khmer-cosmos/KCHAT` | #6 | construction: KCHAT native bridge release candidate | No | 2026-10-03 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCHAT/pull/6) |
| `khmer-cosmos/KCHAT` | #7 | construction: KCHAT native bridge gate-pass candidate | No | 2026-10-03 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCHAT/pull/7) |
| `khmer-cosmos/KCHAT` | #8 | construction: KCHAT native bridge final gate pass | No | 2026-10-03 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCHAT/pull/8) |
| `khmer-cosmos/KCHAT` | #9 | construction: KCHAT native bridge verified gate | No | 2026-10-03 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCHAT/pull/9) |
| `khmer-cosmos/KCHAT` | #10 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCHAT/pull/10) |
| `khmer-cosmos/KCHAT` | #11 | feat(KCHAT): add four selectable color skins | No | 2026-10-09 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/KCHAT/pull/11) |
| `khmer-cosmos/KCOS` | #1 | CONSTRUCTION: map project engineering system to CDI Foundation | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS/pull/1) |
| `khmer-cosmos/KCOS` | #2 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS/pull/2) |
| `khmer-cosmos/KCOS` | #3 | factory: establish Native App Factory v0.1 | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS/pull/3) |
| `khmer-cosmos/kcos-governance-engine` | #2 | build(governance): add recurring KCOS SSOT inventory and drift watch | Yes | 2026-10-18 | SSOT / GOVERNANCE | [PR](https://github.com/khmer-cosmos/kcos-governance-engine/pull/2) |
| `khmer-cosmos/kcos-governance-engine` | #5 | [DRAFT] Add ARTIFACT-CLASSIFICATION-001 candidate and read-gate evidence | Yes | 2026-10-27 | SSOT / GOVERNANCE | [PR](https://github.com/khmer-cosmos/kcos-governance-engine/pull/5) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #60 | ci: validate release gate after export fixture fix | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/60) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #73 | T13.01 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/73) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #74 | T13.02 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/74) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #75 | T13.03 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/75) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #76 | T13.04 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/76) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #77 | T13.05 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/77) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #78 | T13.06 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/78) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #79 | T13.07 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/79) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #80 | T13.08 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/80) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #81 | T13.09 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/81) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #82 | T13.10 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/82) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #83 | T13.11 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/83) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #84 | T13.12 release evidence gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/84) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #97 | T15: t15-source-discovery | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/97) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #98 | T15: t15-khmer-vocab-adapter | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/98) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #99 | T15: t15-count-reconciliation | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/99) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #100 | T15: t15-status-conflict | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/100) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #101 | T15: t15-rights-hold | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/101) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #102 | T15: t15-provenance-import | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/102) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #103 | T15: t15-recovery-report | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/103) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #104 | T15: t15-integration-tests | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/104) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #128 | T20: add Khmer24 and technical language targets | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/128) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #132 | T24: public source seed manifest | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/132) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #133 | T25: public source policy gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/133) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #134 | T26: GitHub Khmer source candidate registry | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/134) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #135 | T27: deterministic GitHub license audit | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/135) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #136 | T28: GitHub candidate evidence ledger | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/136) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #137 | T29: GitHub public target adapter | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/137) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #138 | T30: GitHub Khmer source integration gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/138) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #139 | T31: expand GitHub Khmer candidate pool | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/139) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #140 | T32: GitHub rights admission state machine | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/140) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #141 | T33: GitHub evidence snapshots | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/141) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #142 | T34: GitHub candidate audit records | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/142) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #143 | T35: GitHub commercial candidate index | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/143) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #144 | T36: GitHub refresh gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/144) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #145 | T37: GitHub metadata discovery | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/145) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #146 | T38: GitHub dedup and classification | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/146) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #147 | T39: GitHub discovery gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/147) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #148 | T40: GitHub scan batches | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/148) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #149 | T41: GitHub revision change diff | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/149) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #150 | T42: GitHub audit queue | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/150) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #151 | T43: GitHub evidence completion | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/151) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #152 | T44: GitHub content snapshots | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/152) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #153 | T45: GitHub SOURCE asset builder | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/153) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #154 | T46: GitHub SOURCE provenance bridge | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/154) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #155 | T47: GitHub SOURCE quality bridge | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/155) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #156 | T48: GitHub SOURCE store gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/156) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #157 | T49: SOURCE dedup identity | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/157) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #158 | T50: cross-source merge | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/158) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #159 | T51: Derived Asset Factory | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/159) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #160 | T52: KCOS asset relation graph | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/160) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #161 | T53: asset conflict detection | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/161) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #162 | T54: quality enhancement pipeline | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/162) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #163 | T55: conflict review queue | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/163) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #164 | T56: review adapter | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/164) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #165 | T57: verified admission gate | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/165) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #166 | T58: evidence review ledger | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/166) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #167 | T59: verified asset record | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/167) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #168 | T60: release admission boundary | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/168) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #169 | T61: verified manifest | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/169) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #170 | T62: admission batch evaluator | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/170) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #171 | T63: end-to-end admission pipeline | No | 2026-09-28 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/171) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #172 | T64: release admission integration | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/172) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #173 | T65: final evidence bundle | No | 2026-09-28 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/173) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #174 | CONTRACT-002: re-establish KLOS engineering contract | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/174) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #175 | STAGE-02: repository reality evidence surface | No | 2026-09-29 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/175) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #176 | STAGE-03: canonical integration map | No | 2026-09-29 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/176) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #177 | STAGE-04: deterministic evidence bundle | No | 2026-09-29 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/177) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #178 | CONSTRUCTION: map project engineering system to CDI Foundation | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/178) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #229 | khm-002: E2E runtime contract (Batch-05) | No | 2026-10-07 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/229) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #230 | khm-010: E2E golden/negative corpus (Batch-05) | No | 2026-10-07 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/230) |
| `khmer-cosmos/KCOS-Khmer-Language-OS` | #231 | khm-007: OBS-2 source-ID migration 000001-000020 -> 00701-00720 | No | 2026-10-07 | KLOS ASSET / LANGUAGE PIPELINE | [PR](https://github.com/khmer-cosmos/KCOS-Khmer-Language-OS/pull/231) |
| `khmer-cosmos/KH-eBook-studio` | #1 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KH-eBook-studio/pull/1) |
| `khmer-cosmos/KHMALL` | #1 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KHMALL/pull/1) |
| `khmer-cosmos/khmer-vocabulary` | #1 | CONSTRUCTION: map vocabulary asset repository to KLOS | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/khmer-vocabulary/pull/1) |
| `khmer-cosmos/khmercos.com` | #1 | CONSTRUCTION: map project to CDI Foundation | No | 2026-09-29 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/khmercos.com/pull/1) |
| `khmer-cosmos/khmercos.com` | #2 | prototype: Finance Foundation V1 dry-run | No | 2026-10-04 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/khmercos.com/pull/2) |
| `khmer-cosmos/khmercos.com` | #4 | governance: establish ecosystem product quality baseline | Yes | 2026-10-06 | SSOT / GOVERNANCE | [PR](https://github.com/khmer-cosmos/khmercos.com/pull/4) |
| `khmer-cosmos/khmercos.com` | #5 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/khmercos.com/pull/5) |
| `khmer-cosmos/KHVOD` | #1 | construction: establish Android productization gate | No | 2026-10-06 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/KHVOD/pull/1) |
| `khmer-cosmos/KHVOD` | #3 | feat: add bounded repository inventory and location contract | Yes | 2026-10-11 | OTHER / UNTRIAGED | [PR](https://github.com/khmer-cosmos/KHVOD/pull/3) |
| `khmer-cosmos/NPP-MUSIC-OS` | #1 | feat: NPP Music v1 full-stack construction baseline | No | 2026-10-07 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/NPP-MUSIC-OS/pull/1) |
| `khmer-cosmos/NPP-MUSIC-OS` | #2 | fix: NPP Music Agent QE remediation | No | 2026-10-07 | PRODUCT / FEATURE | [PR](https://github.com/khmer-cosmos/NPP-MUSIC-OS/pull/2) |
| `khmer-cosmos/NPP-MUSIC-OS` | #3 | construction: establish Android productization gate | No | 2026-10-08 | FACTORY / GATE / INFRA | [PR](https://github.com/khmer-cosmos/NPP-MUSIC-OS/pull/3) |
| `khmer-cosmos/SuperAgent` | #2 | CONSTRUCTION: sync CDI adapter with current main | No | 2026-09-29 | OTHER / UNTRIAGED | [PR](https://github.com/khmer-cosmos/SuperAgent/pull/2) |

## Required merge decision fields for every PR

Before moving an item to MERGE-READY, record:
1. exact base SHA and head SHA; changed files and scope boundary;
2. latest CI/check-run conclusions for the exact head SHA;
3. review state, unresolved review threads, and accountable Owner decision where required;
4. dependencies on SSOT, contract, gate, prerequisite PRs, and any required merge order;
5. conflict/mergeability state and whether the branch is stale or diverged;
6. explicit disposition: MERGE-READY / BLOCKED / NEEDS-REWORK / DUPLICATE-CANDIDATE / OWNER-DECISION / CLOSED-NO-MERGE;
7. the decision record and post-merge verification, if later merged.

## Priority lane — formal SSOT and frontend baseline dependencies

| Item | Current known state | Required action |
|---|---|---|
| [kcos-governance-engine PR #5](https://github.com/khmer-cosmos/kcos-governance-engine/pull/5) | Draft; artifact classification candidate, not canonical | Keep open while classification and quality-matrix dependencies are resolved; independent review and Owner decision required |
| [kcos-governance-engine PR #2](https://github.com/khmer-cosmos/kcos-governance-engine/pull/2) | Draft; recurring SSOT inventory/drift watch | Check current workflow evidence, audit-token dependency, scope and maintenance owner before merge |
| [khmercos.com PR #4](https://github.com/khmer-cosmos/khmercos.com/pull/4) | Draft; ecosystem product quality baseline references artifact classification | Block merge/standardization until formal artifact classification and quality-gate contract dependencies are resolved |
| [kcos-frontend-a11y-demo PR #1](https://github.com/ahlis0201-ui/kcos-frontend-a11y-demo/pull/1) | Draft; frontend industrial framework V0.1 candidate | G0 remains BLOCKED until formal prerequisite SSOTs and independent design review/Owner approval are satisfied |
| [kcos-governance-engine Issue #4](https://github.com/khmer-cosmos/kcos-governance-engine/issues/4) | Open blocker | Restore or author/approve Artifact Classification SSOT through lifecycle |
| [kcos-governance-engine Issue #6](https://github.com/khmer-cosmos/kcos-governance-engine/issues/6) | Open blocker | Locate original or author a new candidate matrix; do not substitute scoped CDI matrices |

## Disposition

**No PR is designated merge-ready by this inventory alone.** The next pass must fetch live PR detail, CI, review threads, mergeability and dependency evidence for each candidate in priority order. Old KLOS batch PRs require grouped dependency/duplicate analysis before any bulk merge; no mass merge is authorized.
