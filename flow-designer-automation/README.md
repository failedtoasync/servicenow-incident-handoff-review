# Flow Designer Automation

## Overview

Flow Designer automates key activities throughout the Incident Handoff Review (IHR) lifecycle. Three flows were implemented to manage review assignment and notification, automatically cancel reviews when the related Incident reaches a terminal state, and send reminders for reviews that remain pending beyond one day.


## 1. IHR - Review Assignment & Notification\

### Purpose

Automates the initial handling of a newly created Incident Handoff Review (IHR) by assigning a review owner, updating the related Incident, and notifying the reviewer that a review is required.\

### Trigger

The flow is triggered when a new record is created in the \*\*Incident Handoff Review\*\* table.

### Flow Steps

1. **Assign Review Owner** — assigns a review owner to the newly created IHR.
2. **Update Related Incident** — updates the associated Incident as part of the initial review handling.
3. **Notify Reviewer** — notifies the assigned reviewer that a review is required.

[View Flow Image](screenshots/review-assignment-notification.png)


## 2. IHR - Cancel on Incident Terminal State

### Purpose

Automatically cancels applicable IHR records when their related Incident reaches a terminal state before the review is completed.

### Trigger

The flow is triggered when an **Incident is updated**.

It checks whether the Incident state is Resolved (`6`), Closed (`7`), or Canceled (`8`).

### Flow Steps

1. **Look Up Incident Handoff Review Records** — retrieves IHR records associated with the triggering Incident by comparing the IHR's Incident reference directly with the trigger's Incident Record.
2. **Filter Eligible Reviews** — processes only IHR records whose Review Status is Pending or Under Review.
3. **For Each IHR** — iterates through the matching records so each eligible review can be handled.
4. **Update IHR** — sets Review Status to `Cancelled` and Review Notes to `Review cancelled automatically as the related Incident reached terminal state.`
5. **Send Email** — sends an email notification to the reviewer with the subject `Incident Handoff Review Cancelled.`

[View Flow Image](screenshots/cancel-on-terminal-state.png)


## 3. IHR - Pending Review Reminder

### Purpose

Sends a reminder when an Incident Handoff Review (IHR) remains Pending beyond the configured one-day period, helping ensure reviews receive timely attention.

### Trigger

The flow operates in the context of the Incident Handoff Review table and identifies reviews that remain Pending beyond one day.

### Flow Steps

1. **Identify Pending Reviews** — identifies IHR records that have remained in the Pending state beyond the configured one-day period.
2. **Send Reminder** — sends a reminder notification to the appropriate reviewer.

### Overall Workflow

**IHR Remains Pending Beyond One Day → Send Reminder to Reviewer**

[View Flow Image](screenshots/pending-review-reminder.png)
