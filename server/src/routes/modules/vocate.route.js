/**
 * Create route Attribute for project
 * author: Tran Toan (Sky Albert)
 * date: 08/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const VocateController = require('../../controllers/vocate.controller')


router.route('/')
  .get(VocateController.index)
  .post(VocateController.create)

module.exports = router