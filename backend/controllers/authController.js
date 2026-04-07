const { signupService, loginService } = require("../services/authService");

const signup = async (req, res) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, login };
