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
        if (!email || !password) {
            return cb({
                action: "user_login",
                status: 400,
                success: false,
                message: err.message
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return cb({
                action: "user_login",
                status: 400,
                success: false,
                message: "Email and password are required."
            });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return cb({
                action: "user_login",
                status: 400,
                success: false,
                message: "password doesn't match"
            });        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return cb(
            null,
            ({
                action: 'user_login',
                status: 200,
                success: true,
                message: "success",
                data: {
                    token: token
                }
            })
        )
    } catch (err) {
        console.error(err);
        return cb({
            action: "user_login",
            status: 400,
            success: false,
            message: err.message
        });

    }
};


module.exports = {
    Register,
    Login
};
