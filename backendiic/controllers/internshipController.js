const Internship = require("../models/Internship");
const skillMappings = require("../utils/skillMappings");

// ✅ Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    console.error("Error fetching internships:", err);
    res.status(500).json({ msg: "Server error while fetching internships" });
  }
};

// ✅ Recommend internships based on user skills
exports.recommendInternships = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ msg: "Skills must be a non-empty array" });
    }

    const internships = await Internship.find();

    const scored = internships.map((internship) => {
      let score = 0;
      let matched = new Set();

      skills.forEach((s) => {
        // Direct match
        if (internship.skillsRequired.includes(s)) {
          score += 1;
          matched.add(s);
        }

        // Related skill match
        const related = skillMappings[s] || [];
        related.forEach((rel) => {
          if (internship.skillsRequired.includes(rel)) {
            score += 0.5;
            matched.add(rel);
          }
        });
      });

      const totalSkills = internship.skillsRequired.length || 1; // avoid divide by zero

      return {
        ...internship._doc,
        score: Math.round((score / totalSkills) * 100), // percentage match
        matchedSkills: [...matched], // convert Set → Array
      };
    });

    // Sort by best match first
    scored.sort((a, b) => b.score - a.score);

    res.json(scored);
  } catch (err) {
    console.error("Error recommending internships:", err);
    res.status(500).json({ msg: "Server error while recommending internships" });
  }
};
