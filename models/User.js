const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersch = new mongoose.Schema(
    {
        email:
        {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },
        password:
        {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', usersch);