const router = require('express').Router()
const homeRoutes = require('./home-routes')
const commentRoutes = require('./api/comment-routes')
const userRoutes = require('./api/user-routes')
const postRoutes = require('./api/post-routes')

// setting up the routes usage
router.use('/', homeRoutes)
router.use('/api/comments', commentRoutes)
router.use('/api/users', userRoutes)
router.use('/api/posts', postRoutes)
module.exports = router
