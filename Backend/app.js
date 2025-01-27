const express = require("express");
const morgan = require("morgan");
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db/conn');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Log API calls in the terminal
app.use(morgan('dev')); // 'dev' is a predefined format. You can use 'combined' or others.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the home page");
});

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
