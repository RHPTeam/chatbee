/**
 * Controller facebook for project
 * author: hocpv
 * date up: 08  /03/2019
 * date to: ___
 * team: BE-RHP
 */
const FacebookChatApi = require('facebook-chat-api')
const Account = require('../models/Account.model')
const Facebook = require('../models/Facebook.model')
const Friend = require('../models/Friends.model')

const JsonResponse = require('../configs/res')
const CookieFacebook = require('../configs/cookieFacebook')
const ConvertCookieToObject = require('../helpers/util/cookie.util')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')

const FriendController = require('../controllers/friend.controller')
const MessageController = require('../controllers/message.controller')

// function global get api facebook
let api = null
let loginCookie = data => {
  return new Promise((resolve, res) => {
    FacebookChatApi({ appState: data.cookie }, (err, api) => {
      if (err) {
        console.log(err)
        return
      } else {
        resolve(api)
      }
    })
  })
}

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
      !req.query._id ? dataResponse = await Facebook.find({'_account': userId}) : dataResponse = await Facebook.find({'_id':req.query._id, '_account': userId})
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Facebook.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   * create account facebook 
   * @param req
   * @param res
   * 
   */
  create: async (req, res) => {
    let data
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    // check acount facebook using cookie is exist
    const foundAccountCookie = await Facebook.find({
      'cookie': req.body.cookie, '_account': userId
    })
    if (foundAccountCookie.length > 0) {
      return res
        .status(404)
        .json(JsonResponse('Bạn đã sử dụng cookie này!', null))
    }
    // check maximum account facebook
    if (accountResult._accountfb.length >= accountResult.maxAccountFb) {
      return res.status(405).json(JsonResponse('Số lượng tài khoản của bạn đã đủ giới hạn, vui lòng mua dịch vụ để có số lượng lớn hơn!', null))
    }
    // pre process with cookie facebook
    const result = ConvertCookieToObject(req.body.cookie)[0]
    const defineAgainCookie = CookieFacebook(
      result.fr,
      result.datr,
      result.c_user,
      result.xs
    )
    // check cookie is another but loop account facebook
    const foundAccountFacebook = await Facebook.find({
      'userInfo.id': result.c_user
    })
    if (foundAccountFacebook.length > 0) {
      return res.status(403).json(JsonResponse('Tài khoản facebook với cookie này trùng với một tài khoản ở 1 cookie khác!', null))
    }
    // login facebook with cookie to get data
    api = await loginCookie({ cookie: defineAgainCookie } , err => {
      if (err) return res.status(405).json(JsonResponse('Cookie hết hạn hoặc gặp lỗi khi đăng nhập!', err))
    })

    // get user facebook infor for save to db facebook
    const newFacebook = await new Facebook(req.body)
    api.getUserInfo(result.c_user, async (err, ret) => {
      if (err) return console.error(err)
      else {
        data = Object.values(ret)[0]
        newFacebook.userInfo = {
          id: result.c_user,
          name: data.name,
          thumbSrc: data.thumbSrc,
          profileUrl: data.profileUrl
        }
        newFacebook._account = userId
        await newFacebook.save()
        return res.status(200).json(JsonResponse('Thêm tài khoản facebook thành công!', newFacebook))
      }
    })
    accountResult._accountfb.push(newFacebook._id)
    await Account.findByIdAndUpdate(userId,  {$set:{ _accountfb: accountResult._accountfb }},{ new : true }).select('-password')
  },
  /**
   * Get all(or by ID) account facebook 
   * @param req
   * @param res
   * 
   */
  update: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    const fbResult = await Facebook.findOne({'_id': req.query._fbId})
    if (fbResult._account.toString() !== userId) return res.status(405).json(JsonResponse("Bạn không có quyền cho mục này!", null))
    if (!fbResult) res.status(403).json(JsonResponse("Thuộc tính này không tồn tại!", null))
    const objectSaver = {
      cookie: req.body.cookie,
      updated_at: Date.now()
    }
    const newFacebook = await Facebook.findByIdAndUpdate(req.query._fbId, { $set: objectSaver }, { new: true })
    res.status(200).json(JsonResponse("Cập nhật thuộc tính thành công!", newFacebook))
  },
  /**
   * Get all(or by ID) account facebook 
   * @param req
   * @param res
   * 
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    const fbResult = await Facebook.findOne({'_id': req.query._fbId})
    if (!fbResult) res.status(403).json(JsonResponse("Thuộc tính này không tồn tại!", null))
    if (fbResult._account.toString() !== userId) return res.status(405).json(JsonResponse("Bạn không có quyền cho mục này!", null))
    await fbResult.remove()
    accountResult._accountfb.pull(fbResult._id)
    await accountResult.save()
    res.status(200).json(JsonResponse("Xóa dữ liệu thành công!", null))
  },
  /**
   * login facebook
   * @param req
   * @param res
   *
   */
  login: async (req, res) => {
    let data
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    const foundAccountFb = await Facebook.findById(req.query._fbId)
    if (!foundAccountFb)return res.status(403).json(JsonResponse('Tài khoản facebook không tồn tại!', null))
    const result = ConvertCookieToObject(foundAccountFb.cookie)[0]
    const defineAgainCookie = CookieFacebook(
      result.fr,
      result.datr,
      result.c_user,
      result.xs
    )
    api = await loginCookie({ cookie: defineAgainCookie } , err => {
      if (err) return res.status(405).json(JsonResponse('Cookie hết hạn hoặc gặp lỗi khi đăng nhập!', err))
    })
    // update information facebook when login again
    api.getUserInfo(result.c_user, async (err, ret) => {
      if (err) return console.error(err)
      else {
        data = Object.values(ret)[0]
        foundAccountFb.userInfo = {
          name: data.name,
          thumbSrc: data.thumbSrc,
          profileUrl: data.profileUrl
        }
        await foundAccountFb.save()
      }
    })
    res.status(200).json(JsonResponse(`Đăng nhập tài khoản facebook ${foundAccountFb.userInfo.name} thành công!`, null))
  },
  /**
   * logout facebook
   * @param req
   * @param res
   *
   */
  logout: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    const foundAccountFb = await Facebook.findById(req.query._fbId)
    if (!foundAccountFb)return res.status(403).json(JsonResponse('Tài khoản facebook không tồn tại!', null))
    api.logout((err) => {
      if (err) return console.error(err)
    })
    res.status(200).json(JsonResponse('Đăng xuất tài khoản facebook thành công!', null))
  },
  /**
   * Create friend facebook from account facebook sign up
   * @param req
   * @param res
   *
   */
  createFriend: async (req, res) => {
    FriendController.create(api, req, res)
  },
  /**
   * Update friend facebook from account facebook sign in
   * @param req
   * @param res
   *
   */
  updateFriend: async (req, res) => {
    FriendController.update(api, req, res)
  },
  /**
   * create message
   * @param req
   * @param res
   *
   */
  createMessage: async ( req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundFriend = await Friend.find({ 'fullName': 'Người dùng Facebook'})
    console.log(foundFriend)
    if ( !api || api === '' ) return res.status(405).json(JsonResponse("Phiên đăng nhập cookie đã hết hạn, vui lòng đăng nhập lại.", null))
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    // check not get api success
    const foundFacebook = await Facebook.findById(req.query._fbId)
    if(!foundFacebook) return res.status(403).json(JsonResponse("Tài khoản facebook không tồn tại!", null))

    // check account have not account facebook with id
    const isInArray = accountResult._accountfb.some((id) => {
      return id.equals(req.query._fbId);
    })
    if (!isInArray) return res.status(403).json(JsonResponse("Tài khoản của bạn không tồn tại id facebook này!", null))
    const data = {
      _facebook: req.query._fbId,
      _account: userId,
      _sender: req.query._fbId,
      typeData: req.query._type ? true : false
    }
    MessageController.create(req, api, data)
  }
}