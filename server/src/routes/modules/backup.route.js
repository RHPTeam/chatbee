/**
 * Create route backup for project
 * author: hoc-anms
 * date: 10/04/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const BackupController = require('../../controllers/backup.controller')


router.route('/')
  .get(BackupController.index)
module.exports = router
