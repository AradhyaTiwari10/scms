const express = require("express");
const router = express.Router();
const { signup, login, getFaculty } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.get("/faculty", authMiddleware, getFaculty);

module.exports = router;
