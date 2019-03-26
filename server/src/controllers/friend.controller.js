/**
 * Controller facebook for project
 * author: hocpv
 * date up: 09/03/2019
 * date to: ___
 * team: BE-RHP
 */
const mongoose = require('mongoose')
const FacebookChatApi = require('facebook-chat-api')
const Account = require('../models/Account.model')
const Facebook = require('../models/Facebook.model')
const Friend = require('../models/Friends.model')
const Vocate = require('../models/Vocate.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')

const getNameVocate = (data, id) => {
  let arrFriend = []
  data.map(async function (record) {
    let data = await Vocate.find({ '_account': id, '_friends': record._id })
    let item = record.toObject()
    if(data.length === 0) item.vocate = 'Chưa thiết lập'
    else item.vocate = data[0].name
    arrFriend.push(item)
  })
  return arrFriend
}

module.exports = {
  /**
   * Get All data from Friend collection
   * @param req
   * @param res
   * Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
   *
   */
  index: async (req, res) => {
    const allPlayers = [];

    const cursor = Friend.find({}).lean().cursor();
    cursor.on('data', function(player) { allPlayers.push(player); })
  },
  /**
   * Create friend with api facebook
   * @param req
   * @param res
   *
   */
  create: async (api, req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    if (api === null) return res.status(405).json(JsonResponse("Phiên đăng nhập cookie đã hết hạn, vui lòng đăng nhập lại.", null))
    const foundFacebook = await Facebook.findById(req.query.FB_ID)
    if(!foundFacebook)return res.status(403).json(JsonResponse("Tài khoản facebook không tồn tại!", null))
    const isInArray = accountResult._accountfb.some((id) => {
      return id.equals(req.query.FB_ID);
    })
    if (!isInArray) return res.status(403).json(JsonResponse("Tài khoản của bạn không tồn tại id facebook nà!", null))
    // get all friend list and save to db friends
    api.getFriendsList(async (err, dataRes) => {
      if (err) return console.error(err)
      dataRes.map(async (dataResItem, index, dataRes) => {
        const listFriendInfo = {
          alternateName: dataResItem.alternateName,
          firstName: dataResItem.firstName,
          gender: dataResItem.gender,
          userID: dataResItem.userID,
          fullName: dataResItem.fullName,
          profilePicture: dataResItem.profilePicture,
          profileUrl: dataResItem.profileUrl,
          vanity: dataResItem.vanity,
        }
        const foundIdFriend = await Friend.findOne({ 'userID': dataResItem.userID })
        if (foundIdFriend) {
          foundIdFriend._facebook.push(req.query.FB_ID)
          const isInArray = foundIdFriend._account.some((id) => {
            return id.equals(userId);
          })
          if (!isInArray) {
            foundIdFriend._account.push(userId)
            await  foundIdFriend.save()
          }
          await foundIdFriend.save()
        } else {
          const friend = await new Friend(listFriendInfo)

          // filter friend not exist fullName = nguoi dung facebook
          if (ConvertUnicode(friend.fullName.toLowerCase()).toString() === 'nguoi dung facebook'){
            await Friend.deleteOne(friend)
            return
          }
          friend._facebook.push(req.query.FB_ID)
          const isInArray = friend._account.some((id) => {
            return id.equals(userId);
          })
          if (!isInArray) {
            friend._account.push(userId)
            await  friend.save()
          }
          await  friend.save()
        }
      })
      return res.status(200).json(JsonResponse("Thêm bạn bè thành công !  =))", null))
    })
  },
  /**
   * update friend
   * @param req
   * @param res
   *
   */
  update: async (api, req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    if (api === null) return res.status(405).json(JsonResponse("Phiên đăng nhập cookie đã hết hạn, vui lòng đăng nhập lại.", null))
    // update friend list and save to db friends
    api.getFriendsList(async (err, dataRes) => {
      if (err) return console.error(err)
      dataRes.map(async (dataResItem, index, dataRes) => {
        const listFriendInfo = {
          alternateName: dataResItem.alternateName,
          firstName: dataResItem.firstName,
          gender: dataResItem.gender,
          userID: dataResItem.userID,
          fullName: dataResItem.fullName,
          profilePicture: dataResItem.profilePicture,
          profileUrl: dataResItem.profileUrl,
          vanity: dataResItem.vanity,
        }
        const foundIdFriend = await Friend.findOne({ 'userID': dataResItem.userID })
        if (!foundIdFriend) {
          const friend = await new Friend(listFriendInfo)

          // filter friend not exist fullName = nguoi dung facebook
          if (ConvertUnicode(friend.fullName.toLowerCase()).toString() === 'nguoi dung facebook'){
            await Friend.deleteOne(friend)
            return
          }
          friend._facebook.push(req.body.idAccount)
          const isInArray = friend._account.some((id) => {
            return id.equals(userId);
          })
          if (!isInArray) {
            friend._account.push(userId)
            await  friend.save()
          }
          await  friend.save()
        }
      })
      return res.status(200).json(JsonResponse("Cập nhật bạn bè thành công !  =))", null))
    })
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
