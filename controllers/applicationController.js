const { Application } = require("../models");

const createApplication = async (req, res, next) => {
    try{
        const {company, jobTitle, jobUrl, status, notes, appliedAt} = req.body;
        const userId = req.user.id;

        const application = await Application.create({
            userId,
            company,
            jobTitle,
            jobUrl,
            status,
            notes,
            appliedAt
        });

        return res.status(201).json({
            success: true,
            message: "Application created successfully",
            data: {
                id: application.id,
                company: application.company,
                jobTitle: application.jobTitle,
                jobUrl: application.jobUrl,
                status: application.status,
                notes: application.notes,
                appliedAt: application.appliedAt
            }
        });
    }
    catch(error){
        next(error);
    }
};

const getApplications = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const applications = await Application.findAll({
            where: { userId },
            attributes: ["id", "company", "jobTitle", "jobUrl", "status", "notes", "createdAt", "appliedAt"],
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            data: applications
        });
    } catch (error) {
        next(error);
    }
};

const updateApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { company, jobTitle, jobUrl, status, notes, appliedAt } = req.body;
        const userId = req.user.id;

        const application = await Application.findOne({
            where: { id, userId }
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        application.company = company ?? application.company;
        application.jobTitle = jobTitle ?? application.jobTitle;
        application.jobUrl = jobUrl ?? application.jobUrl;
        application.status = status ?? application.status;
        application.notes = notes ?? application.notes;
        application.appliedAt = appliedAt ?? application.appliedAt;

        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application updated successfully",
            data: {
                id: application.id,
                company: application.company,
                jobTitle: application.jobTitle,
                jobUrl: application.jobUrl,
                status: application.status,
                notes: application.notes,
                appliedAt: application.appliedAt
            }
        });
    } catch (error) {
        next(error);
    }
};

const deleteApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const application = await Application.findOne({
            where: { id, userId }
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        await application.destroy();

        return res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
}