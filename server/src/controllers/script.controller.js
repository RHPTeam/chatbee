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
   *  get all Script & script by Id
   *  @param req
   *  @param res
   *
   */
  index: async (req, res) => {
    const dataFound = await Script.find(req.query)
    if (!dataFound) return res.status(403).json(JsonResponse('Data is not found!', null))
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },
  /**
   *  create script by user
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
    if (Object.values(rel).indexOf(true) !== 1) {
      res.status(403).json(JsonResponse('Account not exist this facebook Id!', null))
    }
    const foundAccountFb = await AccountFacebook.findById(fbId)
    if (!foundAccountFb) {
      return res
        .status(403)
        .json(JsonResponse('Account facebook not exist!', null))
    }

    const nameScript = req.body.name
    const text = req.body.text
    const typeScript = req.body.type
    const groupId = req.body.groupId

    const foundGroupScript = await GroupScript.findById(groupId)
    if (!foundGroupScript) return res.status(403).json(JsonResponse('Group Script is not exist!', null))
    const foundScript = await Script.findOne({ 'name': nameScript, '_ownerFb': fbId })
    if (foundScript) {
      // check exist button script
      if ((foundScript.contents.filter(x => x.text === text).length) > 0) return res.status(403).json(JsonResponse('Button has exist in this script!', null))
      foundScript.contents.push({ text: text, typeScript: typeScript })
      await foundScript.save()
      res.status(200).json(JsonResponse('Create button script successful!', foundScript))
    } else {
      const newScript = await new Script(req.body)
      const content = {
        text: text,
        typeScript: typeScript
      }
      newScript._ownerFb = fbId
      newScript._group = groupId
      newScript.contents.push(content)
      await newScript.save()
      foundGroupScript._scripts.push(newScript._id)
      await foundGroupScript.save()
      res.status(200).json(JsonResponse('Create script successful!', newScript))
    }
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
    if (!query._buttonId) {
      // check user change group script
      const dataScriptUpdated = await Script.findById(query._scriptId)
      if (dataScriptUpdated._group) {
        const foundCurrentGroup = await GroupScript.findById(dataScriptUpdated._group)
        foundCurrentGroup._scripts.pull(dataScriptUpdated._id)
        await foundCurrentGroup.save()
      }

      const foundUpdateGroup = await GroupScript.findById(req.body.groupId)
      if (!foundUpdateGroup) return res.status(403).json(JsonResponse('Group Script is not exist!', null))
      foundUpdateGroup._scripts.push(dataScriptUpdated._id)
      await foundUpdateGroup.save()
      dataScriptUpdated.name = req.body.name
      dataScriptUpdated._group = req.body.groupId
      await dataScriptUpdated.save()
      res.status(201).json(JsonResponse('Update script successfull!', dataScriptUpdated))
    } else {
      const foundScript = await Script.findById(query._scriptId)
      const findButton = foundScript.contents.filter(x => x.id === query._buttonId)[0]
      if (typeof findButton === 'undefined') return res.status(403).json(JsonResponse('Button is not exist !', null))
      if (foundScript._group) {
        const foundCurrentGroup = await GroupScript.findById(foundScript._group)
        foundCurrentGroup._scripts.pull(foundScript._id)
        await foundCurrentGroup.save()
      }
      const foundUpdateGroup = await GroupScript.findById(req.body.groupId)
      if (!foundUpdateGroup) return res.status(403).json(JsonResponse('Group Script is not exist!', null))
      foundUpdateGroup._scripts.push(foundScript._id)
      await foundUpdateGroup.save()

      findButton.text = req.body.text
      findButton.typeScript = req.body.type

      foundScript.name = req.body.name
      foundScript._group = req.body.groupId

      await foundScript.save()
      res.status(201).json(JsonResponse('Update script button successfull!', foundScript))
    }
  },
  /**
   *  delete script by user
   *  @param req
   *  @param res
   *
   */
  delete: async (req, res) => {
    const userId = req.query._user
    const scriptId = req.query._scriptId
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) { return res.status(403).json(JsonResponse('User is not exist!', null)) }
    const foundScript = await Script.findById(scriptId)
    const foundGroupScript = await GroupScript.findById(foundScript._group)
    foundGroupScript._scripts.pull(foundScript._id)
    await foundGroupScript.save()
    await Script.findByIdAndRemove(scriptId)
    res.status(200).json(JsonResponse('Delete script successfull!', null))
  }
}
