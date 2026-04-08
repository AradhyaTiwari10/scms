const express = require("express");
const router = express.Router();

const { submitAssignment, getSubmissions, gradeSubmission } = require("../controllers/submissionController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("student"), submitAssignment);
router.get("/:assignmentId", authMiddleware, roleMiddleware("faculty"), getSubmissions);
router.post("/grade", authMiddleware, roleMiddleware("faculty"), gradeSubmission);

module.exports = router;
