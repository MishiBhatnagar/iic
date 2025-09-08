const Internship = require("../models/Internship");
const skillMappings = require("../utils/skillMappings");

// Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    console.error("Error fetching internships:", err);
    res.status(500).json({ msg: "Server error while fetching internships" });
  }
};

// Recommend internships based on provided skills (body.skills should be array)
exports.recommendInternships = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ msg: "Skills must be a non-empty array" });
    }

    const internships = await Internship.find();

    const scored = internships.map((internship) => {
      // support both old field "skills" and new "skillsRequired"
      const required = Array.isArray(internship.skillsRequired) && internship.skillsRequired.length
        ? internship.skillsRequired
        : (Array.isArray(internship.skills) ? internship.skills : []);

      let score = 0;
      const matched = new Set();

      skills.forEach((s) => {
        const skillLower = s.toString().trim().toLowerCase();

        // Direct match (case-insensitive)
        required.forEach(reqSkill => {
          if (reqSkill.toString().trim().toLowerCase() === skillLower) {
            score += 1;
            matched.add(reqSkill);
          }
        });

        // Related matches from mappings (mapping keys assumed to be lower-case)
        const related = skillMappings[skillLower] || skillMappings[s] || [];
        related.forEach((rel) => {
          required.forEach(reqSkill => {
            if (reqSkill.toString().trim().toLowerCase() === rel.toString().trim().toLowerCase()) {
              score += 0.5;
              matched.add(reqSkill);
            }
          });
        });
      });

      const totalSkills = required.length || 1; // avoid divide by zero

      return {
        ...internship._doc,
        score: Math.round((score / totalSkills) * 100),
        matchedSkills: Array.from(matched),
        requiredSkills: required
      };
    });

    scored.sort((a, b) => b.score - a.score);
    res.json(scored);
  } catch (err) {
    console.error("Error recommending internships:", err);
    res.status(500).json({ msg: "Server error while recommending internships" });
  }
};
