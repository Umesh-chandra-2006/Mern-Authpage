const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checker = await User.findOne({ email });
        if (checker) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashpassword = await bcrypt.hash(password, 8);

        const newUser = new User({ email, password: hashpassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({
            message: 'User registered successfully',
            token,
        });

    }
    catch (err) {
        console.error('Register error', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const ismatch = await bcrypt.compare(password, user.password);
        if (!user) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({
            message: 'Logged in successfully',
            token,
        });

    }
    catch (err) {
        console.error('Login error', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};