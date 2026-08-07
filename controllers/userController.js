const { User } = require('../models');

const getProfile = async(req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(error) {
        next(error);
    }
}

const updateProfile = async(req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { name, email } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id !== user.id) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        user.name = name;
        user.email = email;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(error) {
        next(error);
    }
}

const deleteProfile = async(req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const {password} = req.body;

        if(!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        await user.destroy();

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    }
    catch(error) {
        next(error);
    }
}

module.exports = { getProfile, updateProfile, deleteProfile };