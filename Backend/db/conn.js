const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB = process.env.MONGO_URI;
console.log(DB)

const conn = mongoose.connect('mongodb://localhost:27017/blogsite')
    .then(() => {
        console.log("Mongodb Connected")
    })
    .catch((error) => {
        console.error(error);
    })