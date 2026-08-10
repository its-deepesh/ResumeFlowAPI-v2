const express = require("express");
const router = express.Router();

const {
    generateBulletPoints,
    generateSummary,
    generateRewrite,
    generatePrompt
} = require("../controllers/aiController");

const authenticateUser = require("../middleware/authenticateUser");

router.post("/bullets", authenticateUser, generateBulletPoints);
router.post("/summary", authenticateUser, generateSummary);
router.post("/rewrite", authenticateUser, generateRewrite);
router.post("/prompt", authenticateUser, generatePrompt);


module.exports = router;