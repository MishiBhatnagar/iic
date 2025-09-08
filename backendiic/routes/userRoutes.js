const express = require("express");
const { updateSkills, saveInternship } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/skills", auth, updateSkills);
router.post("/save", auth, saveInternship);

module.exports = router;
