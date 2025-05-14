const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authcontroller');
const verify = require('../middleware/authmiddleware');
const User = require('../models/User'); 

router.post('/register', register);
router.post('/login', login);
router.get('/protected' , verify, (req,res) =>
{
    res.json({message: `Welcome, your user id is ${req.user.id}`});
});
router.get('/profile', verify, async (req,res) =>
{
    try
    {
        const user= await User.findById(req.user.id).select('-password');
        if(!user)
        {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(err)
    {
        console.error('Error fetching the profile:', err.message);
        res.status(500).json({message: 'Server Error'});
    }
});

module.exports = router;