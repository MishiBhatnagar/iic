const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  skills: [String],
  careerPath: String,
});

module.exports = mongoose.model("Internship", InternshipSchema);
