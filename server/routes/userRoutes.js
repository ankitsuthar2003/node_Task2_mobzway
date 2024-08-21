const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);


router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching user' });
    }
});



module.exports = router;
