const user = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Register = async (data, cb) => {
    try {
        const { name, email, password } = data.body;

        if (!name || !email || !password) {
            return cb({
                action: "user_registration",
                status: 400,
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return cb(null, {
                action: "user_registration",
                status: 400,
                success: false,
                message: "User already exists",
            });
        }

        const newUser = new user({ name, email, password });
        await newUser.save();
        return cb(null, {
            action: "user_registration",
            status: 200,
            success: true,
            message: "User registered successfully",
        });
    } catch (e) {
        console.error('Error in registration:', e);
        return cb({
            action: "user_registration",
            status: 500,
            success: false,
            message: "Internal server error",
        });
    }
};

const Login = async (data, cb) => {
    try {
        const { email, password } = data.body;

        if (!email || !password) {
            return cb({
                action: "user_login",
                status: 400,
                success: false,
                message: "All fields are required",
            });
        }

        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            return cb(null, {
                action: "user_login",
                status: 400,
                success: false,
                message: "User not found",
            });
        }

        const passwordMatch = await foundUser.comparePassword(password);
        if (!passwordMatch) {
            return cb(null, {
                action: "user_login",
                status: 400,
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return cb(null, {
            action: "user_login",
            status: 200,
            success: true,
            message: "Login successful",
            data: {
                token,
            },
        });
    } catch (e) {
        console.error('Error in login:', e);
        return cb({
            action: "user_login",
            status: 500,
            success: false,
            message: "Internal server error",
        });
    }
};
const Logout = async (data, cb) => {
    try {
        const { email } = data.body;

        if (!email) {
            return cb({
                action: "user_logout",
                status: 400,
                success: false,
                message: "Email is required.",
            });
        }

        // Find and update user, clearing the token
        const user = await user.findOneAndUpdate(
            { email },
            { $unset: { token: "" } },
            { new: true }
        );

        if (!user) {
            return cb({
                action: "user_logout",
                status: 400,
                success: false,
                message: "User not found.",
            });
        }

        return cb(null, {
            action: "user_logout",
            status: 200,
            success: true,
            message: "Logout successful.",
        });
    } catch (err) {
        console.error(err);
        return cb({
            action: "user_logout",
            status: 500,
            success: false,
            message: "Internal server error.",
        });
    }
};



module.exports = {
    Register,
    Login,
    Logout
};
