const mongoose = require("mongoose");
const User = require("../models/User");

// ✅ Update user skills
exports.updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ msg: "Skills must be an array" });
    }

    // Remove duplicates & trim
    const uniqueSkills = [...new Set(skills.map(skill => skill.trim()))];

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills: uniqueSkills },
      { new: true }
    ).select("-password"); // don’t send password back

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "Skills updated successfully", skills: user.skills });
  } catch (err) {
    console.error("Error updating skills:", err);
    res.status(500).json({ msg: "Server error while updating skills" });
  }
};

// ✅ Save internship to user profile
exports.saveInternship = async (req, res) => {
  try {
    const { internshipId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(internshipId)) {
      return res.status(400).json({ msg: "Invalid internship ID" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.savedInternships.includes(internshipId)) {
      user.savedInternships.push(internshipId);
      await user.save();
    }

    res.json({ msg: "Internship saved successfully", savedInternships: user.savedInternships });
  } catch (err) {
    console.error("Error saving internship:", err);
    res.status(500).json({ msg: "Server error while saving internship" });
  }
};

// ✅ Unsave internship (remove from savedInternships)
exports.unsaveInternship = async (req, res) => {
  try {
    const internshipId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(internshipId)) {
      return res.status(400).json({ msg: "Invalid internship ID" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const idx = user.savedInternships.findIndex(id => id.toString() === internshipId);
    if (idx > -1) {
      user.savedInternships.splice(idx, 1);
      await user.save();
    }

    res.json({ msg: "Internship removed", savedInternships: user.savedInternships });
  } catch (err) {
    console.error("Error removing saved internship:", err);
    res.status(500).json({ msg: "Server error while removing saved internship" });
  }
};
