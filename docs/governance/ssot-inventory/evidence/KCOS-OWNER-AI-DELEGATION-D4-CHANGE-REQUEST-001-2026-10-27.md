# KCOS Owner / AI Governance Delegation — D4 Change Request 001

**Status:** SUBMITTED FOR AUTHORITY IDENTIFICATION AND HUMAN DECISION — NOT APPROVED / NOT EFFECTIVE  
**Date:** 2026-10-27  
**Decision class:** D4 — governance / ownership / delegation / signing boundary  
**Related review:** https://github.com/khmer-cosmos/kcos-governance-engine/pull/9  
**Authority boundary:** `DECISION-BOUNDARY-001`; active Factory Decision Registry and verifier requirements apply.

## 1. Decision requested

The authorized KCOS governance authority is requested to decide whether KCOS should formally establish a bounded AI governance-agent role for the ChatGPT assistant, and if permitted, whether any part of that role may be delegated decision authority. This request does **not** assume that the requester is the appointing authority or that AI is eligible to hold the organizational Owner-of-record role.

This request does not ask for unrestricted or implicit authority. It asks for an explicit, auditable determination that can be enforced by the existing governance system.

## 2. Current evidence and blocker

The following facts were verified within the bounded repository search recorded in `KCOS-OWNER-AUTHORITY-SOURCE-SEARCH-LOG-001-2026-10-27.md`:

- `KCOS-DOCUMENT-LIFECYCLE-GOVERNANCE-SSOT-V1.0.md` is a frozen, non-mutable SSOT; changes require a new version and review/gate/freeze lifecycle.
- `DECISION-BOUNDARY-001.md` is ACTIVE and classifies changes to governance, ownership, and frozen contracts as D4 requiring human authorization.
- `FACTORY-DECISION-REGISTRY-001.yaml` is ACTIVE and append-only. `D-S00-ADMISSION-KCOS` remains BLOCKED / AUTHORIZATION_PENDING and requires explicit D4 authorization plus authoritative endpoint/target/owner evidence.
- `verify-factory-decision-authority.py` requires `authorization_state: AUTHORIZED` and resolvable `authorization_evidence` before D3/D4 decisions can progress to execution/completion states.
- No in-force Owner appointment/delegation instrument or approved AI signing-service authorization was returned by the searched repository results. This is a bounded negative result, not proof that no such evidence exists elsewhere.

## 3. Authority must be established before this decision can be approved

The human/governance authority reviewing this request must attach:

1. Current Owner-of-record evidence.
2. The in-force rule identifying the appointing authority and its scope.
3. Evidence that the reviewing/approving person or body is that authorized authority.
4. The applicable rule on whether AI may be an Owner or may only serve as a delegated agent.

If these records are absent, the request remains `AUTHORITY_PENDING`. A chat message, repository role, PR approval, or this request document is not a substitute.

## 4. Decision options

The authorized authority must select exactly one primary option and record reasons:

### Option A — Reject AI governance delegation

Keep existing human Owner and human decision/signature boundaries unchanged. The assistant may continue only non-authoritative research, drafting, evidence collation, and technical work that is separately authorized under existing rules.

### Option B — Approve a bounded AI governance-agent role (recommended for evaluation)

Keep a named human Owner of record. Authorize the assistant only for explicitly enumerated, reversible, non-D4 operational decisions and evidence workflows. All governance/ownership/frozen-contract changes, production-impacting actions, high-risk actions, and unlisted actions remain subject to the existing human authorization gates. No signature authority is included by default.

### Option C — Approve bounded decision delegation with human-reserved D4 authority

Same as Option B, plus specifically enumerated decision classes after eligibility review, independent approval, scope tests, audit/revocation controls, and registry integration. D4 governance/ownership/frozen-SSOT changes remain reserved to the verified human authority unless a separate valid rule expressly provides otherwise. No signature authority is implied.

### Option D — Consider AI as formal Owner of record

