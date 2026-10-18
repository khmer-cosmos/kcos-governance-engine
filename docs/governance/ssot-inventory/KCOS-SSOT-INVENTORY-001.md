---
standard_id: KCOS-SSOT-INVENTORY-001
title: KCOS Ecosystem SSOT Inventory and Drift Watch
version: V0.1
status: CANDIDATE
ssot: false
---

# KCOS Ecosystem SSOT Inventory and Drift Watch

## 1. Purpose

This workstream discovers the repository scope and collects evidence about SSOT candidates, governance entrypoints, read-gate material, and cross-repository references. It is an operational inventory process, not a new authority over product or domain baselines.

The inventory report is generated evidence. It MUST NOT be treated as an SSOT, and automated filename/content matching MUST NOT promote a candidate to VERIFIED.

## 2. Why this is not a standalone document

The workflow at `.github/workflows/kcos-ssot-inventory.yml` runs on a daily schedule and on manual dispatch. It:
1. runs an offline syntax/self-test;
2. discovers repositories in the configured GitHub organization and additional owners;
3. records default-branch HEAD SHA and Git tree SHA;
4. inspects candidate documents and governance materials;
5. uploads JSON and Markdown evidence artifacts;
6. creates or updates one durable GitHub issue while findings or scan incompleteness remain.

The tracking issue is the operational queue. The scheduled workflow is the recurring trigger. The JSON report is the machine-readable evidence. This standard explains how to interpret those outputs.

## 3. Scope and source of truth

Scope is defined in `docs/governance/ssot-inventory/scope.json`. The current candidate scope is:
- all repositories in the `khmer-cosmos` organization;
- all repositories owned by `ahlis0201-ui`, to catch repositories outside the organization and possible migration remnants.

This is a discovery boundary, not a claim that every discovered repository is a product project. Repository purpose and ownership must be classified from evidence before exclusions are approved. Do not silently drop empty, inaccessible, archived, migrated, or oddly named repositories.

The canonical frozen document currently recorded in the scope file is `KCOS-DOCUMENT-LIFECYCLE-001 V1.0`. This inventory does not change that frozen baseline or decide whether its declared scope should expand.

## 4. Authentication and operational prerequisite

A complete inventory includes private repositories and therefore requires a GitHub Actions repository secret named `KCOS_AUDIT_TOKEN`. The token must have read access to the repositories in scope and permission to list the organization and configured additional owner repositories.

If the secret is absent or access is incomplete, the scanner fails closed and reports the run as incomplete. Public-only results MUST NOT be described as a complete KCOS inventory.

The workflow uses the repository's GitHub Actions token only for updating the tracking issue and uploading run evidence. The cross-repository audit token is not printed in logs or written to artifacts.

## 5. Finding semantics

- `HIGH` / `BLOCKED`: an integrity issue or evidence gap prevents a complete, reliable inventory.
- `REVIEW`: a human must determine authority, applicability, ownership, or whether a candidate is truly project/domain SSOT.
- `PROJECT_DOMAIN_SSOT_REVIEW_REQUIRED`: the automated scan did not identify a domain SSOT candidate in the reviewed paths. This is NOT proof that no SSOT exists.
- `GOVERNANCE_ENTRYPOINT_NOT_DOMAIN_PROOF`: a README points to a repository lifecycle/governance entrypoint; that does not prove coverage of the product's architecture, contracts, data model, or operational behavior.
- `LEGACY_CANONICAL_REPO_REFERENCE`: a workflow references the previous owner name. This requires redirect and migration verification; it is not automatically a broken link.
- `CENTRAL_SSOT_SCOPE_REVIEW_REQUIRED`: a frozen document's declared scope may not match the set of repositories consuming it. Do not edit a frozen baseline in place to clear this finding.

## 6. Verification limits

The scanner can inspect default-branch repository metadata, tree entries, selected document contents, declared paths, pinned SHA values, and presence of read-gate materials. It cannot prove:
- that a human actually read a document;
- that a project has complete domain coverage;
- that a branch protection/ruleset makes a check required;
- that production matches the default branch;
- that a service is operational or that a contract is implemented correctly.

Those require separate evidence and explicit review.

## 7. Closure conditions

A finding may be closed only when the tracking issue contains:
1. the affected repository and default-branch HEAD SHA;
2. the relevant path/blob SHA or a documented access failure;
3. the decision, owner, and accepted remediation or reason for no change;
4. verification evidence from the repaired state;
5. a new scan confirming the issue is resolved, or an explicit accepted exception with expiry/review date.

No finding may be closed merely because a file was created or the report was rewritten.

## 8. Status

This is a candidate operational workstream. The pull request MUST remain unmerged until:
- the scanner self-test passes;
- the GitHub Actions secret `KCOS_AUDIT_TOKEN` is configured;
- the accountable governance owner for the tracking issue is named;
- the first scheduled/manual scan produces a readable evidence artifact and a durable tracking issue;
- the scope and output are reviewed against actual repository access.

A passing self-test is not a passing ecosystem inventory. A successful workflow is not proof that every project has a valid SSOT.
