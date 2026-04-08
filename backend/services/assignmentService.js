const Assignment = require("../models/Assignment");

const createAssignmentService = async (data) => {
  const { title, description, courseId, dueDate } = data;
  
  if (!title || !courseId || !dueDate) {
    throw new Error("Missing required fields: title, courseId, dueDate");
  }

  const assignment = new Assignment({
    title,
    description,
    course: courseId,
    dueDate
  });

  await assignment.save();
  return assignment;
};

module.exports = { createAssignmentService };
