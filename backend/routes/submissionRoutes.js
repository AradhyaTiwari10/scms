const express = require("express");
const router = express.Router();

const { submitAssignment } = require("../controllers/submissionController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("student"), submitAssignment);

module.exports = router;
