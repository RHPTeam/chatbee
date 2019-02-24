/**
 * Controller socket messenger facebook for project
 * author: hocpv
 * date up: 19/02/2019
 * date to: ___
 * team: BE-RHP
 */

const FacebookChatApi = require('facebook-chat-api')
const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const Friends = require('../models/FriendsFacebook.model')
const MessageFacebook = require('../models/MessageFacebook.model')

const JsonResponse = require('../configs/res')
const CookieFacebook = require('../configs/cookieFacebook')
const ConvertCookieToObject = require('../helpers/util/cookie.util')

const AccountFacebookController = require('./accountFacebook.controller')

// let api = AccountFacebookController.login
// let loginCookie = data => {
//   return new Promise((resolve, reject) => {
//     FacebookChatApi({ appState: data.cookie }, (err, api) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(api)
//       }
//     })
//   })
// }
module.exports = {
  /**
   * get all conversation
   *
   */
  index: async (req, res) => {
    const userId = req.query._user
    const foundAccount = await Account.findById(userId)
    if (!foundAccount) return res.status(403).json(JsonResponse('User is not exist!', null))
    const findConversation = await MessageFacebook.find({})
    const foundFriend = await Friends.findById()
    console.log(foundFriend)
    console.log(findConversation)
  },
  /**
   * Create conversation with friends
   * @param req
   * @param res
   *
   */
  create: async (req, res) => {
    const userId = req.query._user
    const fbId = req.query._fbId
    const friendId = req.query._friendId
    const foundAccount = await Account.findById(userId)
    if (!foundAccount) return res.status(403).json(JsonResponse('User is not exist!', null))
    const foundFacebook = await AccountFacebook.findById(fbId)
    if (!foundFacebook) return res.status(403).json(JsonResponse('Account facebook is not exist!', null))
    const foundFriend = await Friends.find({ 'userID': friendId })
    if (foundFriend.length === 0) return res.status(403).json(JsonResponse('Friend not exist '))
  },
  /**
   *
   */
  createMess: async (api, req, res) => {
    // const userId = req.query._user
    // const fbId = req.query._fbId
    // const foundUser = await Account.findById(userId)
    // if (!foundUser) { return res.status(403).json(JsonResponse('User is not exist!', null)) }
    // const foundAccountFb = await AccountFacebook.findById(fbId)
    // if (!foundAccountFb) {
    //   return res
    //     .status(403)
    //     .json(JsonResponse('Account facebook not exist!', null))
    // }
    // const result = ConvertCookieToObject(foundAccountFb.cookie)[0]
    // const defineAgainCookie = CookieFacebook(
    //   result.fr,
    //   result.datr,
    //   result.c_user,
    //   result.xs
    // )
    // api = await loginCookie({ cookie: defineAgainCookie })
    // res.status(200).json(JsonResponse('Login facebook account success!', null))
    var yourID = '100004719523122'
    var msg = '[BOT] Alo em ei :love'
    api.sendMessage(msg, yourID)
  }
}
