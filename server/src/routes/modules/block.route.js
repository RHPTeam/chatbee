/**
 * Create route block for project
 * author: hocpv
 * date: 07/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const BlockController = require('../../controllers/block.controller')
// Handle save image
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./uploads')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname)
  }
})
const upload = multer({
  storage:storage
})

router.route('/')
  .get(BlockController.index)
  .post(BlockController.create)
  .patch(upload.single('file'),BlockController.update)
  .delete(BlockController.delete)
router.route('/item')
  .post(upload.single('file'),BlockController.createItem)
module.exports = router
