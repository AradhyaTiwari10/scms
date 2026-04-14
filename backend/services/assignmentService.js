const Assignment = require("../models/Assignment");
const subject = require("../utils/observer");

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
  
  subject.notify("New assignment created");
            
  return assignment;
};

module.exports = { createAssignmentService };
