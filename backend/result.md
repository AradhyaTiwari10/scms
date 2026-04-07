# Course Model Implementation

## 1. Summary of Course Model

Person 2 implemented the `Course` model for the SCMS backend. This marks the deployment of the first business domain entity beyond authentication. The Course model establishes the fundamental data structure enabling the school to offer classes, associate faculty with subjects, and later enroll students.

---

## 2. Fields Explanation

The `Course` schema strictly enforces the core attributes of a class:

- **`title`**: `(String, Required)` The official name of the course (e.g., "Advanced Mathematics"). This is a mandatory field.
- **`description`**: `(String)` An optional detailed syllabus or outline of the course coverage.
- **`faculty`**: `(ObjectId)` A reference pointer mapping a single instructor to the course.
- **`students`**: `([ObjectId])` An array of reference pointers representing the roster of participating students.
- **`createdAt` / `updatedAt`**: Automatically managed and appended by Mongoose timestamps configuration.

---

## 3. Relationships (User ↔ Course)

The Course representation introduces **relational data mapping** using Mongoose `ref`. Instead of hardcoding user details directly in the course document, Mongoose uses the `ObjectId` pointing to the `User` schema.

- **1-to-1 / 1-to-N Mapping (Faculty)**: The `faculty` field specifically expects a single `ObjectId` tying a specific `User` (who should have the role `faculty`) to the lead instructor position.
- **N-to-N Mapping (Students)**: The `students` field is an array of `User` `ObjectId`s. A Course can contain multiple users, and later, a User could be enrolled in multiple Courses.

---

## 4. Files Created

| File | Change |
|------|--------|
| `models/Course.js` | **[NEW]** Defined the Mongoose schema mapping course fields and relational structures. |

---

## 5. Current System Status

| Feature | Status |
|---------|--------|
| Express server | ✅ Running |
| MongoDB connection | ✅ Connected |
| User model (with roles) | ✅ Implemented |
| Authentication System (SignUp, Login, JWT) | ✅ Complete |
| Role-based access control (RBAC) | ✅ Complete |
| **Course model (Schema and Relationships)** | ✅ **Implemented (Person 2)** |
| Course Management APIs (CRUD) | ⏳ Next step |
| Enrollment System | ⏳ Pending |

---

## 6. Next Step Readiness — Course APIs

With the `Course` model schema now defined natively in Mongoose and our RBAC mechanisms fully functional, the foundation is set to build programmatic API features.

The succeeding developer can:
1. Construct the `CourseController` and `CourseService` for basic CRUD logic.
2. Formulate `POST /api/courses` protected by `roleMiddleware("admin")` to allow course creation.
3. Formulate `GET /api/courses` utilizing standard `authMiddleware`.
4. Delay direct enrollment logics pending standard structural APIs.

---

## 7. Contribution

**Person 2** — Course Model Creation
- Bootstrapped `models/Course.js`.
- Configured native Mongoose schemas and options (timestamps).
- Linked schemas together enabling MongoDB joins (`populate`) via reference pointers to `User`.
- Deferred business API logic to keep PR focused on data definitions securely.
- Documented model logic inside this Result representation snippet.
