/**
 * Create route Sign In for project
 * author: Tran Toan
 * date: 08/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const passport = require('passport')

const AccountController = require('../../controllers/account.controller')

const {
  validateBody,
  schemas
} = require('../../helpers/validator/router.validator')

router.route('/').post(validateBody(schemas.userSignInSchema), passport.authenticate('local', { session: false }), AccountController.signIn)

module.exports = router
