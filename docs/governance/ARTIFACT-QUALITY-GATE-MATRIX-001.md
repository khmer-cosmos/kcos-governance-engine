---
standard_id: ARTIFACT-QUALITY-GATE-MATRIX-001
title: KCOS Artifact Quality Gate Matrix
version: V0.1
status: CANDIDATE
lifecycle_state: DRAFT
authority: KCOS Factory Governance — pending owner confirmation
ssot: false
mutable: true
approval: NOT APPROVED
freeze_state: NOT FROZEN
effective_date: null
supersedes: null
---

# ARTIFACT-QUALITY-GATE-MATRIX-001 — KCOS Artifact Quality Gate Matrix

> **Status notice:** This is a newly authored candidate, not a recovered original and not an effective SSOT. It was prepared after bounded repository and historical-branch searches failed to locate the referenced canonical matrix. It must complete independent review, owner approval, freeze, and publication under the governing document lifecycle before any repository may rely on it as canonical.

## 1. Purpose and boundary

This matrix proposes the minimum quality-gate profile required for each artifact type T01–T12 defined by the companion candidate `ARTIFACT-CLASSIFICATION-001`.

It answers: **which classes of acceptance controls must be satisfied for an artifact of a given type, and what evidence/decision is required before the artifact may claim a particular outcome?**

This matrix does not:
- classify an artifact by itself;
- turn a test/build result into product acceptance;
- replace product-specific acceptance contracts or platform-specific release gates;
- authorize merge, release, deployment, migration, or retirement;
- override KCOS Read Gate, document lifecycle, product packaging, or Owner decision authority;
- make a missing or unverified gate definition pass by naming it.

Until this candidate is approved and frozen, all proposed profile identifiers below are design identifiers only, not canonical gate IDs.

## 2. Normative status and relationship

The terms MUST, MUST NOT, SHOULD, and MAY are proposed normative language only. They become enforceable only after the prescribed lifecycle.

The following separation rules are mandatory for the eventual approved standard:
1. Artifact type, maturity, production status, gate result, owner approval, freeze, and release are separate fields/decisions.
2. A repository, feature, backend, test system, reference implementation, build, or demo passing does not by itself establish Finished Product PASS.
3. Gate evaluation MUST bind to exact source revision and evidence; mutable branch names alone are insufficient.
4. A required but unavailable contract or evidence item yields BLOCKED, not PASS or NOT_APPLICABLE.
5. Independent review and Owner approval cannot be synthesized by CI or an automated verifier.
6. Product-specific semantics remain product-owned. This matrix defines common minimum controls only.

## 3. Proposed gate profiles by artifact type

**Status of every row: PROPOSED / OWNER REVIEW REQUIRED.** Profiles are minimum common controls. A product contract may add stricter controls but MUST NOT silently remove a mandatory common control.

