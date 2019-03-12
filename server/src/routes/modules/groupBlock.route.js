/**
 * Create route group block for project
 * author: hocpv
 * date: 07/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const GroupBlockController = require('../../controllers/groupBlock.controller')

router.route('/')
  .get(GroupBlockController.index)
  .post(GroupBlockController.create)
  .patch(GroupBlockController.update)
  .delete(GroupBlockController.delete)
router.route('/add-block')
  .post(GroupBlockController.addBlock)
module.exports = router
