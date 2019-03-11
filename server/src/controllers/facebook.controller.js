/**
 * Controller facebook for project
 * author: hocpv
 * date up: 08  /03/2019
 * date to: ___
 * team: BE-RHP
 */
const FacebookChatApi = require('facebook-chat-api')
const Account = require('../models/Account.model')

const JsonResponse = require('../configs/res')
const CookieFacebook = require('../configs/cookieFacebook')
const ConvertCookieToObject = require('../helpers/util/cookie.util')

// function global get api facebook
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
  /**
   * Get all(or by ID) account facebook 
   * @param req
   * @param res
   * 
   */
  index: async (req, res) => {

  },
  /**
   * create account facebook 
   * @param req
   * @param res
   * 
   */
  create: async (req, res) => {

  },
  /**
   * Get all(or by ID) account facebook 
   * @param req
   * @param res
   * 
   */
  update: async (req, res) => {

  },
  /**
   * Get all(or by ID) account facebook 
   * @param req
   * @param res
   * 
   */
  delete: async (req, res) => {

  },
}