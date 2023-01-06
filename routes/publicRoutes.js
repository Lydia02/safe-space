const passport = require('passport')

const express = require('express')
const publicRouter = express.Router()
//const {  AddBlogValidationMW,UpdateBlogValidationMW } = require("../validators/blog.validator")
const publicController = require('../controller/publicArticleController')
publicRouter.get('/blogs', publicController.getAllPublishedBlogs)

module.exports = publicRouter

const authorRouter = express.Router()



//authorRouter.post('/', AddAuthorValidationMW, authorController.addAuthor)

//authorRouter.put('/:id', UpdateAuthorValidationMW, authorController.updateAuthor)

