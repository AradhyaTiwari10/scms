const User = require("../models/User");

const signupService = async (data) => {
  const { name, email, password, role } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create and save new user
  const user = new User({ name, email, password, role });
  await user.save();

  return { message: "User created successfully", userId: user._id };
};

module.exports = { signupService };
