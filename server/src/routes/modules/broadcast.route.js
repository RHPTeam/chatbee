/**
 * Create route Broadcast for project
 * author: hocpv
 * date: 08/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const BroadcastController = require('../../controllers/broadcast.controller')

router.route('/')
  .get(BroadcastController.index)
  .post(BroadcastController.create)
  .patch(BroadcastController.update)
  .delete(BroadcastController.delete)

module.exports = router
