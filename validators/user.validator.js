const Joi = require('joi');

const UserAddSchema = Joi.object({
    firstname: Joi.string()
        .max(255)
        .trim()
        .required(),
    lastname: Joi.string()
        .max(255)
        .required()
        .trim(),
    email: Joi.string()
        .max(255)
        .required()
        .unquie(),
    article: Joi.string()
        .ref('Blog')
})


const UpdateUserSchema = Joi.object({
    firstname: Joi.string()
        .max(255)
        .trim(),
    lastname: Joi.string()
        .max(255)
        .trim(),
        email: Joi.string()
        .max(255)
        .required()
        .unquie(),
    article: Joi.string()
        .ref('Blog')
})
async function AddUserValidationMW(req, res, next) {
    const userPayLoad = req.body

    try {
        await UserAddSchema.validateAsync(userPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function UpdateUserValidationMW(req, res, next) {
    const userPayLoad = req.body

    try {
        await UpdateUserSchema.validateAsync(userPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = {
    AddUserValidationMW,
    UpdateUserValidationMW
}