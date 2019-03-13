/**
 * Controller group block for project
 * author: hocpv
 * date up: 13/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const GroupFriend = require('../models/GroupFriends.model')
const Friend = require('../models/Friends.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')

module.exports = {
  /**
   *  get all group friend & group friend by Id
   *  @param req
   *  @param res
   *
   */
  index: async (req, res) => {
    let dataResponse = null
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    if (DecodeRole(role, 10) === 0) {
      !req.query._id ? dataResponse = await GroupFriend.find({'_account': userId}) : dataResponse = await GroupFriend.find({'_id':req.query,'_account': userId})
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await GroupFriend.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   *  create group friend
   *  @param req
   *  @param res
   *
   */
  create: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundGroupFriend = await GroupFriend.find({'_account': userId})
    let checkName = false
    foundGroupFriend.map(val => {
      if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
        checkName = true
        return checkName
      }
    })
    if (checkName) return res.status(403).json(JsonResponse('Tên nhóm bạn bè đã tồn tại!', null))
    const newGroupFriend = await new GroupFriend()
    newGroupFriend.name = req.body.name
    newGroupFriend._account = userId
    await  newGroupFriend.save()
    res.status(200).json(JsonResponse('Tạo nhóm bạn bè thành công!', newGroupFriend))
  },
  /**
   *  update group friend
   *  @param req
   *  @param res
   *
   */
  update: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundGroupFriend = await GroupFriend.find({'_account': userId})
    let checkName = false
    foundGroupFriend.map(val => {
      if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
        checkName = true
        return checkName
      }
    })
  },
  addFriend: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
  },
  /**
   *  delete group friend
   *  @param req
   *  @param res
   *
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
  },
}