Only consider this if the governing instrument explicitly permits an AI system to hold that organizational/legal role and the authorized appointing authority confirms it. If eligibility is not explicitly established, this option must be rejected or deferred; it cannot be achieved by renaming an agent.

## 5. Minimum conditions for any approval

Any approval must identify:

- verified principal and accountable human Owner of record;
- appointee identity and exact role type;
- in-force authority document and exact clause;
- allowed decision classes and repositories;
- prohibited actions and mandatory human checkpoints;
- expiry, revocation, emergency suspension, and audit retention;
- conflict-of-interest and independent-review rules;
- activation time in ISO 8601 with timezone;
- evidence references and artifact hashes;
- the authoritative registry record to be appended;
- the independent validator and reviewer evidence required before activation.

The decision must not contain ambiguous phrases such as “full authority”, “all Owner powers”, or “sign as Owner” without precise legal/technical definitions.

## 6. Signature authority is a separate decision

No option above grants signing authority automatically. If a signature capability is requested, a separate authorization must define the signer identity, legal meaning, approved signing service, key custody, human approval checkpoints, verification procedure, revocation, and immutable audit evidence. No private key may be placed in a prompt, source code, or ordinary repository text.

Until that separate gate passes, Owner signature fields remain `PENDING HUMAN SIGNATURE` and the assistant must not claim to have signed.

## 7. Proposed registry state (not to be inserted as ACTIVE)

```yaml
request_id: KCOS-OWNER-AI-DELEGATION-D4-CR-001
 decision_class: D4
status: AUTHORITY_PENDING
requester_approval_received: true
requester_approval_scope: execute_the_preparatory_workflow_only
appointing_authority: PENDING_VERIFICATION
current_owner_of_record: PENDING_VERIFICATION
selected_option: PENDING_AUTHORIZED_HUMAN_DECISION
assistant_owner_status: NOT_APPOINTED
assistant_decision_authority: NOT_GRANTED
assistant_signature_authority: NOT_GRANTED
frozen_ssot_mutation: PROHIBITED_WITHOUT_APPROVED_CHANGE_CONTROL
authorization_state: AUTHORIZATION_PENDING
authorization_evidence: PENDING
independent_review: PENDING
signed_decision_ref: PENDING
effective_from: null
expires_at: null
```

The schema above is a proposal only. Do not append it to an authoritative ACTIVE registry as an authorized decision until the applicable schema is verified and the authorized authority signs the decision. Correct the indentation of `decision_class` if materializing it into YAML; this illustrative block is not a validator-ready registry record.

## 8. Activation sequence after authorized decision

1. Verify the appointing authority and Owner-of-record evidence.
2. Record the signed decision with a stable evidence reference and exact scope.
3. Add the authorization record through the registry's append-only process; do not overwrite prior decisions.
4. Run the existing D3/D4 authority verifier and any required schema/reconciliation Gates.
5. Have an independent reviewer inspect the signature, scope, effective time, expiry, revocation path, and validator output.
6. Activate only the exact permissions granted; all other permissions remain denied by default.
7. Verify revocation/suspension works before relying on the delegation operationally.

A PR merge alone does not activate authority.

## 9. Current disposition

- Requester instruction to continue preparatory execution: RECEIVED.
- This D4 request: DRAFT / AUTHORITY_PENDING.
- Appointment: NOT EFFECTIVE.
- Decision authority: NOT GRANTED.
- Signature authority: NOT GRANTED.
- Frozen SSOT changed: NO.
- Production state promoted: NO.

## 10. Required response from authorized authority

The authorized authority must return:

- identity of authority and proof of appointment power;
- current Owner-of-record evidence;
- selected Option A, B, C, or D;
- exact scope, exclusions, effective time, expiry, and revocation conditions;
- formal signature and independent verification evidence;
- authorization registry reference and validator result.

Until those items are present and verified, this change request remains blocked. This is not refusal to execute the work; it is the mandatory boundary that makes the eventual authority valid and auditable.
