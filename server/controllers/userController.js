

const User = require('../models/user');
const { getIo } = require('../socket/socket');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

         // Emit socket event when user is created
         const io = getIo();
         io.to('live users').emit('userJoined', user);
         
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, errors: error.errors });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
};

