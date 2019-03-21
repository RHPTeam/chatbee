/**
 * Create route Role for project
 * author: hocpv
 * date: 08/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const FaceController = require('../../controllers/facebook.controller')

router.route('/')
  .get(FaceController.index)
  .post(FaceController.create)
  .patch(FaceController.update)
  .delete(FaceController.delete)

// Handle login
router.route('/login')
  .post(FaceController.login)

//Handle logout
router.route('/logout')
  .post(FaceController.logout)

// Handle to get api facebook to friend controller
router.route('/friend')
  .post(FaceController.createFriend)
  .patch(FaceController.updateFriend)

// Handle to get api facebook to friend controller
router.route('/message')
  .post(FaceController.createMessage)

module.exports = router
