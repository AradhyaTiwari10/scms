const express = require("express");
const router = express.Router();

const { markAttendance, getStudentAttendance, getCourseAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/mark", authMiddleware, roleMiddleware("faculty"), markAttendance);
router.get("/student", authMiddleware, roleMiddleware("student"), getStudentAttendance);
router.get("/course/:courseId", authMiddleware, roleMiddleware("faculty"), getCourseAttendance);

module.exports = router;
