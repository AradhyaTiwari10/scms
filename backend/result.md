# View Submissions & Grading System

1. Summary of grading system
Added the capability for faculty to view assignment submissions and grade them. The grading logic integrates the **Strategy Pattern** to support multiple grading heuristics ("simple" or "passfail").

2. APIs implemented
- `GET /api/submissions/:assignmentId`: Viewing submissions by an assignment ID. Replaces IDs with student names and emails. Restricted to `faculty`.
- `POST /api/submissions/grade`: Receiving a JSON body containing `submissionId`, `marks` and grading `type`. Calculates the grade via Strategy and updates the document. Restricted to `faculty`.

3. Strategy Pattern explanation
Instead of hardcoding various grading modes inside the `gradeSubmissionService`, a flexible `gradingContext` determines which function (`simpleGrading` vs `passFailGrading`) is appropriate based on the client provided `type` parameter at runtime. `simpleGrading` just passes back numerical marks while `passFail` outputs a localized string metric based on a score condition.

4. Files created/modified
- modified: `backend/models/Submission.js`
- modified: `backend/services/submissionService.js`
- modified: `backend/controllers/submissionController.js`
- modified: `backend/routes/submissionRoutes.js`
- new folder: `backend/utils/gradingStrategies`
- new: `simpleGrading.js`
- new: `passFailGrading.js`
- new: `gradingContext.js`

5. Current system status
- Auth + JWT working ✅
- RBAC implemented ✅
- Course system working ✅
- Enrollment system working ✅
- Attendance system working ✅
- Assignment System setup ✅
- Assignment Submission System working ✅
- Grading System working (via Strategy Pattern) ✅

6. Next step readiness
- Ready for notifications system utilizing the Observer pattern.

7. Contribution: Person 3 (Grading system + Strategy Pattern)
