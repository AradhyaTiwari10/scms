# Signup API Setup

## Summary
- Implemented user signup API for the SCMS backend
- Users can now register and be stored in MongoDB
- Follows the clean `Route → Controller → Service → Database` architecture

---

## Files Created

| File | Description |
|------|-------------|
| `routes/authRoutes.js` | Registers POST `/signup` endpoint |
| `controllers/authController.js` | Handles request/response, calls service |
| `services/authService.js` | Contains signup business logic, DB interaction |

### Modified
| File | Change |
|------|--------|
| `server.js` | Imported `authRoutes` and mounted at `/api/auth` |

---

## API Endpoint

```
POST /api/auth/signup
```

### Request Body
```json
{
  "name": "Vivek",
  "email": "vivek@example.com",
  "password": "secret123",
  "role": "student"
}
```

### Success Response (201)
```json
{
  "message": "User created successfully",
  "userId": "<mongo_object_id>"
}
```

### Error Response (400)
```json
{
  "message": "User already exists"
}
```

---

## Flow

```
Client
  └── POST /api/auth/signup
        └── authRoutes.js        → router.post("/signup", signup)
              └── authController.js → calls signupService(req.body)
                    └── authService.js    → checks DB, creates User, saves
                          └── MongoDB (User collection)
```

---

## Current Project Status

| Feature | Status |
|---------|--------|
| Express server | ✅ Running |
| MongoDB connection | ✅ Connected |
| User model | ✅ Ready |
| Signup API | ✅ Implemented (Person 2) |
| Password hashing | ⏳ Not yet |
| Login API | ⏳ Not yet |
| JWT Auth | ⏳ Not yet |

---

## Next Steps

1. **Password Hashing** — Add `bcrypt` to hash passwords before storing in DB
2. **Login API** — Implement `POST /api/auth/login` with credential verification
3. **JWT Generation** — Return a token on successful login for protected routes

---

## Contributions

| Person | Task |
|--------|------|
| Person 1 | Express server setup, MongoDB connection, User model, architecture scaffold |
| Person 2 | Signup API — `authRoutes.js`, `authController.js`, `authService.js`, `server.js` update |
