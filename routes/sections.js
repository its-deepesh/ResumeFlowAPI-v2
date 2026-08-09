const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const { createSection, getAllSections, updateSection, deleteSection } = require("../controllers/sectionController");

const router = express.Router();

router.post("/:resumeId/sections", authenticateUser, createSection);
router.get("/:resumeId/sections", authenticateUser, getAllSections);
router.patch("/:resumeId/sections/:sectionId", authenticateUser, updateSection);
router.delete("/:resumeId/sections/:sectionId", authenticateUser, deleteSection);

module.exports = router;