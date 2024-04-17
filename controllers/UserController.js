const User = require('../models/User');

class UserController {
    async getUserById(req, res) {
        try {
            // TODO: or _id or username, privacy
            const user = await User.aggregate([
                { $match: { _id: req.params.id } },
                {
                  $project: {
                    password: 0,
                    username: 1,
                    birthdate: 1,
                  },
                },
              ]);

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        try {
            const user = req.user;
            const updates = req.body;

            // в валидаторе исключаем прямое взаимодействие с бд
            Object.assign(user, updates);
            await user.save();
            
        } catch (err) {
            
        }
    }
}

module.exports = new UserController();