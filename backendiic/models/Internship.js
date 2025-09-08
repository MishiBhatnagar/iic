const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    
    // Skills required for this internship
    skillsRequired: { type: [String], default: [] },

    // Optional career path guidance
    careerPath: { type: String, default: "" },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("Internship", internshipSchema);
