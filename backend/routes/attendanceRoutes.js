const express = require("express");
const router = express.Router();

const { markAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/mark", authMiddleware, roleMiddleware("faculty"), markAttendance);

module.exports = router;
