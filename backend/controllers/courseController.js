const { createCourseService, getCoursesService, enrollCourseService } = require("../services/courseService");

const createCourse = async (req, res) => {
  const course = await createCourseService(req.body);
  res.json(course);
};

const getCourses = async (req, res) => {
  const courses = await getCoursesService();
  res.json(courses);
};

const enrollCourse = async (req, res) => {
  try {
    const result = await enrollCourseService(req.params.courseId, req.user.userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCourse, getCourses, enrollCourse };
