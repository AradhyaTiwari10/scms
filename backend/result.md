# Login API + JWT Implementation

## 1. Summary of Login API

Person 4 implemented a secure login API for the SCMS backend. Users can now authenticate using their registered email and password. On successful authentication, the server returns a signed **JSON Web Token (JWT)** that the client stores and uses for future authenticated requests.

---

## 2. Files Modified

| File | Change |
|------|--------|
| `services/authService.js` | Added `loginService` — verifies credentials with bcrypt and generates JWT |
| `controllers/authController.js` | Added `login` controller — calls `loginService`, sends token in response |
| `routes/authRoutes.js` | Registered `POST /api/auth/login` route |
| `.env` | Added `JWT_SECRET` environment variable |

---

## 3. How Authentication Works

```
Client                    Server
  |                          |
  |-- POST /api/auth/login -->|
  |   { email, password }     |
  |                          |-- Find user by email in MongoDB
  |                          |-- bcrypt.compare(password, user.password)
  |                          |-- jwt.sign({ userId, role }, JWT_SECRET)
  |<-- { message, token } ---|
```

1. Client sends **email + password** in the request body.
2. Server looks up the user in MongoDB by email.
3. Server compares the provided password against the stored **bcrypt hash**.
4. If both checks pass, server creates and signs a **JWT**.
5. Token is returned in the JSON response.

---

## 4. JWT Explanation

**JSON Web Tokens (JWT)** are a compact, URL-safe means of transferring claims between two parties.

### Token Structure
```
Header.Payload.Signature
```

### Payload (what's inside this token)
```json
{
  "userId": "<MongoDB ObjectId>",
  "role":   "student | teacher | admin",
  "iat":    1712345678,
  "exp":    1712432078
}
```

- `iat` — issued at (Unix timestamp)
- `exp` — expires at (issued + 1 day)
- Token is signed with `JWT_SECRET` from `.env` — tampering invalidates the signature.

---

## 5. API Details

### Endpoint

```
POST /api/auth/login
```

### Request Body
```json
{
  "email":    "user@example.com",
  "password": "yourpassword"
}
```

### Success Response — `200 OK`
```json
{
  "message": "Login successful",
  "token":   "<JWT string>"
}
```

### Error Responses

| Scenario | Status | Body |
|----------|--------|------|
| User not found | `401` | `{ "message": "User not found" }` |
| Wrong password | `401` | `{ "message": "Invalid credentials" }` |

---

## 6. Current Project Status

| Feature | Status |
|---------|--------|
| Express server | ✅ Running |
| MongoDB connection | ✅ Connected |
| User model | ✅ Implemented |
| Signup API (`POST /api/auth/signup`) | ✅ Working |
| Password hashing (bcrypt) | ✅ Implemented |
| Login API (`POST /api/auth/login`) | ✅ **Implemented (Person 4)** |
| JWT token generation | ✅ **Implemented (Person 4)** |
| Auth middleware (protected routes) | ⏳ Next step |

---

## 7. Next Step Readiness — Middleware / Protected Routes

The login API returns a JWT. The next team member can use this token to:

1. Create an `authMiddleware.js` in `/middlewares/` that:
   - Reads the `Authorization: Bearer <token>` header
   - Verifies the token with `jwt.verify(token, process.env.JWT_SECRET)`
   - Attaches `req.user = decoded` for downstream controllers
2. Apply the middleware to any protected route:
   ```js
   router.get("/profile", authMiddleware, getProfile);
   ```

All groundwork (secret in `.env`, token payload with `userId` + `role`) is already in place.

---

## 8. Contribution

**Person 4** — Login API + JWT Implementation
- Implemented `loginService` with bcrypt password verification
- Generated signed JWT token on successful login
- Wired up controller and route (`POST /api/auth/login`)
- Added `JWT_SECRET` to `.env`
- Authored this result document
