const passport  = require('passport')
const router = require('express').Router()
const { createArticle, AllPublishedArticles, PublishedArticle} = require('../controller/articleController')
const auth = require('../middleware/auth')
router.route('/').get(AllPublishedArticles)
router.route('/:id').get(PublishedArticle)
// router.use(auth)
 router.post('/', passport.authenticate('article', {session:false}), createArticle)


 router.route('/').post(createArticle)

module.exports = router