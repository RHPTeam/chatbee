const router = require('express').Router()

router.use('/signin', require('./modules/signin.route'))
router.use('/signup', require('./modules/signup.route'))
router.use('/users', require('./modules/account.route'))
router.use('/facebook-account', require('./modules/accountFacebook.route'))
router.use('/role', require('./modules/role.route'))
router.use('/script', require('./modules/script.route'))
router.use('/group-script', require('./modules/groupScript.route'))
module.exports = router
