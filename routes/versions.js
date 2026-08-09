const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const {
    createVersion,
    getAllVersions,
    restoreVersion
} = require("../controllers/versionController");

const router = express.Router();

router.post("/:resumeId/versions", authenticateUser, createVersion);
router.get("/:resumeId/versions", authenticateUser, getAllVersions);
router.post("/:resumeId/versions/:versionId/restore", authenticateUser, restoreVersion);

module.exports = router;