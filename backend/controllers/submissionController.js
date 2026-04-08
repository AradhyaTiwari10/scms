const { submitAssignmentService } = require("../services/submissionService");

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, submissionText } = req.body;
    const result = await submitAssignmentService(assignmentId, req.user.userId, submissionText);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { submitAssignment };
