const Attendance = require("../models/Attendance");

const markAttendanceService = async (data) => {
  const { studentId, courseId, status } = data;
  
  if (!studentId || !courseId || !status) {
    throw new Error("Missing required fields: studentId, courseId, status");
  }

  const attendance = new Attendance({
    student: studentId,
    course: courseId,
    status
    // Date is automatically set by the Mongoose schema default
  });

  await attendance.save();
  return attendance;
};

module.exports = { markAttendanceService };
