/**
 * Controller facebook account for project
 * author: Tran Toan
 * date up: 08/02/2019
 * date to: ___
 * team: BE-RHP
 */

const loginFacebook = require('facebook-chat-api')
const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const fs = require('fs')

const JsonResponse = require('../configs/res')
const CookieFacebook = require('../configs/cookieFacebook')
const ConvertCookieToObject = require('../helpers/util/cookie.util')

module.exports = {
  /**
   * add accountFb by cookie of email, password
   * @param req
   * @param res
   */
  create: async (req, res) => {
    const addAccountType = req.query._type
    const userId = req.query._user
    switch (addAccountType) {
      case 'cookie': {
        const result = ConvertCookieToObject(req.body.cookie)[0]
        const defineAgainCookie = CookieFacebook(result.fr, result.datr, result.c_user, result.xs)
        // check acount facebook using cookie and email, password is loop
        const findAccountId = result.c_user
        const foundAccountId = await AccountFacebook.find({ 'userInfo.id': findAccountId })
        if (foundAccountId.length > 0) return res.status(404).json(JsonResponse('Account facebook is exist!', null))
        // check acount facebook using cookie is exist
        const findCookie = req.body.cookie
        const foundAccountCookie = await AccountFacebook.find({ 'cookie': findCookie })
        if (foundAccountCookie.length > 0) return res.status(404).json(JsonResponse('Account using this cookie is exist!', null))
        const foundUser = await Account.findById(userId)
        if (!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
        const newAccountFacebook = await new AccountFacebook(req.body)
        let data = {}
        loginFacebook({ appState: defineAgainCookie }, (err, api) => {
          if (err) return console.error(err)
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
              res.status(200).json(JsonResponse('Add account facebook using cookie successfull!', data))
            }
          })
        })
        foundUser._accountfb.push(newAccountFacebook._id)
        await foundUser.save()
        break
      }
      case 'normal': {
        // check acount facebook using email, password is exist
        const findEmail = req.body.email
        const foundAccountEmail = await AccountFacebook.find({ 'email': findEmail })
        if (foundAccountEmail.length > 0) return res.status(404).json(JsonResponse('Account using this email is exist!', null))

        const newAccountFacebook = await new AccountFacebook(req.body)
        let data = {}
        loginFacebook({ email: req.body.email, password: req.body.password }, async (err, api) => {
          if (err) return console.error(err)
          let myID = await api.getCurrentUserID()
          // check acount facebook using cookie and email, password is loop
          const findAccountId = myID
          const foundAccountId = await AccountFacebook.find({ 'userInfo.id': findAccountId })
          if (foundAccountId.length > 0) return res.status(404).json(JsonResponse('Account facebook is exist!', null))
          api.getUserInfo(myID, async (err, ret) => {
            if (err) return console.error(err)
            else {
              data = Object.values(ret)[0]
              newAccountFacebook.userInfo = {
                id: myID,
                name: data.name,
                thumbSrc: data.thumbSrc,
                profileUrl: data.profileUrl
              }
              await newAccountFacebook.save()
              res.status(200).json(JsonResponse('Add account facebook using email, password successfull!', Object.values(ret)[0]))
            }
          })
        })
        const foundUser = await Account.findById(userId)
        if (!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
        foundUser._accountfb.push(newAccountFacebook._id)
        await foundUser.save()
        break
      }
    }
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
    if (!foundUser) return res.status(403).json(JsonResponse('You are not authorities delete!', null))
    const findAccountFb = await AccountFacebook.findById(id)
    if (!findAccountFb) return res.status(403).json(JsonResponse('You have not this accountfb!', null))
    await findAccountFb.remove()
    foundUser._accountfb.pull(findAccountFb._id)
    await foundUser.save()
    res.status(200).json(JsonResponse('Delete account facebook success! T_T', null))
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
    if (!foundUser) return res.status(403).json(JsonResponse('You are not authorities delete!', null))
    const findAccountFb = await AccountFacebook.findById(id)
    if (!findAccountFb) return res.status(403).json(JsonResponse('You have not this accountfb!', null))
  }
}
