import Joi from "joi";

export const validateUserData = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    
    const { error } = schema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
}

export const validateLoginData = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    
    const { error } = schema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    next();
}