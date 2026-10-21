# UI Actions

## 1. Start Review

### Purpose
Allows a reviewer to start an IHR review by moving its status from Pending to Under Review.

### Configuration

| Property | Value |
|---|---|
| Table | Incident Handoff Review |
| Action name | `start_review` |
| Form button | Enabled |
| Client | Disabled |
| Show insert | Enabled |
| Show update | Enabled |
| Condition | `current.review_status == 'pending'` |

### How It Works
Sets the review status to `under_review`, records the review start timestamp in `review_started_on`, updates the record, and redirects to the current record.

**Script:** [start-review.js](start-review.js)


## 2. Complete Review

### Purpose
Allows a reviewer to complete an IHR review after providing review notes.

### Configuration

| Property | Value |
|---|---|
| Table | Incident Handoff Review |
| Action name | `complete_review` |
| Order | 200 |
| Form button | Enabled |
| Client | Enabled |
| Show insert | Disabled |
| Show update | Enabled |
| Onclick | runClientCode() |
| Condition | `current.review_status == 'under_review'` |

### How It Works
Validates Review Notes in the browser and blocks submission if the field is empty or contains only whitespace. If validation passes, server-side processing sets the review status to `complete`, updates the record, and redirects to it.

**Script:** [complete-review.js](complete-review.js)
