// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// // const userSchema = new mongoose.Schema({
// //     email: {
// //         type: String,
// //         required: true,
// //         unique: true,
// //     },
// //     password: {
// //         type: String,
// //         required: true,
// //     },
// //     bio: {
// //         type: String,
// //     },
// //     profilePic: {
// //         type: String,
// //     },
// //     dob: {
// //         type: String
// //     },
// //     role: {
// //         type: String,
// //         default: "1" // 1 for user, 2 for admin
// //     },
// //     user_id: {
// //         type: String,
// //     },
// //     token: {
// //         type: String,
// //     }
// // }, {
// //     timestamps: true
// // });

// // userSchema.pre('save', async function (next) {
// //     if (!this.isModified('password')) return next();
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// //     next();
// // });

// // // Compare input password with hashed password
// // userSchema.methods.comparePassword = async function (candidatePassword) {
// //     return bcrypt.compare(candidatePassword, this.password);
// // };

// // const User = mongoose.model('User', userSchema);
// module.exports = User;



// // User Schema
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     bio: {
//         type: String,
//     },
//     profilePic: {
//         type: String,
//     },
//     dob: {
//         type: String
//     },
//     role: {
//         type: String,
//         default: "1"
//     },
//     user_id: {
//         type: String,
//     },
//     token: {
//         type: String,
//     }
// }, {
//     timestamps: true
// });

// // Password hashing middleware
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// const User = mongoose.model('User', userSchema);



const mongoose =require('mongoose');
const bcrypt =require('bcrypt');

 

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    address: String,
    phone: String,
    username: String,
    admin: String,
    is_deleted: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const user = mongoose.model('users', userSchema);
module.exports = user;