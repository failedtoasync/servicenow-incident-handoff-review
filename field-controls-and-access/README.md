# Field Controls and Access

This section documents the controls used to manage field behavior and record access in the Incident Handoff Review (IHR) application.

## 1. UI Policies

### Review Notes Mandatory

**Purpose:** Ensures reviewers document their findings before a review can be considered complete or cancelled, and requires notes while a review is in progress.

**Condition:** Review Status is Under Review, Cancelled, or Complete.

**UI Policy Action:** Sets `review_notes` to mandatory.


### Escalation Fields

**Purpose:** Ensures the reviewer records the relevant escalation category and reason when a review outcome is marked as Escalated, providing context for the review decision.

**Condition:** Review Status is Escalated.

**UI Policy Actions:**
- Sets `escalated_to` to visible and mandatory.
- Sets `escalation_reason` to visible and mandatory.


## 2. Data Policy

The Data Policy protects recorded review details from being modified after a review reaches a terminal status, helping preserve the outcome and information captured during the review.

**Condition:** Review Status is Complete, Escalated, or Cancelled.

**Fields set to read-only:** `review_owner`, `escalated_to`, `escalation_reason`, `review_notes`, `incident`, and `review_status`.


## 3. Access Controls (ACLs)

Access controls define which operations users can perform on Incident Handoff Review records based on their application roles. This allows regular users to access and update review records while restricting record creation and deletion to administrators.

### Application Roles

The application uses two custom roles:

- `x_1880631_incide_0.admin` — Admin role
- `x_1880631_incide_0.user` — User role

### Table ACLs

Four table-level ACLs are configured for `x_1880631_incide_0_incident_handoff_review`:

- **Create:** Restricted to users with the Admin role.
- **Read:** Allowed for users with either the Admin or User role.
- **Write:** Allowed for users with either the Admin or User role.
- **Delete:** Restricted to users with the Admin role.
**Admin Overrides** is enabled on all four ACLs.
