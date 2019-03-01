const router = require('express').Router()

router.use('/signin', require('./modules/signin.route'))
router.use('/signup', require('./modules/signup.route'))
router.use('/users', require('./modules/account.route'))
router.use('/facebook-account', require('./modules/accountFacebook.route'))
router.use('/role', require('./modules/role.route'))
router.use('/get-api', require('../controllers/accountFacebook.controller').ChatMessage)
router.use('/send-time', require('./modules/sendTimer.route'))
module.exports = router
