const { fernetSecret } = require('../lib/config');
const { Fernet } = require('fernet-nodejs');
const User = require('../models/User');
const Message = require('../models/Message');

// const encrypted = Fernet.encrypt(message, fernetSecret); // шифруем сообщение
// Fernet.decrypt(token.message, fernetSecret) // Расшифровываем

class MessangerController {
    
    // создание чата
    async createChat(req, res) {

    }
}

module.exports = new MessangerController();