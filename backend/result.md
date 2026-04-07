# JWT Middleware + Protected Route

## 1. Summary of Middleware

Person 2 implemented an authentication middleware to secure the SCMS backend. The middleware intercepts incoming requests, verifies the presence and validity of a strictly formatted JSON Web Token (JWT), and prevents unauthorized users from accessing protected resources by returning a `401 Unauthorized` error if validation fails.

---

## 2. Files Created & Modified

| File | Change |
|------|--------|
| `middlewares/authMiddleware.js` | **[NEW]** Added middleware logic to extract and verify JWT tokens |
| `routes/authRoutes.js` | **[MODIFIED]** Imported `authMiddleware` and created protected `GET /api/auth/profile` route |

---

## 3. How JWT Verification Works

```text
Client                    Server (authMiddleware)              Protected Route
  |                                  |                               |
  |-- GET /profile + JWT Header ---->|                               |
  |   Authorization: Bearer <token>  |                               |
  |                                  |-- Validate Header exists      |
  |                                  |-- Extract Token               |
  |                                  |-- jwt.verify(token, Secret)   |
  |                                  |-- Validate success            |
  |                                  |-- req.user = decoded -------->|
  |<-- 200 OK: { message, user } ----|-------------------------------|
  |                                  |                               |
  |<-- 401 Unauthorized (if fail) ---|                               |
```

1. Client sends request to protected route including `Authorization: Bearer <token>` in headers.
2. `authMiddleware` checks for header existence.
3. Splits header to extract token.
4. Uses `jsonwebtoken` to verify token string using the `JWT_SECRET`.
5. Upon successful verification, attaches the decoded payload (like `userId` and `role`) to the `req.user` object to be accessible downstream.
6. Calls `next()` to proceed to route controller; returns `401 Unauthorized` directly if token is missing or invalid.

---

## 4. Protected Route Details

### Endpoint

```
GET /api/auth/profile
```

### Purpose
Acts as a demonstration of protected resource access requiring valid authentication token, returning the attached parsed user payload.

### Request Headers
```http
Authorization: Bearer <your_jwt_token_here>
```

### Success Response — `200 OK`
```json
{
  "message": "Protected route accessed",
  "user": {
    "userId": "<MongoDB ObjectId>",
    "role": "student",
    "iat": 1712345678,
    "exp": 1712432078
  }
}
```

### Error Responses
| Scenario | Status | Body |
|----------|--------|------|
| No token | `401` | `{ "message": "No token provided" }` |
| Invalid/Expired token | `401` | `{ "message": "Invalid token" }` |

---

## 5. Current System Status

| Feature | Status |
|---------|--------|
| Express server | ✅ Running |
| MongoDB connection | ✅ Connected |
| User model | ✅ Implemented |
| Signup API | ✅ Working |
| Password hashing (bcrypt) | ✅ Implemented |
| Login API + JWT generation | ✅ Implemented |
| Auth middleware (Protected Routes) | ✅ **Implemented (Person 2)** |
| Role-based access control (RBAC) | ⏳ Next step |

---

## 6. Next Step Readiness — Role-Based Access Control

The foundation for protected routes is now solidly in place.
With the `authMiddleware` verifying standard access and extracting JWT payloads into `req.user`, the system is ready for the **Role-Based Access Control (RBAC)** implementation.

The upcoming developer can:
1. Create a `roleMiddleware.js` which verifies if user has specific `req.user.role` (e.g. 'admin', 'teacher').
2. Apply it additionally alongside `authMiddleware` on routes.
3. Build new domain specific protected routes.

---

## 7. Contribution

**Person 2** — Auth middleware
- Implemented `authMiddleware.js`
- Validated `Authorization: Bearer` extraction logic
- Leveraged `jsonwebtoken` verify method and attached decoded info globally on `req.user`
- Tested and created `GET /api/auth/profile` route
- Designed this Result markdown record snippet
