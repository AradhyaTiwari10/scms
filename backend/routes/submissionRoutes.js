const express = require("express");
const router = express.Router();

const { submitAssignment, getSubmissions, gradeSubmission, getUserSubmissions } = require("../controllers/submissionController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("student"), submitAssignment);
router.get("/my", authMiddleware, roleMiddleware("student"), getUserSubmissions);
router.get("/:assignmentId", authMiddleware, roleMiddleware("faculty", "admin"), getSubmissions);
router.post("/grade", authMiddleware, roleMiddleware("faculty", "admin"), gradeSubmission);

module.exports = router;
