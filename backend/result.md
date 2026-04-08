# Assignment System (Part 1) Summary

1. Summary of assignment system (part 1)
Created the `Assignment` model to represent course homework/tasks and implemented the `POST /api/assignments` API to allow faculty to create new assignments linked to a generic course.

2. Model fields explanation
- `title`: String, required. The name of the assignment.
- `description`: String. Additional details about the task.
- `course`: ObjectId referencing the `Course` model, required. Links the assignment to a specific course.
- `dueDate`: Date, required. The deadline for the assignment.

3. API endpoint
- `POST /api/assignments`: Creates an assignment.
- Expected JSON Body: `{ "title": "...", "description": "...", "courseId": "...", "dueDate": "..." }`

4. Access control rules
- Requires a valid authentication token.
- Specifically restricted to users with the "faculty" role via RBAC.

5. Current system status
- Auth + JWT working ✅
- RBAC implemented ✅
- Course system working ✅
- Enrollment system working ✅
- Attendance system working (Mark and View) ✅
- Assignment System setup (Model + Create API) working ✅

6. Next step readiness
- Ready for Assignment submission implementation (e.g. students submitting assignments).

7. Contribution: Person 3 (Assignment model + create API)
