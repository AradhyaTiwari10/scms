const { submitAssignmentService, getSubmissionsService, gradeSubmissionService } = require("../services/submissionService");

const submitAssignment = async (req, res, next) => {
  try {
    const { assignmentId, submissionText } = req.body;
    const result = await submitAssignmentService(assignmentId, req.user.userId, submissionText);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await getSubmissionsService(req.params.assignmentId);
    res.json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const { submissionId, marks, type } = req.body;
    const result = await gradeSubmissionService(submissionId, marks, type);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getUserSubmissions = async (req, res, next) => {
  try {
    const { getUserSubmissionsService } = require("../services/submissionService");
    const submissions = await getUserSubmissionsService(req.user.userId);
    res.json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitAssignment, getSubmissions, gradeSubmission, getUserSubmissions };
