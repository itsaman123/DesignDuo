const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseStruct = require("../helper/responseStructure")

// const Register = async (data, cb) => {
//     try {
//         const { name, email, password } = data.body;

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, password: hashedPassword });
//         await user.save();
//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

//         // res.status(201).json({ user, token });
//         return cb(
//             null,
//             responseStruct
//                 .merge({
//                     action: 'user_registration',
//                     status: 200,
//                     success: true,
//                     message: "success",
//                     data: {
//                         token: token
//                     }
//                 })
//         )
//     } catch (err) {
//         return cb(
//             responseStruct
//                 .merge({
//                     action: "user_registration",
//                     status: 400,
//                     success: false,
//                     message: err.message
//                 })
//                 .toJS(),
//         )
//     }
// };


const Register = async (data, cb) => {
    try {
        const { name, email, password } = data.body;
        
        const userExist=await User.findOne({email});
        // console.log(userExist)

        if(userExist){
            console.log("first")
            return cb(null, {
                action: "user_registration",
                status: 400,
                success: true,
                message: "User already Exist"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        await User.updateOne({email:email}, {$set:{token:token}});

        return cb(null, {
            action: "user_registration",
            status: 200,
            success: true,
            message: "User registered successfully",
            data: { token },
        });
    } catch (err) {
        return cb({
            action: "user_registration",
            status: 400,
            success: false,
            message: err.message,
        });
    }
};


const Login = async (data, cb) => {
    try {
        const { email, password } = data.body;

        // Validate input
        if (!email || !password) {
            return cb({
                action: "user_login",
                status: 400,
                success: false,
                message: "Email and password are required.",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            return cb({
                action: "user_login",
                status: 400,
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Verify password
        const passwordMatch = await user.comparePassword(password);
        console.log(passwordMatch)
        if (!passwordMatch) {
            return cb({
                action: "user_login",
                status: 400,
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Generate a new token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Optionally store the token in the database
        await User.updateOne({ email }, { $set: { token } });

        return cb(null, {
            action: "user_login",
            status: 200,
            success: true,
            message: "Login successful",
            data: { token },
        });
    } catch (err) {
        console.error(err);
        return cb({
            action: "user_login",
            status: 500,
            success: false,
            message: "Internal server error.",
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
        const user = await User.findOneAndUpdate(
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
