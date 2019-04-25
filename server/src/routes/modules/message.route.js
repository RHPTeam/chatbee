/**
 * Create route Role for project
 * author: hocpv
 * date: 15/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const MessageController = require('../../controllers/message.controller')
const Secure = require('../../helpers/util/secure.util')

// Handle save image
const fs = require('fs-extra');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = Secure(file , req.headers.authorization)
    const path = `./uploads/message/person/${userId}`
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
  .get(MessageController.index)
  .delete(MessageController.delete)

router.route('/upload-image')
  .post(upload.single('file'),MessageController.uploadImage)

module.exports = router
