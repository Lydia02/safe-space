const passport  = require('passport')
const router = require('express').Router()
const {  AddBlogValidationMW,UpdateBlogValidationMW } = require("../validators/blog.validator")
const { createArticle, AllPublishedArticles, PublishedArticle, updatePubishedArticle, updatePubishedArticleState, deletePublishedArticles} = require('../controller/articleController')
const auth = require('../middleware/auth')
router.route('/blog').get(AllPublishedArticles)
router.route('/:id').get(PublishedArticle)
router.route('/article/:id').patch(updatePubishedArticle)
router.route('/:id').patch(updatePubishedArticleState)
router.route('/:id').delete(deletePublishedArticles)

router.route('/').post(createArticle)

router.route('/').post(AddBlogValidationMW)
router.route('/article/:id').patch(UpdateBlogValidationMW)

// router.use(auth)
 //router.post('/', passport.authenticate('blog', {session:false}))



module.exports = router




