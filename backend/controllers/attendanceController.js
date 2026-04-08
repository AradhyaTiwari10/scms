const { markAttendanceService, getStudentAttendanceService, getCourseAttendanceService } = require("../services/attendanceService");

const markAttendance = async (req, res, next) => {
  try {
    const attendance = await markAttendanceService(req.body);
    res.json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

const getStudentAttendance = async (req, res, next) => {
  try {
    const attendance = await getStudentAttendanceService(req.user.userId);
    res.json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

const getCourseAttendance = async (req, res, next) => {
  try {
    const attendance = await getCourseAttendanceService(req.params.courseId);
    res.json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

module.exports = { markAttendance, getStudentAttendance, getCourseAttendance };
