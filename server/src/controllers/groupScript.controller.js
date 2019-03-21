/**
 * Controller scripts for project
 * author: hocpv
 * date up: 26/02/2019
 * date to: ___
 * team: BE-RHP
 */
const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const Script = require('../models/Scripts.model')
const GroupScript = require('../models/GroupScript.model')

const JsonResponse = require('../configs/res')

module.exports = {
  /**
   *  get all ScriptGroup & script by Id
   *  @param req
   *  @param res
   *
   */
  index: async (req, res) => {
    const dataFound = await GroupScript.find(req.query)
    if (!dataFound) return res.status(403).json(JsonResponse('Data is not found!', null))
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },
  /**
   *  create script group by user
   *  @param req
   *  @param res
   *
   */
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
    if (Object.values(rel).indexOf(true) === -1) {
      return res.status(403).json(JsonResponse('Account not exist this facebook Id!', null))
    }
    const foundAccountFb = await AccountFacebook.findById(fbId)
    if (!foundAccountFb) {
      return res
        .status(403)
        .json(JsonResponse('Account facebook not exist!', null))
    }
    // create group default for user
    const foundDefaultGroup = await GroupScript.findOne({ 'name': 'default', '_ownerFb': fbId, '_owner': userId })
    if (!foundDefaultGroup) {
      const defaultGroup = await new GroupScript()
      defaultGroup.name = 'default'
      defaultGroup._ownerFb = fbId
      defaultGroup._owner = userId
      await defaultGroup.save()
    }
    const name = req.body.name
    const foundGroupScript = await GroupScript.findOne({ 'name': name, '_ownerFb': fbId, '_owner': userId })
    if (foundGroupScript) return res.status(403).json(JsonResponse('Group Script of account facebook is exist!', null))
    const newGroupScript = await new GroupScript(req.body)
    newGroupScript._ownerFb = fbId
    newGroupScript._owner = userId
    newGroupScript.name = name
    await newGroupScript.save()
    res.status(200).json(JsonResponse('Create Group Script Succesfull', newGroupScript))
  },
  /**
   *  update script by user
   *  @param req
   *  @param res
   *
   */
  update: async (req, res) => {
    const {
      body,
      query
    } = req
    if (!query._user) return res.status(405).json(JsonResponse('Not authorized!', null))
    const foundUser = await Account.findById(query._user)
    if (!foundUser) return res.status(403).json(JsonResponse('User is not found!', null))
    if (JSON.stringify(query._user) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    const dataGroupScriptUpdated = await GroupScript.findByIdAndUpdate(query._groupId, {
      $set: body
    }, {
      new: true
    })
    res.status(201).json(JsonResponse('Update group successfull!', dataGroupScriptUpdated))
  },
  /**
   *  delete script by user
   *  @param req
   *  @param res
   *
   */
  delete: async (req, res) => {
    const userId = req.query._user
    const groupId = req.query._groupId
    const fbId = req.query._fbId

    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) { return res.status(403).json(JsonResponse('User is not exist!', null)) }
    if (!req.query._type) {
      const foundGroupScript = await GroupScript.findById(groupId)
      foundGroupScript._scripts.map(async (value, index, array) => {
        const foundScript = await Script.findById(value)
        foundScript._group = ''
        await foundScript.save()
      })
    }
    if (req.query._type === 'default') {
      const foundDefaultGroup = await GroupScript.findOne({ 'name': 'default', '_ownerFb': fbId, '_owner': userId })
      const foundGroupScript = await GroupScript.findById(groupId)
      foundGroupScript._scripts.map(async (value, index, array) => {
        const foundScript = await Script.findById(value)
        foundScript._group = foundDefaultGroup._id
        foundDefaultGroup._scripts.push(value)
        await foundDefaultGroup.save()
        await foundScript.save()
      })
    }
    await GroupScript.findByIdAndRemove(groupId)
    res.status(200).json(JsonResponse('Delete group script successfull!', null))
  }
}
