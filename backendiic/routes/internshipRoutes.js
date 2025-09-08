const express = require("express");
const {
  getAllInternships,
  recommendInternships,
} = require("../controllers/internshipController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Public - fetch all internships
router.get("/", getAllInternships);

// ✅ Private - get recommendations based on user skills
router.post("/recommend", authMiddleware, recommendInternships);

module.exports = router;
