# Assignment Submission System Summary

1. Summary of submission system
Created the `Submission` model and implemented the `POST /api/submissions` API to allow students to submit an assignment they have been given by storing their text response.

2. Model fields explanation
- `student`: ObjectId referencing the `User` model, indicates the student making the submission.
- `assignment`: ObjectId referencing the `Assignment` model, indicates which assignment the submission belongs to.
- `submissionText`: String, required. The actual text response submitted by the student.
- `submittedAt`: Date, defaults to `Date.now()`. Timestamp for the submission.

3. API endpoint
- `POST /api/submissions`: Allows a student to submit their response.
- Expected JSON Body: `{ "assignmentId": "...", "submissionText": "..." }`

4. Access control rules
- Requires a valid authentication token.
- Specifically restricted to users with the "student" role via RBAC.

5. Duplicate prevention logic
- The `submitAssignmentService` first queries for any existing `Submission` where both `assignment` equals `assignmentId` and `student` equals `studentId`. If a document is found, it throws an `"Already submitted"` error.

6. Current system status
- Auth + JWT working ✅
- RBAC implemented ✅
- Course system working ✅
- Enrollment system working ✅
- Attendance system working (Mark and View) ✅
- Assignment System setup (Model + Create API) working ✅
- Assignment Submission System working ✅

7. Next step readiness
- Ready for viewing submissions / grading implementation.

8. Contribution: Person 2 (Submission system)
