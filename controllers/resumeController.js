const { Resume } = require("../models");

const createResume = async (req, res, next) => {
    try {
        const { title, template } = req.body;
        const userId = req.user.id;

        const resume = await Resume.create({
            userId,
            title,
            template
        });

        return res.status(201).json({
            success: true,
            message: "Resume created successfully",
            data: {
                id: resume.id,
                title: resume.title,
                template: resume.template,
                userId: resume.userId
            }
        });
    }
    catch (error) {
        next(error);
    }
};

const getAllResumes = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const resumes = await Resume.findAll({
            where: { userId },
            attributes: ["id", "title", "template", "createdAt", "updatedAt"],
            order: [["updatedAt", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            message: "Resumes fetched successfully",
            data: resumes
        });
    }
    catch (error) {
        next(error);
    }
};

const getResumeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: { id, userId },
            attributes: ["id", "title", "template", "createdAt", "updatedAt"]
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume fetched successfully",
            data: resume
        });

    }
    catch (error) {
        next(error);
    }
};

const updateResume = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, template } = req.body;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: { id, userId }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        resume.title = title ?? resume.title;
        resume.template = template ?? resume.template;

        await resume.save();

        return res.status(200).json({
            success: true,
            message: "Resume updated successfully",
            data: {
                id: resume.id,
                title: resume.title,
                template: resume.template,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt
            }
        });
    }
    catch (error) {
        next(error);
    }
}

const deleteResume = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: { id, userId }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        await resume.destroy();

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

const importResume = async (req, res, next) => {
    try {
        const { source, data } = req.body;
        const userId = req.user.id;

        if (!["linkedin", "file"].includes(source)) {
            return res.status(400).json({
                success: false,
                message: "Invalid import source"
            });
        }

        const { title, template } = data;

        const resume = await Resume.create({
            userId,
            title,
            template
        });

        return res.status(201).json({
            success: true,
            message: "Resume imported successfully",
            data: {
                id: resume.id,
                title: resume.title,
                template: resume.template,
                userId: resume.userId
            }
        });
    }
    catch (error) {
        next(error);
    }
}

const duplicateResume = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: { id, userId }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const newResume = await Resume.create({
            userId,
            title: `${resume.title} - Copy`,
            template: resume.template
        });

        return res.status(201).json({
            success: true,
            message: "Resume duplicated successfully",
            data: {
                id: newResume.id,
                title: newResume.title,
                template: newResume.template,
                userId: newResume.userId
            }
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = { createResume, getAllResumes, getResumeById, updateResume, deleteResume, importResume, duplicateResume };