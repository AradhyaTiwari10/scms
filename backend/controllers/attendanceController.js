const { markAttendanceService } = require("../services/attendanceService");

const markAttendance = async (req, res) => {
  try {
    const attendance = await markAttendanceService(req.body);
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { markAttendance };
