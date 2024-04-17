const { fernetSecret } = require('../lib/config');
const { Fernet } = require('fernet-nodejs');
const User = require('../models/User');
const Message = require('../models/Message');

class MessageController {
    /* РЕАЛИЗАЦИЯ СИММЕТРИЧНОГО ШИФРОВАНИЯ */

    // Отправка сообщения
    async send (req, res) {
        // Получаем данные из тела запроса
        const { to, message } = req.body;

        // Получаем пользователя-отправителя и получателя
        const sender = req.user;
        const reciver = await User.findOne({ username: to });
        
        // Получателя не существует
        if (reciver === null) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        
        const encrypted = Fernet.encrypt(message, fernetSecret); // шифруем сообщение
        // Сохраняем сообщение в базу данных
        try {
            const msg = await Message.create({
                from: sender,
                to: reciver,
                message:  encrypted
            });
            await msg.save();
            
            return res.status(200).json({ message: 'Message succesfully sended' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        }
    }

    // Получение списка сообщений
    async get (req, res) {
        const { skip, limit, to } = req.body;
        try {
            // Получаем двух пользователей
            const sender = req.user;
            const reciver = await User.findOne({ username: to });

            // Ищем сообщения
            console.log(sender)
        
            const tokens = await Message.find({
                $or: [
                    // Отправленные сообщения
                    {
                        from: sender,
                        to: reciver
                    },
                    // Полученные сообщения
                    {
                        from: reciver,
                        to: sender
                    }
                ]
            }, null, {
                // Сортируем по дате (убывание)
                sort: { created: 'descending' },
                skip, 
                limit
            });
    
            let messages = [];
            tokens.forEach(token => {
                messages.push({
                    from: token.from,
                    to: token.to,
                    message:Fernet.decrypt(token.message, fernetSecret) // Расшифровываем
                }); 
            });
    
            res.status(200).json({
                messages  // Отправляем
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Something went wrong'
            })
        }
        
    }
}

module.exports = new MessageController();