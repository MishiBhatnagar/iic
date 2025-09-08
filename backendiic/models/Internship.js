const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    // Skills required for this internship
    skillsRequired: {
      type: [String],
      default: [],
      set: (skills) =>
        skills.map((s) => s.trim().toLowerCase()) // normalize to lowercase
    },

    // Optional career path guidance
    careerPath: { type: String, default: "", trim: true },

    // Extra fields for usability
    location: { type: String, default: "Remote", trim: true },
    stipend: { type: String, default: "" }, // could later be number or range
    duration: { type: String, default: "" }, // e.g., "3 months"
    applyLink: { type: String, default: "" }, // external apply URL if available
  },
  { timestamps: true }
);

// add text index for searching across title, company, description
internshipSchema.index({ title: "text", company: "text", description: "text" });

module.exports = mongoose.model("Internship", internshipSchema);
