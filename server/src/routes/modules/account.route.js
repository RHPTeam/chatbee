/**
 * Create route User for project
 * author: Tran Toan
 * date: 08/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()

const AccountController = require('../../controllers/account.controller')

const {
  validateBody,
  schemas
} = require('../../helpers/validator/router.validator')

router.route('/')
  .get(AccountController.index)
  .patch(AccountController.update)
  .delete(AccountController.deleteUser)

router.route('/change-password').patch(AccountController.changePassword)
router.route('/reset-password').post(AccountController.resetPassword);
router.route('/check-code').post(AccountController.checkCode);
router.route('/new-password').patch(AccountController.createNewPassword);

module.exports = router
