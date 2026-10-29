# Incident Handoff Review

A ServiceNow scoped application that identifies repeated incident assignment-group handoffs and manages structured review cycles to improve ownership visibility, track follow-up actions, and support operational oversight through automated review management, notifications, and dashboard reporting.

## Technical Stack & Capabilities

The application was developed in ServiceNow Studio as a scoped application, using platform configuration and server-side scripting to implement the Incident Handoff Review process.

- **Business Rules:** Evaluate Incident updates and manage IHR creation and counter updates.
- **UI Actions:** Provide form actions for starting and completing reviews.
- **UI Policies and Data Policies:** Enforce conditional field visibility, mandatory requirements, and read-only behavior.
- **Flow Designer:** Automates review assignment, notifications, cancellation, and pending-review reminders.
- **Application Roles and ACLs:** Control access to IHR records.
- **Reports and Dashboard:** Present review statuses, outcomes, handoff counts, and aging information for operational visibility.


## Table of Contents

1. [The Problem & The Solution](#1-the-problem--the-solution)
2. [System Architecture & Workflow](#2-system-architecture--workflow)
   - [Detection & Review-Cycle Management](#21-detection--review-cycle-management)
   - [Review Lifecycle & User Actions](#22-review-lifecycle--user-actions)
   - [Automation & Notifications](#23-automation--notifications)
   - [Access Control & Dashboard Visibility](#24-access-control--dashboard-visibility)
3. [Validation & Test Scenarios](#3-validation--test-scenarios)
4. [Repository File Index](#4-repository-file-index)

---

## 1. The Problem & The Solution

In ServiceNow, repeated incident assignment-group handoffs can make ownership difficult to track and follow-up harder to coordinate. When an incident moves between groups multiple times, it may require additional attention to ensure that the handoffs and their outcomes are reviewed.

**Incident Handoff Review** is a scoped ServiceNow application that introduces a structured review process for incidents with repeated assignment-group handoffs. It creates a separate review record when the configured handoff threshold is met, tracks handoff and reopen activity, and supports review management through defined statuses, reviewer assignment, notifications, and automated handling of relevant incident state changes.

The application complements the existing Incident process rather than replacing it. The existing Incident record continues to hold the incident details and operational state, while the review record provides a dedicated place to manage review progress, document outcomes, and monitor handoff trends through a dashboard.

## 2. System Architecture & Workflow

### 2.1 Detection & Review-Cycle Management

A Business Rule evaluates Incident updates and creates an Incident Handoff Review (IHR) when the assignment-group handoff threshold of three is met. For active reviews, it updates handoff and reopen counts independently as those counts increase. If the latest review is no longer active, a new review cycle is created only after at least three additional handoffs since the previous review's recorded handoff count. The rule also checks Incident state eligibility before processing.

### 2.2 Review Lifecycle & User Actions

Each IHR follows a lifecycle with the statuses `Pending`, `Under Review`, `Complete`, `Escalated`, and `Cancelled`. Reviewers use the **Start Review** and **Complete Review** form actions to manage review progress. Completing a review requires review notes, while selecting `Escalated` requires `Escalated To` and `Escalation Reason`. The reviewer determines the appropriate outcome based on their assessment of the Incident.

### 2.3 Automation & Notifications

Flow Designer automates review assignment and notifications, cancels eligible reviews when their related Incidents reach `Resolved`, `Closed`, or `Canceled`, and sends reminders when a review remains `Pending` for more than one day. Automatic cancellation records an explanatory note and sends a notification.

### 2.4 Access Control & Dashboard Visibility

UI Policies control conditional field visibility and mandatory requirements, while the Data Policy makes designated fields read-only when Review Status is `Complete`, `Escalated`, or `Cancelled`. This prevents changes to the specified review details after the review has been finalized. Application roles and access control rules (ACLs) govern access to IHR records, restricting create and delete permissions to administrators while allowing authorized users to read and update records.

The **Incident Handoff Review Dashboard** presents review status distribution, reviews requiring attention, review outcomes, handoff counts, and review aging to support operational monitoring.


## 3. Validation & Test Scenarios

The application was tested across its core business logic, review lifecycle, automated workflows, and field controls.

- **Handoff Detection & Review Cycles:** Verified review creation at the three-handoff threshold, eligibility conditions, independent handoff and reopen counter updates, no-update behavior when neither counter increases, and creation of subsequent review cycles after three additional handoffs.
- **Review Lifecycle & Validation:** Tested the Start Review and Complete Review actions, mandatory-field behavior, escalation field visibility and requirements, and prevention of review completion when notes are empty.
- **Automated Workflows & Notifications:** Verified review assignment and notifications, automatic cancellation for related Incidents reaching Resolved, Closed, or Canceled states, and reminders for reviews remaining Pending for more than one day.
- **Field Controls:** Verified the configured read-only behavior for finalized reviews.
- **Error Handling:** Tested Business Rule insert and update failure paths and verified that errors were logged as expected.
- **Access Controls:** Verified that users with the application user role can read and update IHR records but cannot create or delete them, while administrators have all four permissions.

## 4. Repository File Index

The repository is organized by application component. Each folder contains its documentation and, where applicable, the implementation scripts. The testing and evidence folder documents validation scenarios and provides supporting screenshots of key application behaviors and Flow Designer executions.

- **[Business Rule](https://github.com/failedtoasync/servicenow-incident-handoff-review/tree/main/business-rule)** — Configuration, logic, and implementation script for IHR creation, counter updates, and review-cycle management.
- **[UI Actions](https://github.com/failedtoasync/servicenow-incident-handoff-review/tree/main/ui-actions)** — Configuration, behavior, and scripts for the Start Review and Complete Review actions.
- **[Flow Designer Automation](https://github.com/failedtoasync/servicenow-incident-handoff-review/tree/main/flow-designer-automation)** — Review assignment, notifications, automatic cancellation, and pending-review reminders.
- **[Field Controls and Access](https://github.com/failedtoasync/servicenow-incident-handoff-review/tree/main/field-controls-and-access)** — UI Policies, Data Policy, application roles, and ACL configuration.
- **[Dashboard](https://github.com/failedtoasync/servicenow-incident-handoff-review/tree/main/dashboard)** — Dashboard purpose and visualization details.
- **[Testing and Evidence](https://github.com/failedtoasync/servicenow-incident-handoff-review/tree/main/testing-and-evidence)** — Test scenarios, validation results, and supporting screenshots.
