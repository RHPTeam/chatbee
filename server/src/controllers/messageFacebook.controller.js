/**
 * Controller socket messenger facebook for project
 * author: hocpv
 * date up: 19/02/2019
 * date to: ___
 * team: BE-RHP
 */

const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const MessageFacebook = require('../models/MessageFacebook.model')

const JsonResponse = require('../configs/res')

module.exports = {
  /**
   * get all conversation
   *  @param req
   *  @param res
   *
   */
  index: async (req, res) => {
    const dataFound = await MessageFacebook.find(req.query)
    if (!dataFound) return res.status(403).json(JsonResponse('Data is not found!', null))
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },
  /**
   * Create conversation with friends
   * @param req
   * @param res
   *
   */
  create: async (api, req, res) => {
    let data = {}
    const userId = req.query._user
    const fbId = req.query._fbId
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) { return res.status(403).json(JsonResponse('User is not exist!', null)) }
    // check account facebook has exist in account user
    const fbAccount = foundUser._accountfb
    const rel = fbAccount.map((value, index, array) => {
      if (fbAccount[index].toString() === fbId) {
        return true
      } else return false
    })
    if (Object.values(rel).indexOf(true) !== 1) {
      return res.status(403).json(JsonResponse('Account not exist this facebook Id!', null))
    }
    const foundAccountFb = await AccountFacebook.findById(fbId)
    if (!foundAccountFb) {
      return res
        .status(403)
        .json(JsonResponse('Account facebook not exist!', null))
    }

    const idReceiver = req.body.idReceiver
    const msg = req.body.content

    const foundConversation = await MessageFacebook.find({ _ownerFb: fbId, _owner: userId })
    let foundConversationMess = {}
    foundConversation.map((value, index, array) => {
      if (value.receiver.id === idReceiver) {
        foundConversationMess = value
        return foundConversationMess
      } else {
        foundConversationMess = null
        return foundConversationMess
      }
    })
    if ((foundConversation.length > 0) && (foundConversationMess !== null)) {
      foundConversationMess.contentMessage.push({ body: msg })
      await foundConversationMess.save()
      api.sendMessage(msg, idReceiver)
      return res.status(200).json(JsonResponse('Create message successfully!', foundConversationMess))
    } else {
      api.sendMessage(msg, idReceiver)
      const conversation = await new MessageFacebook(req.body)
      conversation._owner = userId
      conversation._ownerFb = fbId
      conversation.sender = {
        id: foundAccountFb.userInfo.id,
        name: foundAccountFb.userInfo.name,
        url: foundAccountFb.userInfo.profileUrl
      }
      api.getUserInfo(idReceiver, async (err, ret) => {
        if (err) return console.error(err)
        data = Object.values(ret)[0]
        conversation.receiver = {
          id: idReceiver,
          name: data.name,
          url: data.profileUrl,
          image: data.thumbSrc
        }
        await conversation.save()
      })
      conversation.potentialCustomer.push(idReceiver)
      conversation.contentMessage.push({ body: msg })
      await conversation.save()
      return res.status(200).json(JsonResponse('Create message successfully!', conversation))
    }
  },
  update: async (api, req, res) => {
    api.listen((err, message) => {
      if (err) return console.error(err)
      // Ignore empty messages (photos etc.)
      // if (typeof message.body === 'string') {
      //   api.sendMessage(message.body, message.threadID)
      // }
      api.sendMessage(message.body, message.threadID)
      console.log(message)
    })
  },
  /**
   * delete conversation
   * @param req
   * @param res
   *
   */
  delete: async (req, res) => {
    const userId = req.query._user
    const threadId = req.query._threadId
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) { return res.status(403).json(JsonResponse('User is not exist!', null)) }
    await MessageFacebook.findByIdAndRemove(threadId)
    res.status(200).json(JsonResponse('Delete conversation successfull!', null))
  }
}
