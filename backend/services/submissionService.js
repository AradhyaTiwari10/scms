const Submission = require("../models/Submission");

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

module.exports = { submitAssignmentService };
