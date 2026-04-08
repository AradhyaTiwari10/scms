const { createCourseService, getCoursesService, enrollCourseService } = require("../services/courseService");

const createCourse = async (req, res, next) => {
  try {
    const course = await createCourseService(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await getCoursesService();
    res.json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

const enrollCourse = async (req, res, next) => {
  try {
    const result = await enrollCourseService(req.params.courseId, req.user.userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCourse, getCourses, enrollCourse };
