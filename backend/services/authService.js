const bcrypt = require("bcrypt");
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

module.exports = { signupService };
