const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB = process.env.MONGO_URI;

const conn = mongoose.connect(DB)
    .then(() => {
        console.log("Mongodb Connected")
    })
    .catch((error) => {
        console.error(error);
    })