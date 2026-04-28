const { createAssignmentService, getAssignmentsService } = require("../services/assignmentService");

const getAssignments = async (req, res, next) => {
  try {
    const assignments = await getAssignmentsService();
    res.json({ success: true, data: assignments });
  } catch (error) {
    next(error);
  }
};


const createAssignment = async (req, res, next) => {
  try {
    const assignment = await createAssignmentService(req.body);
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAssignment, getAssignments };
