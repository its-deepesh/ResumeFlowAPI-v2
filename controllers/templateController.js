const { Template } = require('../models');

const getAllTemplates = async (req, res, next) => {
    try {
        const templates = await Template.findAll();
        return res.status(200).json({
            success: true,
            message: "Templates fetched successfully",
            data: templates
        });
    } catch (error) {
        next(error);
    }
};

const getTemplateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const template = await Template.findOne({ where: { id } });
        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Template fetched successfully",
            data: template
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTemplates,
    getTemplateById
}