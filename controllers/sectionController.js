const { Section, Resume } = require("../models");

const createSection = async (req, res, next) => {
    try {
        const { resumeId } = req.params;
        const { name, position } = req.body;

        const resume = await Resume.findOne({
            where: {
                id: resumeId,
                userId: req.user.id
            }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const section = await Section.create({ resumeId, name, position });
        return res.status(201).json({
            success: true,
            message: "Section created successfully",
            data: {
                id: section.id,
                resumeId: section.resumeId,
                name: section.name,
                position: section.position
            }
        });
    }
    catch (error) {
        next(error);
    }
}

const getAllSections = async (req, res, next) => {
    try {
        const { resumeId } = req.params;
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

        const sections = await Section.findAll({
            where: { resumeId },
            attributes: ["id", "name", "position", "createdAt", "updatedAt"],
            order: [["position", "ASC"]]
        });

        return res.status(200).json({
            success: true,
            message: "Sections fetched successfully",
            data: sections
        });
    }
    catch (error) {
        next(error);
    }
}

const updateSection = async (req, res, next) => {
    try {
        const { resumeId, sectionId } = req.params;
        const { name, position } = req.body;
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

        section.name = name ?? section.name;
        section.position = position ?? section.position;

        await section.save();

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: {
                id: section.id,
                resumeId: section.resumeId,
                name: section.name,
                position: section.position
            }
        });
    }
    catch (error) {
        next(error);
    }
}

const deleteSection = async (req, res, next) => {
    try {
        const { resumeId, sectionId } = req.params;
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

        await section.destroy();

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = { createSection, getAllSections, updateSection, deleteSection };