/**
 * Create route Role for project
 * author: hocpv
 * date: 18/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const RoleController = require('../../controllers/role.controller')

router.route('/')
  .get(RoleController.index)
  .post(RoleController.create)
  .patch(RoleController.update)
  .delete(RoleController.delete)

module.exports = router
