/**
 * Controller socket messenger facebook for project
 * author: hocpv
 * date up: 27/02/2019
 * date to: ___
 * team: BE-RHP
 */

const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const TagVariable = require('../models/TagVariable.model')

const JsonResponse = require('../configs/res')

module.exports = {
  index: async (req, res) => {
    const dataFound = await TagVariable.find(req.query)
    if (!dataFound) return res.status(403).json(JsonResponse('Data is not found!', null))
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },
  create: async (req, res) => {
    const userId = req.query._user
    const fbId = req.query._fbId
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
    // check account facebook has exist in account user
    const fbAccount = foundUser._accountfb
    const rel = fbAccount.map((value, index, array) => {
      if (fbAccount[index].toString() === fbId) {
        return true
      } else return false
    })
    if (Object.values(rel).indexOf(true) !== 1) {
      res.status(403).json(JsonResponse('Account not exist this facebook Id!', null))
    }
    const foundAccountFb = await AccountFacebook.findById(fbId)
    if (!foundAccountFb) {
      return res
        .status(403)
        .json(JsonResponse('Account facebook not exist!', null))
    }
    const nameKey = req.body.nameKey
    const valueKey = req.body.valueKey
    const newTagVariable = await new TagVariable(req.body)
    newTagVariable.nameKey = nameKey
    newTagVariable.valueKey = valueKey
    await newTagVariable.save()
    res.status(200).json(JsonResponse('Create Tag Variable Successful!', newTagVariable))
  },
  update: async (req, res) => {
    const {
      body,
      query
    } = req
    if (!query._user) return res.status(405).json(JsonResponse('Not authorized!', null))
    const foundUser = await Account.findById(query._user)
    if (!foundUser) return res.status(403).json(JsonResponse('User is not found!', null))
    if (JSON.stringify(query._user) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    const dataTagUpdated = await TagVariable.findByIdAndUpdate(query._tagId, {
      $set: body
    }, {
      new: true
    })
    res.status(201).json(JsonResponse('Update tag successfull!', dataTagUpdated))
  },
  delete: async (req, res) => {
    const userId = req.query._user
    const tagId = req.query._tagId
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) { return res.status(403).json(JsonResponse('User is not exist!', null)) }
    await TagVariable.findByIdAndRemove(tagId)
    res.status(200).json(JsonResponse('Delete tag successfull!', null))
  }
}
