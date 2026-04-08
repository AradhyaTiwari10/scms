const express = require("express");
const router = express.Router();

const { createAssignment } = require("../controllers/assignmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("faculty"), createAssignment);

module.exports = router;
