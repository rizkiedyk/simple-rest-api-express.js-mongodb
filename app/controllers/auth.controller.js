require('dotenv').config()
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // Check if user already exists
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User already exists. Please login!");
        }

        // Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        // Save user token
        user.token = token;

        // Return new user
        res.status(201).json(user);
        console.log("Registration successful!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

exports.login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Check if user exists in the database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );

            // Save user token
            user.token = token;

            // Return user
            res.status(200).json(user);
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};
