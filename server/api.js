const router = require('express').Router()

router.use('/user', require('./controllers/userController'))
router.use('/auth', require('./controllers/authController'))

module.exports = router
