const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: false },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    password: { type: String, required: false }, // For local accounts
});

module.exports = mongoose.model('User', userSchema);
