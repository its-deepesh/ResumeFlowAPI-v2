const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const { createItem, updateItem, deleteItem } = require("../controllers/itemsController");

const router = express.Router();

router.post("/:resumeId/sections/:sectionId/items", authenticateUser, createItem);
router.patch("/:resumeId/sections/:sectionId/items/:itemId", authenticateUser, updateItem);
router.delete("/:resumeId/sections/:sectionId/items/:itemId", authenticateUser, deleteItem);

module.exports = router;