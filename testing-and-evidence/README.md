# Testing & Evidence

This document describes the testing performed on the Incident Handoff Review (IHR) application to verify its business logic, review lifecycle, automation, field behaviour, error handling, and access controls. It summarizes the scenarios tested, the expected application behaviour, and the validation results. Selected screenshots are also provided as evidence of key application behaviours and Flow Designer executions.


## Tested Scenarios

### Business Rule — IHR Creation and Counter Updates

The *Create Incident Handoff Review* Business Rule was tested to verify IHR creation when an eligible Incident reaches the handoff threshold of three and no existing IHR is present. Tests confirmed that the Incident reference, counters, Review Required flag, and Pending status were populated correctly.

Independent and simultaneous Handoff Count and Reopen Count updates worked as expected, with no unnecessary updates when neither counter changed. The rule also correctly skipped Incidents associated with a Problem or outside eligible states. A new IHR was successfully created when an inactive review existed and the Incident accumulated at least three additional reassignments.


### Review Form and UI Actions

The review form and UI Policies were tested to verify mandatory Review Notes for Under Review, Cancelled, and Complete statuses, along with the visibility and mandatory requirements for escalation fields. The Start Review UI Action correctly changed the status to Under Review and populated Review Started On. The Complete Review UI Action prevented completion when Review Notes were missing and completed the review successfully when notes were provided.


### Flow Designer Automation

The `IHR - Review Assignment & Notification` flow was tested to verify review assignment processing, the configured Incident update, and reviewer notifications. The `IHR - Cancel on Incident Terminal State` flow was tested to confirm that applicable reviews are cancelled when an Incident reaches Resolved, Closed, or Canceled, with an automatic cancellation note and email notification. The `IHR - Pending Review Reminder` flow was tested to verify that Pending reviews exceeding the configured one-day threshold are identified and reminder notifications are sent. All three flows executed successfully.


### Data Policy, Error Handling, and Security

The Data Policy was tested to confirm that the configured fields become read-only when the review status is Complete, Escalated, or Cancelled. Error handling was verified by temporarily forcing insert and update failures and checking the resulting error logs; the original implementation was then restored. Security testing confirmed that users could read and update records but could not create or delete them, while administrators could perform all four operations.


### Dashboard

The Incident Handoff Review Dashboard was tested to verify its visualizations for review status, reviews requiring attention, review outcomes, handoff counts, and review aging. The charts displayed the expected information, providing a consolidated view of IHR records to support operational monitoring. Testing was successful.



## Screenshots & Evidence

The following screenshots demonstrate key application behaviours and provide visual evidence of the testing performed across the Incident Handoff Review application.

### IHR Creation and Counter Updates

**Incident Threshold Breach & Initial Record Generation**

**Left View:** Shows an Incident record reaching the handoff threshold of three reassignments (moving from 2 to 3) and the automated Work Note added to the Incident by the assignment flow after the review record is created.

**Right View:** Shows the newly created Incident Handoff Review record in a `Pending` status, with the parent Incident reference and an initial Handoff Count of 3 populated.

[View Image — Incident Reassignment Count and New IHR](IMAGE_1.png)


**Counter Independence & Escalation Controls**

**Left View:** Shows the Business Rule updating the active review record. It updates the reassignment count (from 3 to 5) and the reopen count (to 1) independently based on what changed on the Incident, without creating duplicate rows.

**Right View:** Shows the escalation UI Policy in action. Changing the status to `Escalated` dynamically shows the `Escalated To` and `Escalation Reason` fields and makes them mandatory, blocking form submission if left blank.

[View Image — IHR Counter Update and Escalation UI Policy](IMAGE_2.png)


### Review Completion and Data Policy

**Complete Review Validation and Data Policy**

**Left View:** Shows the `Complete Review` UI Action validating text input. When the field is empty or contains only spaces, an error is displayed to block submission and ensure the reviewer documents the required notes.

**Right View:** Shows a review record transitioned into a terminal status (`Cancelled`) and updated with an automatic cancellation note by the `IHR - Cancel on Incident Terminal State` flow. The Data Policy has executed correctly, making the configured fields read-only to protect the review data.

[View Image — Complete Review Validation and Data Policy](IMAGE_3.png)


**New Review Cycle and IHR Related History**

**Left View:** Shows a new review record (`IHR0001064`) created for the same Incident (`INC0010070`) after the previous review record became inactive and the Incident accumulated three additional reassignments, bringing the count to 6.

**Right View:** Shows the `IHR History` related list displaying all the review records created for the same Incident over time.

[View Image — New Review Cycle and IHR Related History](IMAGE_4.png)


### Notifications and Error Logging

**Flow Notifications and Business Rule Error Logs**

**Left View:** Shows the outbound email records generated by the Flow Designer automation suite for review assignments, cancellations, and pending reminders.

**Right View:** Shows the error logs generated by the Business Rule when an operation fails, verifying custom error capturing for initial review creation, active review updates, and subsequent review cycles.

[View Image — Flow Notifications and Business Rule Error Logs](IMAGE_5.png)


### Dashboard

**Operational Governance Workspace**

Shows the Incident Handoff Review Dashboard rendering the configured visualizations for tracking status distribution, active items requiring attention, final review outcomes, handoff count volumes, and review aging timelines.

[View Image — Incident Handoff Review Dashboard](IMAGE_6.png)


### Flow Designer Executions

**Review Assignment Workflow Logs**

Verifies successful runtime execution for the `IHR - Review Assignment & Notification` flow. Displays sequential action progression (Incident record update → Assignment of reviewer to IHR record → Send email to reviewer), reaching a successful state of `Completed` for target record `IHR0001063`.

[View Image — Review Assignment & Notification](FLOW_1.png)


**Incident Terminal State Cancellation Logs**

Provides runtime evidence for the `IHR - Cancel on Incident Terminal State` flow. Verifies successful execution of the core lookup condition loop, modifying child records and sending notifications asynchronously when an upstream parent Incident closes.

[View Image — Cancel on Incident Terminal State](FLOW_2.png)


**Scheduled Pending Reminder Logs**

Validates scheduled batch processing logs for the `IHR - Pending Review Reminder` automation. Confirms successful query handling across matching records and execution of outbound email notifications for tracking records pending beyond a 24-hour threshold.

[View Image — Pending Review Reminder](FLOW_3.png)
