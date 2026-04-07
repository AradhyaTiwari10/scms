const express = require("express");
const router = express.Router();
const { getTest } = require("../controllers/testController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/test", getTest);

router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

router.get(
  "/faculty/dashboard",
  authMiddleware,
  roleMiddleware("faculty"),
  (req, res) => {
    res.json({ message: "Welcome Faculty" });
  }
);

module.exports = router;
