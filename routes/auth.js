const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const { register, login, logout } = require("../controllers/authController.js");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);

module.exports = router;