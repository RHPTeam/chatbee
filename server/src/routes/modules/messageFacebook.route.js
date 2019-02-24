/**
 * Create route messenger facebook for project
 * author: hocpv
 * date: 18/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const MessageFacebookController = require('../../controllers/messageFacebook.controller')

router.route('/')
  .get(MessageFacebookController.index)

// router.route('/login')
//   .post(MessageFacebookController.login)

module.exports = router
