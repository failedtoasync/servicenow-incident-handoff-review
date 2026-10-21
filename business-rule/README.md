# Create Incident Handoff Review

## Purpose
Creates and maintains Incident Handoff Review (IHR) records to track repeated Incident assignment-group handoffs and reopen activity.

## Configuration

| Property | Value |
|---|---|
| Table | Incident |
| When | After |
| Advanced | Enabled |
| Update | Enabled |
| Conditions | Assignment group changes OR Reopen count changes |

## How It Works
- Processes Incidents in New, On Hold, or In Progress states.
- Retrieves the most recently created IHR for the Incident before deciding whether to create a record or update an existing one.
- Creates the first IHR when the reassignment count reaches 3.
- Updates recorded handoff and reopen counts when the latest IHR is Pending or Under Review, and only when a count has increased.
- Creates a new review cycle when the latest IHR is inactive and at least 3 additional reassignments have occurred since its recorded handoff count.

## Error Handling & Logging
Checks the result of IHR insert and update operations. If an operation fails, the script writes an error message to the ServiceNow system log, including the related Incident number.

## Script
[View `create-incident-handoff-review.js`](create-incident-handoff-review.js)
