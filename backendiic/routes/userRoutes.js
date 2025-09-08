const express = require("express");
const {
  updateSkills,
  saveInternship,
  unsaveInternship,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Update skills
router.put("/skills", authMiddleware, updateSkills);

// ✅ Save internship
router.post("/internships/save", authMiddleware, saveInternship);

// ✅ Unsave internship
router.delete("/internships/:id", authMiddleware, unsaveInternship);

module.exports = router;
