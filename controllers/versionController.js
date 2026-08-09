const { Version, Resume } = require("../models");

const createVersion = async (req, res, next) => {
    try {
        const { resumeId } = req.params;
        const { snapshot } = req.body;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: { userId, id: resumeId }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const latestVersion = await Version.findOne({
            where: { resumeId },
            order: [["versionNumber", "DESC"]]
        })

        const versionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;

        const version = await Version.create({
            versionNumber,
            resumeId,
            snapshot
        });

        return res.status(201).json({
            success: true,
            message: "Version created successfully",
            data: {
                id: version.id,
                resumeId: version.resumeId,
                versionNumber: version.versionNumber,
                snapshot: version.snapshot
            }
        });
    }
    catch (error) {
        next(error);
    }
}

const getAllVersions = async (req, res, next) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({
            where: { userId, id: resumeId }
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const versions = await Version.findAll({
            where: { resumeId },
            attributes: ["id", "resumeId", "versionNumber", "snapshot", "createdAt"],
            order: [["versionNumber", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            message: "Versions fetched successfully",
            data: versions  
        });
    }
    catch (error) {
        next(error);
    }
}

const restoreVersion = async (req, res, next) => {
    try {
        const { resumeId, versionId } = req.params;
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

        const version = await Version.findOne({
            where: {
                id: versionId,
                resumeId
            }
        });

        if (!version) {
            return res.status(404).json({
                success: false,
                message: "Version not found"
            });
        }

        resume.title = version.snapshot.title;
        resume.template = version.snapshot.template;

        await resume.save();

        return res.status(200).json({
            success: true,
            message: "Version restored successfully",
            data: {
                resumeId: resume.id,
                versionId: version.id,
                title: resume.title,
                template: resume.template
            }
        });
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
    createVersion,
    getAllVersions,
    restoreVersion
};