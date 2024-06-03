import Joi from 'joi';

const UserSchema = Joi.object({
    _id: Joi.string().guid({ version: 'uuidv4' }).required(),
    username: Joi.string().required().messages({
        'any.required': 'Please enter your user name'
    }),
    userphone: Joi.string().required().messages({
        'any.required': 'Please enter your user phone'
    }),
    useremail: Joi.string().email().required().messages({
        'any.required': 'Please enter your user email',
        'string.email': 'Please enter a valid email address'
    }),
    role: Joi.string().valid('user', 'admin').default('user'),
    userpassword: Joi.string().required().messages({
        'any.required': 'Please enter your password'
    })
});

export const Validator = (data) => {
    const { error, value } = UserSchema.validate(data, { abortEarly: false });
    if (error) {
        return { success: false, errors: error.details };
    }
    return { success: true, value };
};