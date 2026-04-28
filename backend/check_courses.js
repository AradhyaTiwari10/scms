const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Course = require("./models/Course");
require("dotenv").config();

const check = async () => {
  await connectDB();
  const courses = await Course.find();
  console.log(JSON.stringify(courses, null, 2));
  process.exit(0);
};
check();
