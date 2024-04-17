const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    to: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    message: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);