| Type | Artifact type | Proposed profile ID | Mandatory control groups | Minimum acceptance evidence | Release implication |
|---|---|---|---|---|---|
| T01 | Finished Product | AGM-T01-PRODUCT-ACCEPTANCE | Identity and scope; product contract; QA process assurance; QC product correctness; security/privacy; integration; platform packaging; operations/support; independent evidence verification; Owner acceptance | Exact source SHA; declared product/scope/owner; requirement-to-test traceability; QA/QC/evidence reports; security and platform-specific results; release manifest/digest; gate decision record; Owner acceptance | Product PASS only after all applicable controls and Owner decision pass; release/deploy is a separate authorization |
| T02 | Backend Product | AGM-T02-BACKEND-ACCEPTANCE | Service/API contract; data/auth/security; compatibility; reliability/observability; integration/contract tests; QA/QC; evidence verification; service Owner acceptance | API/schema contract; source SHA; integration/security test evidence; migration/compatibility evidence where relevant; operational readiness; gate decision | Backend PASS does not imply parent T01 product PASS |
| T03 | Program Feature | AGM-T03-FEATURE-ACCEPTANCE | Feature scope and parent linkage; acceptance criteria; regression and integration; accessibility/security/privacy where applicable; QA/QC; evidence verification | Parent product ID; feature contract; acceptance test evidence; regression result; changed-file/source SHA; known limitations; accountable product decision | Feature PASS is scoped to the feature only |
| T04 | Test System | AGM-T04-TEST-SYSTEM-ACCEPTANCE | Test objective/coverage; deterministic execution; positive and negative controls; oracle/fixture validity; result integrity; isolation/security; maintainability | Test-system contract; versioned fixtures; positive/negative test evidence; repeatability evidence; exact tool/source SHA; known blind spots | Test-system PASS validates the test system, not the product under test |
| T05 | Reference Implementation | AGM-T05-REFERENCE-ACCEPTANCE | Reference scope; conformance to referenced contract; reproducibility; explicit non-production boundary; license/provenance where applicable | Reference contract; exact source SHA; reproducible run/test evidence; deviations and limitations; status marking | Cannot claim production readiness without a separate product-specific T01/T02 gate |
| T06 | Development Tool | AGM-T06-DEV-TOOL-ACCEPTANCE | Input/output contract; safe defaults; permission boundary; error handling; determinism/idempotency where relevant; regression; supply-chain checks proportionate to impact | Tool contract; exact source SHA; valid/invalid input tests; failure-path tests; permissions review; reproducibility and output evidence | Tool PASS does not pass any artifact it creates or modifies |
| T07 | Infrastructure | AGM-T07-INFRA-ACCEPTANCE | Infrastructure contract; access/security; configuration/secrets; availability/recovery; monitoring/logging; capacity/compatibility; change/rollback; independent evidence verification | Infrastructure inventory; exact config/version identity without secrets; security and connectivity checks; health/observability evidence; backup/restore or recovery proof where applicable; rollback plan; change decision | Infrastructure PASS does not imply any hosted product PASS |
| T08 | Developer Artifact | AGM-T08-DEVELOPER-ARTIFACT-CONTROL | Scope and provenance; integrity; safe handling; explicit non-release status; dependency/licensing controls where relevant | Source/blob SHA; purpose/scope; producer; minimal validation; retention/disposition decision | No production/release claim; upgrade to another type requires reviewed reclassification |
| T09 | Data/Knowledge Asset | AGM-T09-DATA-ASSET-ACCEPTANCE | Source provenance; rights/license; privacy/security; schema/encoding; quality/completeness; lineage/versioning; intended-use boundary; independent review where required | Source and content digest; provenance/rights evidence; schema validation; quality metrics; sampling/negative tests; lineage; access/retention rules; use restrictions | Data existence or import success does not prove lawful use, fitness, or model/product quality |
| T10 | Governance Artifact | AGM-T10-GOVERNANCE-SSOT-LIFECYCLE | Authority/owner; source and conflict analysis; normative completeness; independent review; dependency consistency; schema validation where machine-readable; Owner approval; freeze/publication; read receipt for consumers | Document ID/version/status; source commit/blob SHA; review findings/dispositions; Owner decision; freeze and publication evidence; post-freeze Read Receipt tied to exact version; migration/change record | Draft/candidate is not SSOT; approval, freeze, publication, and consumer Read Gate are distinct required events |
| T11 | Prototype/PoC/Demo | AGM-T11-PROTOTYPE-BOUNDARY | Hypothesis/scope; test objective; isolation; safety/privacy; known limitations; explicit non-production and no-release boundary | PoC plan; exact source SHA; experiment results; limitations; risk notes; disposition/next-step decision | PASS means the stated experiment passed only; not product or production acceptance |
| T12 | Legacy/Archive | AGM-T12-ARCHIVE-INTEGRITY | Historical identity; provenance/integrity; retention/access policy; supersession/successor; operational-use prohibition or explicit exception; restoration/retirement decision | Immutable commit/blob/digest; historical owner/scope; archive reason; successor/disposition reference; retention/access rules; integrity check | Archived presence never implies active authority or permission for operational use |

## 4. Mandatory gate decision stages

Each profile MUST evaluate the following stage families when applicable. These stage labels are conceptual control groups, not permission to invent or bypass an existing product-specific gate.

1. **G0 — Identity and authority:** artifact identity, type, owner, parent/scope, applicable contract and authorized work boundary.
2. **G1 — Prerequisite readiness:** required SSOTs fully read, exact-version Read Receipts valid, dependencies resolved, no blocking ambiguity silently bypassed.
3. **G2 — Construction/process conformance:** implementation or artifact production follows the approved contract, change controls, and authorized scope.
4. **G3 — Technical verification:** type-specific positive, negative, regression, security, compatibility, data-quality, or operational checks.
5. **G4 — Independent QA/QC/evidence review:** QA process assurance, QC artifact correctness, and evidence verification are separately recorded where required; production self-approval is not independent verification.
6. **G5 — Integration and target-context acceptance:** applicable parent-product, platform, runtime, interface, and deployment-context controls.
7. **G6 — Owner/gate disposition:** designated acceptor records PASS, BLOCK, or CONDITIONAL-PASS only under the governing gate contract; any conditional acceptance must name non-waivable boundaries, owner, deadline, and residual risk.
8. **G7 — Freeze/release authorization:** where applicable, freeze, package identity/digest, release approval, and deployment authorization are separate from technical PASS.

A profile MAY omit a stage only through an explicit, evidence-backed NOT_APPLICABLE rule permitted by the governing contract. Missing evidence is not a valid reason for omission.

## 5. Gate result vocabulary

Use the governing gate contract's vocabulary when one exists. If no higher-authority vocabulary exists, the following is proposed for this matrix:

