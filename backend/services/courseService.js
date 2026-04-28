const Course = require("../models/Course");

const createCourseService = async (data) => {
  const course = new Course(data);
  await course.save();
  return course;
};

const getCoursesService = async () => {
  return await Course.find()
    .populate("faculty", "name email")
    .populate("students", "name email");
};

const enrollCourseService = async (courseId, userId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  // Prevent duplicate enrollment
  if (course.students.includes(userId)) {
    throw new Error("Already enrolled");
  }

  course.students.push(userId);
  await course.save();

  return { message: "Enrolled successfully" };
};

module.exports = { createCourseService, getCoursesService, enrollCourseService };
