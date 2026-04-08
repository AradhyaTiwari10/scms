const { createAssignmentService } = require("../services/assignmentService");

const createAssignment = async (req, res) => {
  try {
    const assignment = await createAssignmentService(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAssignment };
