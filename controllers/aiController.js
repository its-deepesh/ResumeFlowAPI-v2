const { generateBullets, generateSummaryText, generateRewriteText, generatePromptText } = require("../services/aiServices");

const generateBulletPoints = async (req, res, next) => {
    try {
        const { text, context } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required"
            });
        }

        const bullets = await generateBullets(text, context);

        return res.status(200).json({
            success: true,
            message: "Bullet points generated successfully",
            data: {
                bullets
            }
        });
    }
    catch (error) {
        next(error);
    }
};

const generateSummary = async (req, res, next) => {
    try {
        const { text, context } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required"
            });
        }

        const summary = await generateSummaryText(text, context);

        return res.status(200).json({
            success: true,
            message: "Summary generated successfully",
            data: {
                summary
            }
        });
    }
    catch (error) {
        next(error);
    }
};

const generateRewrite = async (req, res, next) => {
    try{
        const { text, tone } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required"
            });
        }

        const rewrite = await generateRewriteText(text, tone);

        return res.status(200).json({
            success: true,
            message: "Rewrite generated successfully",
            data: {
                rewrite
            }
        });
    }
    catch(error){
        next(error);
    }
}

const generatePrompt = async (req, res, next) => {
    try{
        const { prompt, role } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

        const generatedPrompt = await generatePromptText(prompt, role);

        return res.status(200).json({
            success: true,
            message: "Prompt generated successfully",
            data: {
                generatedPrompt
            }
        });
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    generateBulletPoints,
    generateSummary,
    generateRewrite,
    generatePrompt
};