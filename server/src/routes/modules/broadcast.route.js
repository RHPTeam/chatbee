/**
 * Create route Broadcast for project
 * author: hocpv
 * date: 12/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const BroadcastController = require('../../controllers/broadcast.controller')

router.route('/')
  .get(BroadcastController.index)
  .post(BroadcastController.create)
  .delete(BroadcastController.delete)

router.route('/addBlock')
  .post(BroadcastController.addBlock)

module.exports = router
