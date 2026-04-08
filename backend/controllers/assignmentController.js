const { createAssignmentService } = require("../services/assignmentService");

const createAssignment = async (req, res, next) => {
  try {
    const assignment = await createAssignmentService(req.body);
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAssignment };
