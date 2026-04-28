const Submission = require("../models/Submission");
const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
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

  // Notify faculty
  try {
    const assignment = await Assignment.findById(assignmentId).populate("course");
    if (assignment && assignment.course && assignment.course.faculty) {
      subject.notify({
        recipient: assignment.course.faculty,
        message: `New submission for ${assignment.title}`,
        type: "submission"
      });
    }
  } catch (err) {
    console.error("Notification Error:", err);
  }

  return { message: "Submission successful" };
};

const getSubmissionsService = async (assignmentId) => {
  return await Submission.find({ assignment: assignmentId }).populate("student", "name email");
};

const gradeSubmissionService = async (submissionId, marks, type) => {
  const submission = await Submission.findById(submissionId).populate("student");
  if (!submission) {
    throw new Error("Submission not found");
  }

  const grade = gradingContext(type, marks);
  submission.grade = grade;
  await submission.save();

  // Notify student
  subject.notify({
    recipient: submission.student._id,
    message: `Your assignment has been graded: ${grade}`,
    type: "submission"
  });

  return { message: "Graded successfully", grade };
};

const getUserSubmissionsService = async (studentId) => {
  return await Submission.find({ student: studentId });
};

module.exports = { submitAssignmentService, getSubmissionsService, gradeSubmissionService, getUserSubmissionsService };
