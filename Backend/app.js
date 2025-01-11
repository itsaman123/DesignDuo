const express = require("express");
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

require('./db/conn');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to the home page");
});

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