- **PASS:** all mandatory checks/evidence and required human decisions are complete and accepted.
- **FAIL:** an evaluated criterion was violated.
- **BLOCKED:** a prerequisite, authority, contract, environment, or required evidence is missing or unresolved.
- **PENDING:** an assigned review or decision has not occurred.
- **CONDITIONAL-PASS:** only when the governing contract explicitly permits it and records owner, conditions, due date, risk acceptance, and non-waivable controls.
- **NOT_APPLICABLE:** a documented rule proves the control does not apply; it is not a substitute for missing data.
- **UNKNOWN:** current truth cannot be established from authoritative evidence.

No state may be inferred from a successful build, a green sub-check, absence of a failure record, repository existence, or stale evidence.

## 6. Minimum evidence envelope

A gate decision must be bound to an immutable evaluation envelope containing, where applicable:
- gate/profile ID and exact version;
- artifact ID/type, parent product/scope, owner reference;
- source repository and exact commit/blob SHA;
- release artifact locator and digest if a release is in scope;
- contract and prerequisite references, each with exact version;
- test/audit method and version, environment/target, timestamps, and result;
- QA, QC, and evidence-verification records as separate records;
- unresolved findings, exceptions, waivers, limitations, and remediation owner;
- designated acceptor, decision, rationale, and timestamp;
- freeze/release/deployment authorization as separate evidence when applicable.

Evidence MUST be truthful, revision-bound, reproducible where feasible, and explicit about coverage limits. The matrix does not authorize fabrication of missing host/runtime observations.

## 7. Existing related gates and non-substitution rule

The bounded search found related documents, including:
- KCOS `docs/product/PRODUCT-PACKAGING-GATE.md` (product/platform packaging controls);
- CDI `QUALITY-CHAIN-001` and `QM-CHAIN-001` (QE and quality-management operating chains);
- CDI `CDI-CONSTRUCTION-GATE-MATRIX-001` (CDI-specific G0–G9 construction sequence);
- CDI `CDI-PROJECT-INTEGRATION-QA-MATRIX-001` and `CDI-WHOLE-LIBRARY-ACCEPTANCE-MATRIX-001`;
- CDI `EPS-001-C` and `EPS-001-D` (gate decision and gap templates).

These assets have distinct scopes/statuses. Their existence does not prove that they are equivalent to this referenced artifact-type-to-quality-gate matrix. After independent review, the final version must explicitly map to each applicable existing gate by canonical ID/version or record the unresolved dependency as BLOCKED. No silent rename, equivalence assumption, or substitution is permitted.

## 8. Compatibility and migration

This candidate does not authorize mass declaration migration. Before adoption:
1. Identify all declarations and consumers referencing this matrix, classification SSOT, product/scope registries, maturity/status enums, and gate contracts.
2. Confirm canonical owner/product/scope registries and exact IDs.
3. Validate the proposed profiles against representative declarations from KCOS, CDI Foundation, and product repositories.
4. Produce a schema and migration map that preserves legacy fields and all existing information; do not silently drop `primary_product`, `primary_domain`, empty scope values, or release references.
5. Decide the representation for unresolved/unavailable gate IDs; required dependencies must remain BLOCKED.
6. Run static schema validation and negative tests for missing fields, unknown IDs, wrong type/profile combinations, empty-string placeholders, stale receipts, mismatched source SHAs, missing approval, and false release claims.
7. Record before/after diffs and hashes per controlled batch. No migration until the final SSOT is approved/frozen and the required Read Gate receipt is valid.

## 9. Open decisions before approval

- Confirm accountable owner and canonical location.
- Confirm whether profile identifiers in §3 are accepted or must map to existing canonical gate IDs.
- Confirm applicability/waiver authority and whether CONDITIONAL-PASS is allowed for each type.
- Confirm product/scope registry and owner registry.
- Confirm maturity/production-status enums and machine-readable declaration schema.
- Confirm evidence retention, security/privacy and exception requirements by product domain.
- Confirm the required independent reviewer(s) and Owner approval/freeze/publication sequence.
- Validate every profile against actual declarations and existing product-specific contracts.
- Define compatibility/migration order and post-freeze Read Gate procedure.

## 10. Candidate acceptance checklist

- [ ] Independent governance review completed; findings resolved or explicitly dispositioned.
- [ ] All T01–T12 mappings reviewed against actual canonical gate contracts.
- [ ] Owner, product/scope, maturity/status registries and schema dependencies resolved.
- [ ] Positive and negative schema/profile tests pass on representative declarations.
- [ ] No existing gate contract is silently replaced or conflated.
- [ ] Migration map preserves existing declaration semantics and history.
- [ ] Owner approval recorded under the governing lifecycle.
- [ ] Freeze and publication evidence recorded for exact revision.
- [ ] Consumers produce valid post-freeze Read Receipts before using the matrix.
- [ ] Dependent gates remain BLOCKED until these conditions are satisfied.

## 11. Change control

This V0.1 document is DRAFT/CANDIDATE, `ssot: false`, NOT APPROVED, NOT FROZEN, and not effective. Changes are permitted only on a non-main branch during review. After freeze, changes require a new version and the prescribed lifecycle. No repository-wide migration, gate promotion, release, or deployment is authorized by this candidate.
