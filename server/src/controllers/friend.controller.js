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
const CookieFacebook = require('../configs/cookieFacebook')
const ConvertCookieToObject = require('../helpers/util/cookie.util')
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

  },
  create: async (api, req, res) => {
    // get all friend list and save to db friends
    api.getFriendsList(async (err, dataRes) => {
      if (err) return console.error(err)
      dataRes.map(async (dataResItem, index, dataRes) => {
        const foundIdFriend = Friend.findOne({ 'userID': dataResItem.userID })
        console.log(typeof  foundIdFriend._facebook)
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
          _facebook: []
        }
        listFriendInfo._facebook.push(result.c_user)
        const friend = await new Friend(listFriendInfo)
        await  friend.save()
      })
    })
  },
  update: async (req, res) => {

  },
  delete: async (req, res) => {

  }
}