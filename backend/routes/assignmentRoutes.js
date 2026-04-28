const express = require("express");
const router = express.Router();

const { createAssignment, getAssignments } = require("../controllers/assignmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", authMiddleware, getAssignments);
router.post("/", authMiddleware, roleMiddleware("faculty"), createAssignment);

module.exports = router;
