const { markAttendanceService, getStudentAttendanceService, getCourseAttendanceService } = require("../services/attendanceService");

const markAttendance = async (req, res) => {
  try {
    const attendance = await markAttendanceService(req.body);
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await getStudentAttendanceService(req.user.userId);
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourseAttendance = async (req, res) => {
  try {
    const attendance = await getCourseAttendanceService(req.params.courseId);
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { markAttendance, getStudentAttendance, getCourseAttendance };
