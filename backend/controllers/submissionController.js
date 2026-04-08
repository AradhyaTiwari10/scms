const { submitAssignmentService, getSubmissionsService, gradeSubmissionService } = require("../services/submissionService");

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, submissionText } = req.body;
    const result = await submitAssignmentService(assignmentId, req.user.userId, submissionText);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const submissions = await getSubmissionsService(req.params.assignmentId);
    res.json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    const { submissionId, marks, type } = req.body;
    const result = await gradeSubmissionService(submissionId, marks, type);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { submitAssignment, getSubmissions, gradeSubmission };
