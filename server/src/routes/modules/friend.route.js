/**
 * Create route Role for project
 * author: hocpv
 * date: 11/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const FriendController = require('../../controllers/friend.controller')

router.route('/')
  .get(FriendController.index)
  .delete(FriendController.delete)

module.exports = router
