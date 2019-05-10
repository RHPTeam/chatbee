/**
 * Controller facebook for project
 * author: hocpv
 * date up: 09/03/2019
 * date to: ___
 * team: BE-RHP
 */
var mongoose = require('mongoose')
const FacebookChatApi = require('facebook-chat-api')
const Account = require('../models/Account.model')
const Facebook = require('../models/Facebook.model')
const Friend = require('../models/Friends.model')
const Vocate = require('../models/Vocate.model')
const FacebookController = require('../controllers/facebook.controller')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')

module.exports = {
  /**
   * Get All data from Friend collection
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

    // accountResult._accountfb.map( async facebook => {
    //   let findFacebook = await Facebook.findOne( { _id: facebook } )
    //   console.log( findFacebook.activeFriend)
    //   if ( findFacebook.activeFriend == 0 ) {
    //     console.log(1)
    //     await FacebookController.createFriend(req, res)
    //   }
    // } )
    if (DecodeRole(role, 10) === 0) {
      req.query._id ? dataResponse = await Friend.find({'_id': req.query._id}).lean(): req.query._fbId && req.query._size && req.query._page ? dataResponse = (await Friend.find({'_facebook':req.query._fbId,'_account': userId}).lean()).slice((Number(req.query._page)-1)*Number(req.query._size), Number(req.query._size)*Number(req.query._page)) : req.query._fbId && req.query._size ? dataResponse = (await Friend.find({'_facebook':req.query._fbId,'_account': userId}).lean()).slice(0, Number(req.query._size)) : req.query._fbId ? dataResponse = await Friend.find({'_facebook':req.query._fbId,'_account': userId}).lean() :  req.query._size && req.query._page ? dataResponse = (await Friend.find({'_account': userId}).lean()).slice((Number(req.query._page)-1)*Number(req.query._size), Number(req.query._size)*Number(req.query._page)) :req.query._size ? dataResponse = (await Friend.find({'_account': userId}).lean()).slice(0, Number(req.query._size)) : dataResponse = (await Friend.find({'_account': userId}).lean())
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Friend.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    Promise.all(dataResponse.map( async friend => {
      let vocate = await Vocate.find({ '_account': userId, '_friends': friend._id })
      vocate.length === 0 ?  friend['vocate'] = 'Chưa thiết lập' : friend['vocate'] = vocate[0].name
      return friend
    })).then(async item => {
      if (req.query._fbId && req.query._size && req.query._page || req.query._fbId && req.query._size ||  req.query._size && req.query._page || req.query._size) {
        const pageFb = !req.query._fbId ? null : ((await Friend.find({'_facebook':req.query._fbId,'_account': userId}).lean()).length % req.query._size) === 0 ?  Math.floor((await Friend.find({'_facebook':req.query._fbId,'_account': userId}).lean()).length / req.query._size) : Math.floor((await Friend.find({'_facebook':req.query._fbId,'_account': userId}).lean()).length / req.query._size)+ 1
        const pageFr =  ((await Friend.find({'_account': userId}).lean()).length % req.query._size) === 0 ? Math.floor((await Friend.find({'_account': userId}).lean()).length / req.query._size) : Math.floor((await Friend.find({'_account': userId}).lean()).length / req.query._size) + 1
        const page =  req.query._fbId ? pageFb : pageFr
        return res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", {friends:item, page:page, facebook: accountResult._accountfb}))
      }
      return res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", item))
    })
  },

  /**
   * Search List Friend by query
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  searchListFriend: async (req, res) => {
    let dataResponse = null
    let page =null
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    const findFriend = await Friend.find({'_account':userId}).lean()
    req.query._name.trim() !== '' ? dataResponse = findFriend.filter( friend => ConvertUnicode(friend.fullName.toLowerCase()).toString().includes(ConvertUnicode(req.query._name.toLowerCase()).toString())) : dataResponse = findFriend
    if (req.query._size && req.query._page || req.query._size) {
      page =  (dataResponse.length % req.query._size) === 0 ? Math.floor(dataResponse.length / req.query._size) : Math.floor(dataResponse.length / req.query._size) + 1
      dataResponse = req.query._size && req.query._page ? dataResponse.slice((Number(req.query._page)-1)*Number(req.query._size), Number(req.query._size)*Number(req.query._page)) : dataResponse
    }
    Promise.all(dataResponse.map( async friend => {
      let vocate = await Vocate.find({ '_account': userId, '_friends': friend._id })
      vocate.length === 0 ?  friend['vocate'] = 'Chưa thiết lập' : friend['vocate'] = vocate[0].name
      return friend
    })).then (async item => {
      if (req.query._size && req.query._page || req.query._size) {
        return res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", {friends:item ,page:page}))
      }
      return res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", item))
    })
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
          profilePicture: `http://graph.facebook.com/${dataResItem.userID}/picture?type=large`,
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
          profilePicture: `http://graph.facebook.com/${dataResItem.userID}/picture?type=large`,
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