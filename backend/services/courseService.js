const Course = require("../models/Course");

const createCourseService = async (data) => {
  const course = new Course(data);
  await course.save();
  return course;
};

const getCoursesService = async () => {
  return await Course.find().populate("faculty", "name email");
};

module.exports = { createCourseService, getCoursesService };
