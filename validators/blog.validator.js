const Joi = require('joi');

const BlogAddSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(10)
        .optional()
        .trim(),
   author: Joi.object()
        .ref('user')
        .required(),
    state: Joi.string()
        .default('draft'),
       /// .enum['draft', 'published'],
    reading_time: Joi.number()
       // .tag()
        .required(),
    tags: Joi.string()
        .min(10)
        .max(13)
        .required(),
    read_count: Joi.number()
        .min(0)
        .required(),
    createAt: Joi.date()
        .default(Date.now),
    lastUpdateAt: Joi.date()
        .default(Date.now)
})



const BlogUpdateSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim(),
    Description: Joi.string()
        .min(5)
        .max(500)
        .trim(),
    
})


async function AddBlogValidationMW(req, res, next) {
    const blogPayLoad = req.body

    try {
        await BlogAddSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function UpdateBlogValidationMW(req, res, next) {
    const blogPayLoad = req.body

    try {
        await BlogUpdateSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = {
    AddBlogValidationMW,
    UpdateBlogValidationMW
}