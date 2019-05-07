/**
 * Create route block for project
 * author: hocpv
 * date: 07/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const Secure = require('../../helpers/util/secure.util')
const BlockController = require('../../controllers/block.controller')
// Handle save image
const fs = require('fs-extra');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = Secure(file , req.headers.authorization)
    const path = `./uploads/blocks/person/${userId}`
    fs.mkdirsSync(path);
    cb(null,path)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname)
  }
})
const upload = multer({
  storage:storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
})

router.route('/')
  .get(BlockController.index)
  .post(BlockController.create)
  .patch(upload.single('file'),BlockController.update)
  .delete(BlockController.delete)
router.route('/item')
  .post(upload.single('file'),BlockController.createItem)
module.exports = router
