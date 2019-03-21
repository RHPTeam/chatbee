/**
 * Create route Role for project
 * author: hocpv
 * date: 14/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const SequenceController = require('../../controllers/sequence.controller')

router.route('/')
  .get(SequenceController.index)
  .post(SequenceController.create)
  .patch(SequenceController.update)
  .delete(SequenceController.delete)
router.route('/addBlock')
  .post(SequenceController.addBlock)

module.exports = router
