const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },

    password: {
        type: String,
        required: true
    }
  
});

// Проверка пароля
userSchema.methods.comparePassword = async function (candidate) {
    try {
        return await bcrypt.compare(candidate, this.password);
    } catch (error) {
        console.error(error);
        return false
    }
};

module.exports = mongoose.model('User', userSchema);