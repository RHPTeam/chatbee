/**
 * Create route Sign Up for project
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

router.route('/').post(validateBody(schemas.userSignUpSchema), AccountController.signUp)

module.exports = router
