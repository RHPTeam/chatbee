/**
 * Create route Role for project
 * author: hocpv
 * date: 13/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const GroupFriendController = require('../../controllers/groupFriend.controller')

router.route('/')
  .get(GroupFriendController.index)
  .post(GroupFriendController.create)
  .patch(GroupFriendController.update)
  .delete(GroupFriendController.delete)
router.route('/addFriend')
  .post(GroupFriendController.addFriend)

module.exports = router
