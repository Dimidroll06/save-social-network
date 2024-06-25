const mongoose = require('mongoose');

const ChatUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    role: {
        type: String,
        enum: ['creator', 'admin', 'user']
    }
});

const ChatSchema = new mongoose.Schema({
    users: [ChatUserSchema],

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: 'New chat!!'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', ChatSchema);