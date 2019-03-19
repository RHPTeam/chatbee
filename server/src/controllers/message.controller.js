/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 15/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require ('../models/Account.model')
const Message = require('../models/Messages.model')
const Facebook = require('../models/Facebook.model')
const Friend = require('../models/Friends.model')
const Block = require('../models/Blocks.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const CronJob = require('cron').CronJob

module.exports = {
  /**
   * Get all(id) broadcast
   * @param: req
   * @param: res
   */
  index: async (req, res) => {
    let dataResponse = null
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    if (DecodeRole(role, 10) === 0) {
      !req.query._id ? dataResponse = await Message.find({'_account': userId}) : dataResponse = await Message.find({'_id':req.query._id, '_account': userId})
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Message.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   * Create conversation
   * @param: req
   * @param: res
   */
  create: async (socket, api, res) => {
    if ( !api || api === '' ) return res.status(405).json(JsonResponse("Phiên đăng nhập cookie đã hết hạn, vui lòng đăng nhập lại.", null))
    const userId = Secure(res, socket.headers.authorization)
    console.log(userId)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    // check not get api success
    const foundFacebook = await Facebook.findById(socket.query._fbId)
    if(!foundFacebook) return res.status(403).json(JsonResponse("Tài khoản facebook không tồn tại!", null))
    // check account have not account facebook with id
    const isInArray = accountResult._accountfb.some((id) => {
      return id.equals(socket.query._fbId);
    })
    if (!isInArray) return res.status(403).json(JsonResponse("Tài khoản của bạn không tồn tại id facebook này!", null))
    const newMessage = await new Message()

    socket.on('send', data => {
        console.log(data)
    })
    // listen message send from customer
    // api.listen( async (err, message) => {
    //   if (err) return res.status(403).json(JsonResponse("Xảy ra lỗi trong quá trình gửi tin nhắn, vui lòng kiểm tra lại!", null))
    //   socket.emit('listen-send', message.body)
    //   // send message to customer
    //   socket.on('send', data => {
    //     console.log(data)
    //     api.sendMessage(data.text, data.id, err => {
    //       if (err) return res.status(403).json(JsonResponse("Xảy ra lỗi trong quá trình gửi tin nhắn, vui lòng kiểm tra lại!", null))
    //     })
    //   })
    //
    //   newMessage._account = userId
    //   newMessage._sender = socket.query._fbId
    //   const foundFriend = await Friend.findOne({ 'userID': message.senderID,'_account': userId })
    //   const foundBlock = await Block.findOne({ 'name': message.body, '_account': userId })
    //   console.log(foundBlock)
    //   if (!foundFriend) {
    //
    //   }
    // })




  },

  /**
   * Delete conversation
   * @param: req
   * @param: res
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    await Message.findByIdAndRemove(req.query._threadId)
    res.status(200).json(JsonResponse('Xóa cuộc hội thoại thành công!', null))
  },
}
