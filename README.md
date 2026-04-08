# Smart Campus Management System (SCMS)

A comprehensive, scalable, role-based academic management platform designed to manage smart campus facilities, services, courses, and cross-party operations between Admins, Faculty, and Students.

## 🛠 Tech Stack
- **Frontend**: Next.js (Planned)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT Authentication
- **Architecture**: REST APIs

---

## ✨ Features
- **Authentication**: Secure Signup, Login, and JWT Token exchanges.
- **Role-Based Access Control (RBAC)**: Strict permission boundaries ensuring specific privileges for `Admin`, `Faculty`, and `Student`.
- **Course Management**: Admins and Faculty can create and maintain active curriculums.
- **Enrollment System**: Students can effortlessly browse and enroll directly into courses.
- **Attendance System**: Faculty track, mark, and view active student attendance across classes.
- **Assignment Management**: Faculty create homework tasks mapped to specific dates and courses.
- **Assignment Submission System**: Students upload code, answers, or text to fulfill the required assignment conditions safely.
- **Grading System**: Faculty evaluation logic empowered by algorithmic scaling via the **Strategy Pattern**.
- **Notification System**: Seamless broadcast routing for updates (assignments, grading) hooking deeply via the **Observer Pattern**.

---

## 🏛 Design Patterns

The SCMS Backend leverages sophisticated behavioral design patterns ensuring code stability, scalability, and modularity:

* **Strategy Pattern** -> Reusable algorithms abstracted for dynamically evaluating grading logic (`simpleGrading` vs `passFailGrading`), scaling independent rulesets without touching controller code.
* **Observer Pattern** -> Decentralized notification system allowing decoupled tracking. Faculty actions trigger the `Subject` broadcaster which inherently pings any subscribed instances without breaking native routes.

---

## 🗺 Project Structure
```text
backend/
  ├── config/
  ├── controllers/
  ├── services/
  ├── routes/
  ├── models/
  ├── middlewares/
  ├── utils/
  │     ├── observer/
  │     ├── gradingStrategies/
  ├── server.js
```

---

## 🧪 API End-to-End Testing Flow

Walking through the backend architecture guarantees consistent logical progression via Postman/cURL:
1. Signup users (Admin, Faculty, Student).
2. Login and retrieve JWT `Bearer <token>`s.
3. Create course (Admin).
4. Enroll student (Student).
5. Mark attendance (Faculty).
6. View attendance arrays securely.
7. Create assignment (Faculty).
8. Submit assignment (Student).
9. View submissions (Faculty).
10. Grade submission (Faculty).
11. Observe notification logs passively triggering in the system terminal.

---

## 🔗 API Examples

### Signup (`POST /api/auth/signup`)
**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@university.edu",
  "password": "Password123",
  "role": "student"
}
```
**Response:**
```json
{
  "success": true,
  "data": { "message": "User registered successfully" }
}
```

### Login (`POST /api/auth/login`)
**Request:**
```json
{
  "email": "jane@university.edu",
  "password": "Password123"
}
```
**Response:**
```json
{
  "success": true,
  "data": { "token": "ey..." }
}
```

### Create Course (`POST /api/courses`)
**Request:** *(Requires `admin` role)*
```json
{
  "title": "Machine Learning 101",
  "description": "Intro to AI",
  "faculty": "603d...4b"
}
```
**Response:**
```json
{
  "success": true,
  "data": { "title": "Machine Learning 101", "_id": "603d..." }
}
```

### Submit Assignment (`POST /api/submissions`)
**Request:** *(Requires `student` role)*
```json
{
  "assignmentId": "651f...",
  "submissionText": "My GitHub repo link is..."
}
```
**Response:**
```json
{
  "success": true,
  "data": { "message": "Submission successful" }
}
```

---

## 🚀 Project Status

**Backend:**
- Authentication ✅
- RBAC ✅
- Course System ✅
- Enrollment ✅
- Attendance ✅
- Assignment System ✅
- Submission System ✅
- Grading (Strategy Pattern) ✅
- Notifications (Observer Pattern) ✅
- Global Error Handling/API Polish ✅

**Frontend:**
- Not started ⏳

---

## 🔮 Future Scope
- **Frontend Integration**: Hooking interfaces natively using generative Google Stitch AI layouts.
- **Real-time WebSockets**: Integrating `Socket.io` to bounce Observer Pattern logs straight into UI components.
- **File Uploads**: Extending assignment requirements with AWS S3/Multer pipelines.
- **Analytics Portals**: Comprehensive Administrator Dashboards monitoring all data flows simultaneously.