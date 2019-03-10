const router = require('express').Router()
const auth = require('../helpers/middleware/authenticate.middleware')

router.use('/signin', require('./modules/signin.route'))
router.use('/signup', require('./modules/signup.route'))
router.use('/users', auth, require('./modules/account.route'))
router.use('/facebook-account', auth, require('./modules/accountFacebook.route'))
router.use('/role', auth, require('./modules/role.route'))

router.use('/script', auth,  require('./modules/script.route'))
router.use('/group-script', auth, require('./modules/groupScript.route'))
router.use('/tag-variable', auth, require('./modules/tagVariable.route'))
router.use('/alternate-name', auth, require('./modules/alternateName.route'))

router.use('/get-api', auth, require('../controllers/accountFacebook.controller').ChatMessage)
router.use('/send-time', auth, require('./modules/sendTimer.route'))

// Restructure route follow new model
router.use('/block',auth, require('./modules/block.route'))
router.use('/group-block',auth, require('./modules/groupBlock.route'))
router.use('/attr', auth, require('./modules/attribute.route'))


module.exports = router
