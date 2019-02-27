/**
 * Create route Role for project
 * author: hocpv
 * date: 26/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const ScriptController = require('../../controllers/script.controller')

router.route('/')
  .get(ScriptController.index)
  .post(ScriptController.create)
  .patch(ScriptController.update)
  .delete(ScriptController.delete)

module.exports = router
