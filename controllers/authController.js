const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const user = await User.create({ name, email, password });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
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

const logout = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        next(error);
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Reset password token generated successfully",
            resetToken,
            expiresAt: user.resetPasswordExpires
        });
    }
    catch (error) {
        next(error);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { resetToken, password } = req.body;
        const user = await User.findOne({ where: { resetPasswordToken: resetToken } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid reset token"
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Reset token expired"
            });
        }

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = { register, login, logout, forgotPassword, resetPassword };