const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },

    role: { 
      type: String, 
      enum: ["candidate", "admin", "mentor"], // 🔒 restrict roles
      default: "candidate" 
    },

    // Skills - always lowercase to keep consistency
    skills: {
      type: [String],
      default: [],
      set: (skills) => skills.map((s) => s.trim().toLowerCase()),
    },

    // Saved internships
    savedInternships: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Internship" }
    ],

    // Optional wishlist (if you reuse for kulfi app)
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ],
  },
  { timestamps: true } // createdAt & updatedAt automatically
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare plain password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
