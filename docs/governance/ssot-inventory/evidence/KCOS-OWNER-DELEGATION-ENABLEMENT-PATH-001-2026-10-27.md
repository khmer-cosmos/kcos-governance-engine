# KCOS Owner Delegation Enablement Path — 001

**Status:** PROPOSED CONTROLLED PATH — NOT AN APPOINTMENT, DELEGATION, APPROVAL, OR SIGNATURE  
**Date:** 2026-10-27  
**Related review:** https://github.com/khmer-cosmos/kcos-governance-engine/pull/9  
**Purpose:** Convert the unresolved request for AI-assisted KCOS governance into a deterministic, auditable authorization workflow without bypassing the existing SSOT or inventing authority.

## 1. Unambiguous disposition

The request “appoint ChatGPT as KCOS Owner and allow it to decide and sign” is **not effective by itself**. Neither a chat message, a repository write permission, a draft document, nor a pull request is proof that the sender holds the formal appointment power.

Until all mandatory gates below pass:

- Human/legal Owner of record: **UNCHANGED / NOT RE-ASSIGNED**
- ChatGPT as KCOS Owner: **NOT APPOINTED**
- Delegated decision authority: **NOT GRANTED**
- Signature authority: **NOT GRANTED**
- Frozen SSOT changes: **PROHIBITED**
- Production or governance state changes requiring D3/D4 authorization: **BLOCKED**
- This document: **proposal only**

No operator may interpret a blank, unknown, inferred, or chat-only field as approval.

## 2. Deterministic authorization gates

### Gate A — Identify the appointing authority

Collect the authoritative source that establishes who may appoint or delegate the KCOS Owner role (for example, the governing charter, approved owner registry, corporate instrument, or formally adopted succession/delegation rule).

Required evidence:
1. Exact document identifier, version, status, and canonical repository/location.
2. Exact clause granting appointment/delegation power.
3. Current identity of the authorized appointing person/body.
4. Evidence that this rule is in force and has not been superseded.
5. Independent reviewer confirmation that the evidence matches the rule.

**Pass condition:** all five items are present and independently verified.  
**Fail condition:** any item is missing, draft-only, contradictory, or inferred. Gate remains BLOCKED.

### Gate B — Validate the requested appointee and permissible role

The appointing authority must explicitly decide whether an AI system may hold the legal/organizational Owner role at all. If not, the permissible alternative is a named human Owner with a bounded AI governance-agent delegation.

The decision must distinguish:
- legal/organizational Owner of record;
- delegated governance agent;
- technical executor;
- reviewer/auditor;
- cryptographic signer.

These identities are not interchangeable.

**Pass condition:** an in-force rule explicitly permits the proposed role and records the accountable human principal.  
**Fail condition:** eligibility is silent or prohibited. Do not relabel an agent as Owner to bypass this gate.

### Gate C — Approve a bounded delegation instrument

The formal instrument must specify, in machine-readable and human-readable form:
- principal and appointee identities;
- exact authority source and clause;
- permitted decision classes and repositories;
- explicit exclusions (including changes to frozen SSOT, self-appointment, self-approval, and any unlisted D4 decision);
- approval thresholds and mandatory human checkpoints;
- duration, expiry, revocation procedure, and emergency suspension;
- conflict-of-interest and independent-review requirements;
- evidence-retention and audit-log requirements;
- effective time in an unambiguous timezone;
- version/hash of the approved instrument.

No “all powers”, “full authority”, or undefined “Owner permissions” wording is sufficient.

### Gate D — Separate decision authority from signature authority

Decision permission does **not** grant signing permission.

If signing is authorized, the instrument must define:
- signer identity and the legal meaning of the signature;
- approved signing service and verification method;
- key custody and access controls (no private key embedded in prompts, source code, or ordinary documents);
- human approval requirements for high-impact signatures;
- signature payload, timestamp, artifact hash, revocation, and audit evidence;
- independent verification of a test signature before production use.

Until the signing path is verified, all Owner-signature fields remain **PENDING HUMAN SIGNATURE**. ChatGPT must not claim to have signed.

### Gate E — Record, verify, and activate

1. Independent governance reviewer checks Gates A–D.
2. The authorized appointing authority signs the final appointment/delegation instrument using the approved mechanism.
3. The record is appended to the authoritative registry; append-only rules are respected.
4. The relevant authorization validator passes, including `authorization_state: AUTHORIZED` and a resolvable `authorization_evidence` reference for D3/D4 work.
5. A second reviewer verifies the registry entry, signature, scope, expiry, and validator output.
6. Only then may explicitly listed permissions become effective. Unlisted permissions remain denied by default.

The PR merge, by itself, does not activate the appointment. The registry and authorization evidence must agree.

## 3. Required final record schema

Use the repository's existing schema if one is authoritative. Otherwise propose an additive schema through the normal governance process; do not silently alter a frozen SSOT.

```yaml
record_type: KCOS_OWNER_APPOINTMENT_OR_DELEGATION
status: PROPOSAL_NOT_EFFECTIVE
appointing_authority:
  identity: PENDING_VERIFICATION
  authority_document_id: PENDING
  authority_clause: PENDING
appointee:
  identity: ChatGPT assistant
  role_type: GOVERNANCE_AGENT_ONLY_UNLESS_AI_OWNER_ELIGIBILITY_IS_EXPLICITLY_APPROVED
accountable_human_owner: PENDING_VERIFICATION
scope:
  allowed_decision_classes: []
  allowed_repositories: []
  excluded_actions:
    - self_appointment
    - self_approval
    - frozen_ssot_mutation_without_approved_change_control
    - unlisted_D4_decisions
decision_authority: NOT_GRANTED
signature_authority: NOT_GRANTED
signing_service_and_verification: PENDING
effective_from: null
expires_at: null
revocation_rule: PENDING
authorization_evidence: PENDING
independent_review: PENDING
signed_instrument_ref: PENDING
```

## 4. Required outcome labels

Only these state transitions are valid:

- `PROPOSAL_NOT_EFFECTIVE` → `AUTHORITY_EVIDENCE_PENDING` when a candidate authority source is submitted.
- `AUTHORITY_EVIDENCE_PENDING` → `AUTHORITY_VERIFIED` only after independent validation of Gate A.
- `AUTHORITY_VERIFIED` → `ELIGIBILITY_APPROVED` only after Gate B passes.
- `ELIGIBILITY_APPROVED` → `DELEGATION_SIGNED` only after Gate C is signed by the verified authority.
- `DELEGATION_SIGNED` → `SIGNATURE_AUTHORIZED` only after Gate D independently passes. This transition is not required for decision-only delegation.
- `DELEGATION_SIGNED` or `SIGNATURE_AUTHORIZED` → `ACTIVE` only after Gate E completes.

Any failure, contradiction, expiry, or revocation returns the relevant permissions to **SUSPENDED/BLOCKED**. No automatic transition may be inferred from a PR merge or conversational “approved”.

## 5. Immediate next action

The next actionable input is the authoritative appointment/delegation rule and the current Owner-of-record evidence, not another generic approval message. Search the governance repositories and registries for those records; if none is found, record the gap and submit a formal governance change request to the body/person whose authority is established by the currently effective charter. Do not guess who that authority is.

## 6. Non-negotiable invariant

**The process must create valid authority before exercising authority.** The assistant may prepare evidence, draft the instrument, run validators, and perform explicitly delegated technical work. It may not appoint itself, manufacture the appointing authority, self-approve its eligibility, or self-certify a signature.
