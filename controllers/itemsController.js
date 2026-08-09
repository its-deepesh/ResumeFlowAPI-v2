const { Item, Section, Resume } = require("../models");

const createItem = async (req, res, next) => {
    try {
        const { sectionId, resumeId } = req.params;
        const { content, position } = req.body;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: {
                id: resumeId,
                userId
            }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const section = await Section.findOne({
            where: {
                id: sectionId,
                resumeId
            }
        });

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        const item = await Item.create({
            sectionId,
            content,
            position
        });

        return res.status(201).json({
            success: true,
            message: "Item created successfully",
            data: {
                id: item.id,
                sectionId: item.sectionId,
                content: item.content,
                position: item.position
            }
        });
    }
    catch (error) {
        next(error);
    }
}

const updateItem = async (req, res, next) => {
    try {
        const { sectionId, resumeId, itemId } = req.params;
        const { content, position } = req.body;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: {
                id: resumeId,
                userId
            }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const section = await Section.findOne({
            where: {
                id: sectionId,
                resumeId
            }
        });

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        const item = await Item.findOne({
            where: {
                id: itemId,
                sectionId
            }
        });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        item.content = content ?? item.content;
        item.position = position ?? item.position;

        await item.save();

        return res.status(200).json({
            success: true,
            message: "Item updated successfully",
            data: {
                id: item.id,
                sectionId: item.sectionId,
                content: item.content,
                position: item.position
            }
        });
    }
    catch (error) {
        next(error);
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const { sectionId, resumeId, itemId } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: {
                id: resumeId,
                userId
            }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const section = await Section.findOne({
            where: {
                id: sectionId,
                resumeId
            }
        });

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        const item = await Item.findOne({
            where: {
                id: itemId,
                sectionId
            }
        });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        await item.destroy();

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = { createItem, updateItem, deleteItem };