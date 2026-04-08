const Submission = require("../models/Submission");
const gradingContext = require("../utils/gradingStrategies/gradingContext");
const subject = require("../utils/observer");

const submitAssignmentService = async (assignmentId, studentId, text) => {
  const existing = await Submission.findOne({
    assignment: assignmentId,
    student: studentId,
  });

  if (existing) {
    throw new Error("Already submitted");
  }

  const submission = new Submission({
    assignment: assignmentId,
    student: studentId,
    submissionText: text,
  });

  await submission.save();

  return { message: "Submission successful" };
};

const getSubmissionsService = async (assignmentId) => {
  return await Submission.find({ assignment: assignmentId }).populate("student", "name email");
};

const gradeSubmissionService = async (submissionId, marks, type) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    throw new Error("Submission not found");
  }

  const grade = gradingContext(type, marks);
  submission.grade = grade;
  await submission.save();

  subject.notify("Assignment graded");

  return { message: "Graded successfully", grade };
};

module.exports = { submitAssignmentService, getSubmissionsService, gradeSubmissionService };
