const testService = require("../services/testService");

const getTest = (req, res, next) => {
  try {
    const result = testService();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTest };
