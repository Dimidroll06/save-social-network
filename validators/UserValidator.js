const Joi = require('joi');

const validateUser = (req, res, next) => {
    const userSchema = Joi.object({
        username: Joi.string().alphanum().min(2).max(25).required(),
        password: Joi.string().min(6).required()
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateUpdateUser = (req, res, next) => {
    const updateSchema = Joi.object({
        password: Joi.string().min(6),
        birthdate: Joi.date()
    });
    
    const { error } = updateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validateUser, validateUpdateUser };