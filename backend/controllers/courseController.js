const { createCourseService, getCoursesService } = require("../services/courseService");

const createCourse = async (req, res) => {
  const course = await createCourseService(req.body);
  res.json(course);
};

const getCourses = async (req, res) => {
  const courses = await getCoursesService();
  res.json(courses);
};

module.exports = { createCourse, getCourses };
