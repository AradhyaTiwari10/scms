# View Attendance System Summary

1. Summary of view attendance APIs
Added GET `/api/attendance/student` for students to view their attendance, and GET `/api/attendance/course/:courseId` for faculty to view attendance of all students in a particular course. Mongoose `.populate()` was utilized to return readable references (course titles, student names and emails) instead of raw IDs.

2. Files modified
- `backend/routes/attendanceRoutes.js`
- `backend/controllers/attendanceController.js`
- `backend/services/attendanceService.js`

3. API endpoints
- `GET /api/attendance/student`: Returns an array of attendance records tied to the currently authenticated student.
- `GET /api/attendance/course/:courseId`: Returns an array of all attendance records for a given course.

4. Access control rules
- Both routes enforce `authMiddleware` initially.
- The `/student` route requires `student` role.
- The `/course/:courseId` route requires `faculty` role.

5. Query explanation
- `getStudentAttendance`: Finds Attendance documents where `student` equals the `req.user.userId`. Populates the `course` field fetching just the `title`.
- `getCourseAttendance`: Finds Attendance documents where `course` equals the `req.params.courseId`. Populates the `student` field fetching `name` and `email`.

6. Current system status
- Auth + JWT working ✅
- RBAC implemented ✅
- Course system working ✅
- Enrollment system working ✅
- Attendance system working (Mark and View) ✅

7. Next step readiness
- Ready to implement Assignment System.

8. Contribution: Person 2 (View attendance)
