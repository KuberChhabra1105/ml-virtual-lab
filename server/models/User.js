const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    progress: [{
        experimentId: String,
        status: String,
        score: Number
    }]
});

module.exports = mongoose.model('User', UserSchema);
