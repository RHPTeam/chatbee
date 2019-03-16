/**
 * Create route Role for project
 * author: hocpv
 * date: 15/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const MessageController = require('../../controllers/message.controller')

router.route('/')
  .get(MessageController.index)
  .delete(MessageController.delete)

module.exports = router
