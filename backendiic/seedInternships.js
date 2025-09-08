// seedInternships.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Internship = require("./models/Internship");

dotenv.config();

const internships = [
  {
    title: "AI with Green Technology Virtual Internship",
    company: "Edunet Foundation & Shell",
    description:
      "Dive into the world of AI with Green Technology. Build prototypes tackling real-world challenges.",
    skillsRequired: ["artificial intelligence", "machine learning", "data analysis", "python", "green technology"],
    careerPath: "Data Analyst, AI/ML Engineer, Green Tech Consultant",
  },
  {
    title: "Web Development with AI/ML",
    company: "NIELIT Dibrugarh",
    description:
      "Develop skills in web development and Android programming with a focus on integrating AI/ML technologies.",
    skillsRequired: ["web development", "javascript", "backend development", "ai/ml"],
    careerPath: "Full-Stack Developer, AI Product Manager, Mobile App Developer",
  },
  {
    title: "Product Analytics Intern",
    company: "HDFC Bank",
    description:
      "Analyze user behavior data to inform product decisions for digital banking solutions.",
    skillsRequired: ["data analysis", "sql", "business intelligence", "financial modeling"],
    careerPath: "Product Analyst, Data Scientist, Business Analyst",
  },
];

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Internship.deleteMany(); // clear old
    await Internship.insertMany(internships);
    console.log("✅ Internships seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding internships:", err);
    process.exit(1);
  }
};

start();

