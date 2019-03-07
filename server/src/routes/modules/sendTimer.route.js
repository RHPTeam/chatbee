/**
 * Create route send timer for project
 * author: quangnc
 * date: 1/3/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()

const SendTimerController = require('../../controllers/sendTimer.controller')
const Acc = require('../../controllers/accountFacebook.controller.js')
const {
  validateBody,
  schemas
} = require('../../helpers/validator/router.validator')

router.route('/')
  .get(SendTimerController.index)
  .post(Acc.SendTimer)
  .patch(SendTimerController.update)

module.exports = router