/**
 * Create route Facebook Account for project
 * author: Tran Toan
 * date: 08/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()

const AccountFacebookController = require('../../controllers/accountFacebook.controller')

router.route('/')
  .post(AccountFacebookController.create)
  .delete(AccountFacebookController.delete)

module.exports = router
