/**
 * Create route Role for project
 * author: hocpv
 * date: 04/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const AlternateNameController = require('../../controllers/alternateName.controller')

router.route('/')
  .get(AlternateNameController.index)
  .post(AlternateNameController.create)
  .patch(AlternateNameController.update)
  .delete(AlternateNameController.delete)

module.exports = router
