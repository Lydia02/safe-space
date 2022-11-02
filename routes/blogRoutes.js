const passport  = require('passport')
const router = require('express').Router()
const { createBlog, getListOfPublishedBlogs, getPublishedBlog } = require('../controller/articleController')
const auth = require('../middleware/auth')
router.route('/').get(getListOfPublishedBlogs)
router.route('/:id').get(getPublishedBlog)

// allow only requests with valid tokens
router.use(auth)
//router.post('/blog', passport.authenticate('jwt', { session:false }), createBlog)
//router.post('/', passport.authenticate('jwt', {session:false}), createBlog)
router.route('/blog').post(createBlog)

module.exports = router