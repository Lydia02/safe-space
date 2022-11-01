const router = require('express').Router()
const { createBlog, getListOfPublishedBlogs, getPublishedBlog } = require('../controller/articleController')
const auth = require('../middleware/auth')
router.route('/').get(getListOfPublishedBlogs)
router.route('/:id').get(getPublishedBlog)

// allow only requests with valid tokens
router.use(auth)
router.route('/').post(createBlog)

module.exports = router