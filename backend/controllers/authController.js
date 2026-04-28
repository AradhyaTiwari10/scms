const { signupService, loginService } = require("../services/authService");

const signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getFaculty = async (req, res, next) => {
  try {
    const User = require("../models/User");
    const faculty = await User.find({ role: "faculty" }).select("-password");
    console.log(`Found ${faculty.length} faculty members`);
    res.json({ success: true, data: faculty });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getFaculty };
