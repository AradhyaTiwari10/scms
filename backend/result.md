# Observer Pattern (Notification System) Summary

1. Summary of observer pattern system
Implemented a decoupled notification mechanism utilizing the Observer Pattern to push event alerts to listeners when core actions happen in the application logic.

2. Files created
- `backend/utils/observer/subject.js`
- `backend/utils/observer/notificationObserver.js`
- `backend/utils/observer/index.js`

3. Where notifications are triggered
- Inside `backend/services/assignmentService.js`: After successfully saving a new assignment, it triggers `subject.notify("New assignment created")`.
- Inside `backend/services/submissionService.js`: After successfully grading a student's submission, it triggers `subject.notify("Assignment graded")`.

4. Observer pattern explanation
The Observer Pattern is a software design pattern where an object, known as the **Subject**, maintains a list of its dependents, called **Observers** (`NotificationObserver`), and notifies them automatically of any state changes (usually by calling one of their methods, such as `update()`). This decouples the event producers (services) from the event consumers (notification loggers), keeping the code flexible and scalable.

5. Current system status
- Auth + JWT working ✅
- RBAC implemented ✅
- Course system working ✅
- Enrollment system working ✅
- Attendance system working ✅
- Assignment System setup ✅
- Assignment Submission System working ✅
- Grading System working (via Strategy Pattern) ✅
- Notification System working (via Observer Pattern) ✅

6. Final backend readiness
The SCMS Node.js backend is now completely mapped out with the specified routes, validations, access controls, business logic services, and specialized behavioral design patterns, and is completely ready for the frontend layer consumption.

7. Contribution: Person 1 (Observer Pattern)
