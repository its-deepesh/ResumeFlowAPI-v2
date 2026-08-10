const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const { createApplication, getApplications, updateApplication, deleteApplication } = require("../controllers/applicationController");

const router = express.Router();

router.post("/", authenticateUser, createApplication);
router.get("/", authenticateUser, getApplications);
router.patch("/:id", authenticateUser, updateApplication);
router.delete("/:id", authenticateUser, deleteApplication);

module.exports = router;