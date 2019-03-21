/**
 * Create route User for project
 * author: Tran Toan
 * date: 08/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const multer = require('multer')

const upload = multer({
  dest: 'uploads/'
})

const AccountController = require('../../controllers/account.controller')

router.route('/')
  .post(upload.single('file'), AccountController.upload)
  .get(AccountController.index)
  .patch(AccountController.update)
  .delete(AccountController.deleteUser)

router.route('/change-password').patch(AccountController.changePassword)
router.route('/reset-password').post(AccountController.resetPassword);
router.route('/check-code').post(AccountController.checkCode);
router.route('/new-password').patch(AccountController.createNewPassword);

module.exports = router
