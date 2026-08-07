const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const { createResume, getAllResumes, getResumeById, updateResume, deleteResume } = require("../controllers/resumeController.js");

const router = express.Router();

router.post("/create", authenticateUser, createResume);
router.get("/", authenticateUser, getAllResumes);
router.get("/:id", authenticateUser, getResumeById);
router.put("/:id", authenticateUser, updateResume);
router.delete("/:id", authenticateUser, deleteResume);

module.exports = router;