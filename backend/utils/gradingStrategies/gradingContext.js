const simpleGrading = require("./simpleGrading");
const passFailGrading = require("./passFailGrading");

const gradingContext = (type, marks) => {
  if (type === "passfail") {
    return passFailGrading(marks);
  }
  return simpleGrading(marks);
};

module.exports = gradingContext;
