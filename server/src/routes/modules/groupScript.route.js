/**
 * Create route Role for project
 * author: hocpv
 * date: 26/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const GroupScriptController = require('../../controllers/groupScript.controller')

router.route('/')
  .get(GroupScriptController.index)
  .post(GroupScriptController.create)
  .patch(GroupScriptController.update)
  .delete(GroupScriptController.delete)

module.exports = router
