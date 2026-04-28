const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
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
  
  // Notify all students in the course
  const course = await Course.findById(courseId);
  if (course && course.students.length > 0) {
    for (const studentId of course.students) {
      subject.notify({
        recipient: studentId,
        message: `New assignment posted: ${title}`,
        type: "assignment"
      });
    }
  }
            
  return assignment;
};

const getAssignmentsService = async () => {
  return await Assignment.find().populate("course", "title");
};

module.exports = { createAssignmentService, getAssignmentsService };
