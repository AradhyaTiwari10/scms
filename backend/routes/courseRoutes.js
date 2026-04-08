const express = require("express");
const router = express.Router();

const { createCourse, getCourses } = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("admin"), createCourse);
router.get("/", authMiddleware, getCourses);

module.exports = router;
