const User = require('../model/userSchema'); // Import your User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate auth token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed', details: err.message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("Invalid email or password.");
        }

        // Check if the password matches
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid email or password.");
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // 1 hour
        });

        // Send the token
        return res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    Register,
    Login
};
