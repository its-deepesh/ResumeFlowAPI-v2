const express = require("express");
const { getProfile, updateProfile, deleteProfile } = require("../controllers/userController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.get("/profile", authenticateUser, getProfile);
router.put("/profile", authenticateUser, updateProfile);
router.delete("/profile", authenticateUser, deleteProfile);

module.exports = router;