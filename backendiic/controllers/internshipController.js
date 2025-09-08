const Internship = require("../models/Internship");
const skillMappings = require("../utils/skillMappings");

exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.recommendInternships = async (req, res) => {
  try {
    const { skills } = req.body;
    const internships = await Internship.find();

    const scored = internships.map((internship) => {
      let score = 0;
      let matched = [];

      skills.forEach((s) => {
        if (internship.skills.includes(s)) {
          score += 1;
          matched.push(s);
        }
        const related = skillMappings[s] || [];
        related.forEach((rel) => {
          if (internship.skills.includes(rel)) {
            score += 0.5;
            matched.push(rel);
          }
        });
      });

      return {
        ...internship._doc,
        score: Math.round((score / internship.skills.length) * 100),
        matchedSkills: matched,
      };
    });

    scored.sort((a, b) => b.score - a.score);
    res.json(scored);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
