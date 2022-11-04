const passport = require('passport')

const express = require('express')
const publicRouter = express.Router()

const public = require('../controller/publicArticleController')
publicRouter.get('/blogs', public.getAllPublishedBlogs)

module.exports = publicRouter