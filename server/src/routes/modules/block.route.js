/**
 * Create route block for project
 * author: hocpv
 * date: 07/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const BlockController = require('../../controllers/block.controller')

router.route('/')
  .get(BlockController.index)
  .post(BlockController.create)
  .patch(BlockController.update)
  .delete(BlockController.delete)
router.route('/item')
  .post(BlockController.createItem)
module.exports = router
