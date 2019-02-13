/**
 * Controller facebook account for project
 * author: Tran Toan
 * date up: 08/02/2019
 * date to: ___
 * team: BE-RHP
 */

const FacebookChatApi = require('facebook-chat-api')
const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const fs = require('fs')

const JsonResponse = require('../configs/res')
const CookieFacebook = require('../configs/cookieFacebook')
const ConvertCookieToObject = require('../helpers/util/cookie.util')

let api = null
let loginCookie = data => {
  return new Promise((resolve, reject) => {
    FacebookChatApi({ appState: data.cookie }, (err, api) => {
      if (err) {
        reject(err)
      } else {
        resolve(api)
      }
    })
  })
}

module.exports = {
  index: async (req, res) => {
    const dataFound = await AccountFacebook.find({}).select('-cookie')
    if (!dataFound) {
      return res.status(403).json(JsonResponse('Data is not found!', null))
    }
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },
  /**
   * add accountFb by cookie of email, password
   * @param req
   * @param res
   */
  create: async (req, res) => {
    let data = {}
    const userId = req.query._user
    // process cookie before get
    const result = ConvertCookieToObject(req.body.cookie)[0]
    const defineAgainCookie = CookieFacebook(
      result.fr,
      result.datr,
      result.c_user,
      result.xs
    )
    // check acount facebook using cookie is exist
    const findCookie = req.body.cookie
    const foundAccountCookie = await AccountFacebook.find({
      cookie: findCookie
    })
    if (foundAccountCookie.length > 0) {
      return res
        .status(404)
        .json(JsonResponse('Account using this cookie is exist!', null))
    }
    const foundUser = await Account.findById(userId)
    console.log(foundUser)
    if (!foundUser) {
      return res.status(403).json(JsonResponse('User is not exist!', null))
    }

    const newAccountFacebook = await new AccountFacebook(req.body)
    api = await loginCookie({ cookie: defineAgainCookie })
    api.getFriendsList(async (err, dataRes) => {
      if (err) return console.error(err)
      newAccountFacebook.userInfo = {
        friends: dataRes
      }
      await newAccountFacebook.save()
    })
    api.getUserInfo(result.c_user, async (err, ret) => {
      if (err) return console.error(err)
      else {
        data = Object.values(ret)[0]
        newAccountFacebook.userInfo = {
          id: result.c_user,
          name: data.name,
          thumbSrc: data.thumbSrc,
          profileUrl: data.profileUrl
        }
        await newAccountFacebook.save()
        res
          .status(200)
          .json(
            JsonResponse('Add account facebook using cookie successfull!', data)
          )
      }
    })
    foundUser._accountfb.push(newAccountFacebook._id)
    await foundUser.save()
  },

  /**
   * delete accountFb by id
   * @param req
   * @param res
   */
  delete: async (req, res) => {
    const id = req.query._id
    const userId = req.query._user
    const foundUser = await Account.findById(userId)
    if (!foundUser) {
      return res
        .status(403)
        .json(JsonResponse('You are not authorities delete!', null))
    }
    const findAccountFb = await AccountFacebook.findById(id)
    if (!findAccountFb) {
      return res
        .status(403)
        .json(JsonResponse('You have not this accountfb!', null))
    }
    await findAccountFb.remove()
    foundUser._accountfb.pull(findAccountFb._id)
    await foundUser.save()
    res
      .status(200)
      .json(JsonResponse('Delete account facebook success! T_T', null))
  },
  /**
   * logout accountFb by id
   * @param req
   * @param res
   */
  logout: async (req, res) => {
    const id = req.query._id
    const userId = req.query._user
    const foundUser = await Account.findById(userId)
    if (!foundUser) {
      return res
        .status(403)
        .json(JsonResponse('You are not authorities delete!', null))
    }
    const findAccountFb = await AccountFacebook.findById(id)
    if (!findAccountFb) {
      return res
        .status(403)
        .json(JsonResponse('You have not this accountfb!', null))
    }
  }
}
