const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signupService = async (data) => {
  const { name, email, password, role } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 🔥 HASH PASSWORD before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save new user with hashed password
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  return { message: "User created successfully", userId: user._id };
};

const loginService = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // Compare provided password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 🔥 GENERATE JWT TOKEN
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { message: "Login successful", token };
};

module.exports = { signupService, loginService };
