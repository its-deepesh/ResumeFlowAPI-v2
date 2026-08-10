const generateBullets = async (text, context) => {
    return [
        `Developed and worked on ${text.toLowerCase()}.`,
        `Applied ${context || "relevant technical skills"} to improve project functionality.`,
        `Contributed to the development and testing of backend features.`
    ];
};

const generateSummaryText = async (text, context) => {
    return `A professional summary for a ${text} with ${context} experience.`
};

const generateRewriteText = async (text, tone) => {
    return `Rewrite the following text in a ${tone} tone: ${text}`
};

const generatePromptText = async (prompt, role) => {
    return `Generate a prompt for a ${role} based on the following: ${prompt}`
};

module.exports = {
    generateBullets,
    generateSummaryText,
    generateRewriteText,
    generatePromptText
};