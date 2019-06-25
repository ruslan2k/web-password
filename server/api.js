const router = require('express').Router()

router.use('/groups', require('./controllers/groupController'))
router.use('/users', require('./controllers/userController'))
// router.use('/auth', require('./controllers/authController'))

module.exports = router
