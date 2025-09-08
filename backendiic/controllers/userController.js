const User = require("../models/User");

exports.updateSkills = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills: req.body.skills },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.saveInternship = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.savedInternships.includes(req.body.internshipId)) {
      user.savedInternships.push(req.body.internshipId);
    }
    await user.save();
    res.json(user.savedInternships);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
