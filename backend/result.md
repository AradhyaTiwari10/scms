# Attendance System Summary

1. Summary of attendance system
Created the `Attendance` model and implemented the `POST /api/attendance/mark` API to allow faculty to track student presence in a course on a given date.

2. Model fields explanation
- `student`: ObjectId referencing the `User` model, denotes the student being marked.
- `course`: ObjectId referencing the `Course` model, denotes the course where attendance is taken.
- `date`: System datetime (defaults to `Date.now()`), represents the day the attendance was taken.
- `status`: String enum `["present", "absent"]` to specify the student's presence.

3. API endpoint
- `POST /api/attendance/mark`: Marks the attendance for a student taking a specific course.
- Expected JSON Body: `{ "studentId": "...", "courseId": "...", "status": "present" }`

4. Access control rules
- Requires a valid authentication token.
- Specifically restricted to users with the "faculty" role via RBAC.

5. Current system status
- Auth + JWT working ✅
- RBAC implemented ✅
- Course system working ✅
- Enrollment system working ✅
- Attendance system working ✅

6. Next step readiness
- Ready to implement viewing attendance.

7. Contribution: Person 3 (Attendance system)
