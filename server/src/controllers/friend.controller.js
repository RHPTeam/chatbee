/**
 * Controller facebook for project
 * author: hocpv
 * date up: 09/03/2019
 * date to: ___
 * team: BE-RHP
 */
const FacebookChatApi = require('facebook-chat-api')
const Account = require('../models/Account.model')
const Facebook = require('../models/Facebook.model')
const Friend = require('../models/Friends.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')


module.exports = {
  /**
   * Get All data from Facebook collection
   * @param req
   * @param res
   * Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
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
      !req.query ? dataResponse = await Friend.find({'_account': userId}) : dataResponse = await Friend.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Friend.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   * Create friend with api facebook
   * @param req
   * @param res
   *
   */
  create: async (api, req, res) => {
    const userId = Secure(res, req.headers.authorization)
    // get all friend list and save to db friends
    const idAccountFb = await api.getCurrentUserID()
    api.getFriendsList(async (err, dataRes) => {
      if (err) return console.error(err)
      dataRes.map(async (dataResItem, index, dataRes) => {
        const foundIdFriend = Friend.findOne({ 'userID': dataResItem.userID })
        // if (foundIdFriend !== null) {
        //   foundIdFriend._facebook.push(result.c_user)
        //   await foundIdFriend.save()
        // }
        const listFriendInfo = {
          alternateName: dataResItem.alternateName,
          firstName: dataResItem.firstName,
          gender: dataResItem.gender,
          userID: dataResItem.userID,
          fullName: dataResItem.fullName,
          profilePicture: dataResItem.profilePicture,
          profileUrl: dataResItem.profileUrl,
          vanity: dataResItem.vanity,
          _account: userId
        }
        const friend = await new Friend(listFriendInfo)
        // friend._facebook.push(idAccountFb)
        await  friend.save()
      })
    })
    const foundIdFriend = Friend.find({ '_account': userId })

    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", foundIdFriend))

  },
  /**
   * update friend
   * @param req
   * @param res
   *
   */
  update: async (req, res) => {

  },
  /**
   * delete friend by id
   * @param req
   * @param res
   *
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    const friendResult = await Friend.findOne({'_id': req.query._friendId})
    if (!friendResult) res.status(403).json(JsonResponse("Thuộc tính này không tồn tại!", null))
    if (friendResult._account.toString() !== userId) return res.status(405).json(JsonResponse("Bạn không có quyền cho mục này!", null))
    await friendResult.remove()
    res.status(200).json(JsonResponse("Xóa dữ liệu thành công!", null))
  }
}