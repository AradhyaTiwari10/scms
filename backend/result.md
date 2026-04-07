# Role-Based Access Control (RBAC)

## 1. Summary of RBAC Implementation

Person 3 implemented a Role-Based Access Control (RBAC) middleware for the SCMS backend. This layer determines whether an authenticated user (provided by the `authMiddleware`) has the proper authorization (`req.user.role`) to access a given endpoint. It serves as a declarative authorization system that makes protecting high-privilege routes robust and simple.

---

## 2. Files Created & Modified

| File | Change |
|------|--------|
| `middlewares/roleMiddleware.js` | **[NEW]** Added middleware logic to check `req.user.role` against a list of allowed roles |
| `routes/testRoutes.js` | **[MODIFIED]** Imported middlewares and created RBAC-protected test test routes for admin and faculty |

---

## 3. How Role Checking Works

```text
Client                       Server (roleMiddleware)             Protected Controller
  |                                     |                                   |
  |-- GET /admin/dashboard + Token ---->|                                   |
  |     authMiddleware resolves req.user|                                   |
  |                                     |-- Evaluate Role                   |
  |                                     |   allowedRoles = ["admin"]        |
  |                                     |   req.user.role = "student"       |
  |                                     |-- Validate inclusion              |
  |                                     |-- if false                        |
  |<-- 403 Forbidden -------------------|                                   |
  |                                     |                                   |
  |                                     |-- if true (user is admin)         |
  |                                     |-- next() ------------------------>|
  |<-- 200 OK: { message } -------------|-----------------------------------|
```

1. Route triggers `authMiddleware`, which verifies the JWT token and attaches `req.user` to the request object.
2. Next, `roleMiddleware` intercepts the request. It takes an array of acceptable roles via a Javascript rest parameter `...allowedRoles`.
3. It checks if `req.user.role` is present in the `allowedRoles` array.
4. If true, it calls `next()` to proceed to the route controller.
5. If false, it promptly returns a `403 Forbidden` response natively restricting access.

---

## 4. Routes Protected

To demonstrate RBAC, the following test routes have been established:

### Admin Dashboard (Only `admin`)
```http
GET /api/admin/dashboard
```
**Access Control:** `authMiddleware`, `roleMiddleware("admin")`
**Success Response:** `200 OK` → `{ "message": "Welcome Admin" }`

### Faculty Dashboard (Only `faculty`)
```http
GET /api/faculty/dashboard
```
**Access Control:** `authMiddleware`, `roleMiddleware("faculty")`
**Success Response:** `200 OK` → `{ "message": "Welcome Faculty" }`

---

## 5. Current System Status

| Feature | Status |
|---------|--------|
| Express server | ✅ Running |
| MongoDB connection | ✅ Connected |
| User model (with roles) | ✅ Implemented |
| Signup API | ✅ Working |
| Password hashing (bcrypt) | ✅ Implemented |
| Login API + JWT generation | ✅ Implemented |
| Auth middleware (Protected Routes) | ✅ Implemented |
| Role-based access control (RBAC) | ✅ **Implemented (Person 3)** |
| Course Module | ⏳ Next step |

---

## 6. Next Step Readiness — Course Module

With robust authentication and authorization layers now operating flawlessly, the core SCMS domain models and workflows can be developed safely.
The next developer can begin implementing the **Course Module**:

1. Use `roleMiddleware('admin')` to restrict creating new courses.
2. Use `roleMiddleware('admin', 'faculty')` to restrict editing course syllabus.
3. Allow all authenticated users (students) to `GET` course lists simply using `authMiddleware`.

---

## 7. Contribution

**Person 3** — Role-Based Access Control (RBAC)
- Developed `roleMiddleware.js` utilizing closure scoping for flexible role parameters.
- Attached and tested routing access restrictions based on the existing JWT role payload.
- Wrote admin and faculty scoped test dashboard endpoints.
- Maintained strict separation of Authentication (`authMiddleware`) versus Authorization (`roleMiddleware`).
- Designed this Result markdown record snippet.
