/**
 * Controller facebook account for project
 * author: Tran Toan
 * date up: 08/02/2019
 * date to: ___
 * team: BE-RHP
 */

const loginFacebook = require('facebook-chat-api')
const AccountFacebook = require('../models/AccountFacebook.model')
const fs = require('fs')

const JsonResponse = require('../configs/res')
const CookieFacebook = require('../configs/cookieFacebook')
const ConvertCookieToObject = require('../helpers/util/cookie.util')

module.exports = {
  create: async (req, res) => {
    const addAccountType = req.query._type
    switch (addAccountType) {
      case 'cookie': {
        const result = ConvertCookieToObject(req.body.cookie)[0]
        console.log(result)
        const defineAgainCookie = CookieFacebook(result.fr, result.datr, result.c_user, result.xs)
        console.log(defineAgainCookie)
        loginFacebook({ appState: defineAgainCookie }, (err, api) => {
          if (err) return console.error(err)
          api.getUserInfo(result.c_user, (err, ret) => {
            if(err) return console.error(err);
            console.log(ret);
          });
        })
        break
      }
      case 'normal': {
        loginFacebook({ email: 'trantoan.960', password: 'Foxchasingcat96' }, (err, api) => {
          if (err) return console.error(err)
          api.getUserInfo([1, 2, 3, 4], (err, ret) => {
            if(err) return console.error(err);

            console.log(ret);
          });
        })
        break
      }
    }
  }
}
