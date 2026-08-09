const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const { createResume, getAllResumes, getResumeById, updateResume, deleteResume, importResume, duplicateResume } = require("../controllers/resumeController.js");

const router = express.Router();

router.post("/create", authenticateUser, createResume);
router.get("/", authenticateUser, getAllResumes);
router.get("/:id", authenticateUser, getResumeById);
router.put("/:id", authenticateUser, updateResume);
router.delete("/:id", authenticateUser, deleteResume);
router.post("/import", authenticateUser, importResume);
router.post("/:id/duplicate", authenticateUser, duplicateResume);

module.exports = router;