const testService = require("../services/testService");

const getTest = (req, res) => {
  const result = testService();
  res.send(result);
};

module.exports = { getTest };
