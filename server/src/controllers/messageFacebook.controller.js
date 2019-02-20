/**
 * Controller socket messenger facebook for project
 * author: hocpv
 * date up: 19/02/2019
 * date to: ___
 * team: BE-RHP
 */

const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const Friends = require('../models/FriendsFacebook.model')

const JsonResponse = require('../configs/res')

module.exports = {
  /**
   * get all conversation
   *
   */
  index: async (req, res) => {
    const userId = req.query._user
    const foundAccount = await AccountFacebook.findById(userId) 
    if (!foundAccount) return res.status(200).json(JsonResponse('User is not exist!', null))

  },
  /**
   * 
   * 
   */
  create: async (req, res) => {
    const userId = req.query._user
    const foundAccount = await AccountFacebook.findById(userId) 
    if (!foundAccount) return res.status(200).json(JsonResponse('User is not exist!', null))

  }
}
