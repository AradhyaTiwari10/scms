# SCMS Backend — Cumulative Project Status

---

## 🔐 Password Hashing Update (Person 3)

### Summary
- Added `bcrypt` for secure password hashing
- Signup now stores encrypted passwords instead of plain text
- Salt rounds set to **10** for a balanced security/performance tradeoff

### Changes Made
| File | Type | Description |
|------|------|-------------|
| `services/authService.js` | Modified | Added bcrypt import and password hashing logic |
| `package.json` | Modified | Added `bcrypt` as a dependency |
| `package-lock.json` | Modified | Updated lock file after bcrypt installation |

### How It Works
1. User submits signup form with plain-text password
2. `signupService` intercepts the password before saving
3. `bcrypt.hash(password, 10)` generates a salted hash
4. The **hashed password** (not the original) is stored in MongoDB
5. Original plain-text password is never persisted

```js
// 🔥 HASH PASSWORD before saving
const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({ ...data, password: hashedPassword });
```

---

## 📋 Full Project Status

| Feature | Status | Done By |
|---------|--------|---------|
| Express server setup | ✅ Complete | Person 1 |
| MongoDB connection | ✅ Complete | Person 1 |
| User model | ✅ Complete | Person 1 |
| Modular architecture (routes → controllers → services) | ✅ Complete | Person 1 |
| Signup API (`POST /api/auth/signup`) | ✅ Complete | Person 2 |
| Password hashing (bcrypt) | ✅ Complete | Person 3 |
| Login API (`POST /api/auth/login`) | ⏳ Not yet | Person 4 |
| JWT Authentication | ⏳ Not yet | — |
| Protected routes / middleware | ⏳ Not yet | — |

---

## 🏗️ Architecture

```
Client
  └── POST /api/auth/signup
        └── authRoutes.js        → router.post("/signup", signup)
              └── authController.js → calls signupService(req.body)
                    └── authService.js
                          ├── Check if email exists (MongoDB query)
                          ├── bcrypt.hash(password, 10)  ← NEW ✅
                          ├── new User({ ...data, password: hashedPassword })
                          └── user.save() → MongoDB
```

---

## 📡 API Reference

### `POST /api/auth/signup`

**Request Body:**
```json
{
  "name": "Vivek",
  "email": "vivek@example.com",
  "password": "secret123",
  "role": "student"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "userId": "<mongo_object_id>"
}
```

**Error Response (400):**
```json
{
  "message": "User already exists"
}
```

---

## 🔜 Next Step — Login API (Person 4)

The Login API should:
1. Accept `email` + `password` in request body
2. Find user by email in MongoDB
3. Use `bcrypt.compare(plainPassword, hashedPassword)` to verify
4. On success → generate and return a JWT token
5. On failure → return `401 Unauthorized`

```js
// Hint for Person 4 — verifying hashed password
const isMatch = await bcrypt.compare(req.body.password, user.password);
```

---

## 👥 Contributions

| Person | Task |
|--------|------|
| Person 1 | Express server, MongoDB connection, User model, architecture scaffold |
| Person 2 | Signup API — `authRoutes.js`, `authController.js`, `authService.js`, `server.js` update |
| Person 3 | Password hashing — bcrypt integration in `authService.js` |
