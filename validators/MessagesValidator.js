const Joi = require('joi');

const validateMessage = (req, res, next) => {
    const messsageSchema = Joi.object({
        to: Joi.string().alphanum().min(2).max(25).required(),
        message: Joi.string().min(1).max(280).required()
    });

    const { error } = messsageSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateGetMessage = (req, res, next) => {
    const messsageSchema = Joi.object({
        to: Joi.string().alphanum().min(2).max(25).required(),
        limit: Joi.number().min(1).max(10).required(),
        skip: Joi.number().min(0).max(10).required(),
    });

    const { error } = messsageSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {validateMessage, validateGetMessage};