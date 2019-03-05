/**
 * Create route Role for project
 * author: hocpv
 * date: 18/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const TagVariableController = require('../../controllers/tagVariable.controller')

router.route('/')
  .get(TagVariableController.index)
  .post(TagVariableController.create)
  .patch(TagVariableController.update)
  .delete(TagVariableController.delete)

module.exports = router
