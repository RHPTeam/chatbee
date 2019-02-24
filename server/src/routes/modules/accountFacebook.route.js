/**
 * Create route Facebook Account for project
 * author: Tran Toan
 * date: 08/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()

const AccountFacebookController = require('../../controllers/accountFacebook.controller')

router.route('/')
  .get(AccountFacebookController.index)
  .post(AccountFacebookController.create)
  .delete(AccountFacebookController.delete)
router.route('/login')
  .post(AccountFacebookController.login)

router.route('/chat')
  .post(AccountFacebookController.createMessage)

module.exports = router
