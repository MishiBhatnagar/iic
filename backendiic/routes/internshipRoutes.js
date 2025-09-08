const express = require("express");
const { getAllInternships, recommendInternships } = require("../controllers/internshipController");
const router = express.Router();

router.get("/", getAllInternships);
router.post("/recommend", recommendInternships);

module.exports = router;
