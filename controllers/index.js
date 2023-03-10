const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./home-routes.js')
const dashboardRoutes = require('./dashboardRoutes.js')

router.use('/api', apiRoutes)
router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)

module.exports = router
