/**
 * Controller  for project
 * author: hocpv
 * date up: 04/03/2019
 * date to: ___
 * team: BE-RHP
 */
const AlternateName = require('../models/AlternateName.model')
const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')

const JsonResponse = require('../configs/res')

module.exports = {
  /**
   * get all alternate name, get alternate name by id
   * @param req
   * @param res
   */
  index: async (req, res) => {
    const dataFound = await AlternateName.find(req.query)
    if (!dataFound) return res.status(403).json(JsonResponse('Data is not found!', null))
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },
  /**
   * create alternate name
   * @param req
   * @param res
   */
  create: async (req, res) => {
    const foundUser = await Account.findById(req.query._user).select('-password')
    if (!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
    // check account facebook has exist in account user
    const fbAccount = foundUser._accountfb
    const rel = fbAccount.map((value, index, array) => {
      if (fbAccount[index].toString() === req.query._fbId) {
        return true
      } else return false
    })
    if (Object.values(rel).indexOf(true) === -1) {
      return res.status(403).json(JsonResponse('Account not exist this facebook Id!', null))
    }
    const foundAccountFb = await AccountFacebook.findById(req.query._fbId)
    if (!foundAccountFb) {
      return res
        .status(403)
        .json(JsonResponse('Account facebook not exist!', null))
    }
    const foundAlternateName = await AlternateName.findOne({ 'name': req.body.name, '_ownerFb': req.query._fbId })
    if (foundAlternateName) return res.status(200).json(JsonResponse('Alternate name is already exist!', null))

    const newAlternateName = await new AlternateName(req.body)
    newAlternateName.friends.push(req.body.idFriend)
    newAlternateName._ownerFb = req.query._fbId
    newAlternateName._owner = req.query._user
    await newAlternateName.save()
    res.status(200).json(JsonResponse('Create Alternate Name Successful!', newAlternateName))
  },
  /**
   * update alternate name
   * @param req
   * @param res
   */
  update: async (req, res) => {
    if (!req.query._user) return res.status(405).json(JsonResponse('Not authorized!', null))
    const foundUser = await Account.findById(req.query._user)
    if (!foundUser) return res.status(403).json(JsonResponse('User is not found!', null))
    if (JSON.stringify(req.query._user) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    const foundAlternateName = await AlternateName.findById(req.query._alterId)
    if (!foundAlternateName) return res.status(403).json(JsonResponse('Alternate name is not found!', null))
    const foundIdFriend = foundAlternateName.friends.filter(x => x === req.body.idFriend)
    if (req.body.idFriend) {
      if (foundIdFriend.length > 0) {
        return res.status(403).json(JsonResponse('Id Friend is already exist in alternate name!', null))
      }
      foundAlternateName.name = req.body.name
      foundAlternateName.friends.push(req.body.idFriend)
      await foundAlternateName.save()
      return res.status(201).json(JsonResponse('Update alternate name successfull!', foundAlternateName))
    }
    foundAlternateName.name = req.body.name
    await foundAlternateName.save()
    res.status(201).json(JsonResponse('Update alternate name successfull!', foundAlternateName))
  },
  /**
   * delete alternate name
   * @param req
   * @param res
   */
  delete: async (req, res) => {
    const foundUser = await Account.findById(req.query._user).select('-password')
    if (!foundUser) { return res.status(403).json(JsonResponse('User is not exist!', null)) }
    await AlternateName.findByIdAndRemove(req.query._alterId)
    res.status(200).json(JsonResponse('Delete alternate name successfull!', null))
  }
}
