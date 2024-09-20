const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
// exports.registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }
//         user = new User({ name, email, password });
//         await user.save();

//         // Create JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({ token, userId: user._id, name: user.name });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

exports.registerUser = async (req, res) => {
    console.log('Register user:', req.body);
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password });
        await user.save();
        console.log('User saved successfully');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, userId: user._id, name: user.name });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).send('Server error');
    }
};




// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: user._id, name: user.name });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
