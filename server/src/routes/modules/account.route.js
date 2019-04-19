/**
 * Create route User for project
 * author: Tran Toan
 * date: 08/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const Secure = require('../../helpers/util/secure.util')
// Handle save image
const fs = require('fs-extra');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = Secure(file , req.headers.authorization)
    const path = `./uploads/users/person/${userId}`
    fs.mkdirsSync(path);
    cb(null,path)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname)
  }
})
const upload = multer({
  storage:storage,
  limits: {
    fileSize: 1024*1024*5
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
})

const AccountController = require('../../controllers/account.controller')

router.route('/')
  .post(upload.single('file'), AccountController.upload)
  .get(AccountController.index)
  .patch(AccountController.update)
  .put(AccountController.deleteUser)
router.route('/admin')
  .patch(AccountController.updateExpire)
router.route('/change-password').patch(AccountController.changePassword)

module.exports = router
