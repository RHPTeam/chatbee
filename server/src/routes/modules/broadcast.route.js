/**
 * Create route Broadcast for project
 * author: hocpv
 * date: 12/03/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const BroadcastController = require('../../controllers/broadcast.controller')
// Handle save image
const Secure = require('../../helpers/util/secure.util')
const fs = require('fs-extra');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = Secure(file , req.headers.authorization)
    const path = `./uploads/broadcast/person/${userId}`
    fs.mkdirsSync(path);
    cb(null,path)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname)
  }
})
const upload = multer({
  storage:storage
})


router.route('/')
  .get(BroadcastController.index)
  .post(BroadcastController.create)
  .patch(upload.single('file'),BroadcastController.update)
  .delete(BroadcastController.delete)

router.route('/addBlock')
  .post(BroadcastController.addBlock)

module.exports = router
