/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 15/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const Message = require('../models/Messages.model')
const Facebook = require('../models/Facebook.model')
const Friend = require('../models/Friends.model')
const Block = require('../models/Blocks.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const CronJob = require('cron').CronJob

let objData
let api = ''
module.exports = {
  /**
   * Get all(id) broadcast
   * @param: req
   * @param: res
   */
  index: async (req, res) => {
    let dataResponse = null
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    if (DecodeRole(role, 10) === 0) {
      !req.query._id ? dataResponse = await Message.find({'_account': userId}) : dataResponse = await Message.find({
        '_id': req.query._id,
        '_account': userId
      })
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Message.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   * Create conversation
   * @param: req
   * @param: res
   */
  create: async (socket, apiRes, data) => {
    api = apiRes
    objData = data
    const newMessage = await new Message()
    socket.on('send', async dataRes => {
      const foundFriend = await Friend.findById(dataRes.id)
      api.sendMessage(dataRes.content, foundFriend.userID, async err => {
        if (err) console.error(err)
        const foundConversation = await Message.findOne({'_receiver': dataRes.id, '_account': objData._account})
        if (!foundConversation) {
          //with message type image
          if (objData.typeData === true) {
            newMessage.contents.push({'typeContent': 'image', 'valueContent': dataRes.content, reference: 2})
            newMessage._account = objData._account
            newMessage._sender = objData._sender
            newMessage._receiver = dataRes.id
            await newMessage.save()
          }
          newMessage.contents.push({'typeContent': 'text', 'valueContent': dataRes.content, reference: 2})
          newMessage._account = objData._account
          newMessage._sender = objData._sender
          newMessage._receiver = dataRes.id
          await newMessage.save()
        } else {
          if (objData.typeData === true) {
            foundConversation.contents.push({'typeContent': 'image', 'valueContent': dataRes.content, reference: 2})
            await foundConversation.save()
          }
          foundConversation.contents.push({'typeContent': 'text', 'valueContent': dataRes.content, reference: 2})
          await foundConversation.save()
        }
      })
    })

    // listen message send from customer
    api.listen(async (err, message) => {
      if (err) console.error(err)
      console.log(message)
      socket.emit('listen-send', message.body)
      const foundFriend = await Friend.find({'userID': message.senderID, '_account': objData._account})
      const foundAllBlock = await Block.find({ '_account': objData._account})
      const foundBlock = foundAllBlock.find(val => ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(message.body).toString().toLowerCase())
      const foundConversation = await Message.find({'_receiver': foundFriend[0]._id, '_account': objData._account})
      console.log(foundConversation.length)
      const foundConverStrang = await Message.find({'stranger': {'id': message.senderID}, '_account': objData._account})
      const newMessage = await new Message()

      // Case 1: message from stranger and you accept see on facebook but not reply
      if (foundFriend.length === 0 && foundConverStrang.length === 0) {
        let dataStranger
        api.getUserInfo(message.senderID, async (err, ret) => {
          if (err) return console.log(err)
          dataStranger = Object.values(ret)[0]
          if (message.attachments.length !== 0){
            if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
              newMessage.stranger = {
                id: message.senderID,
                name: dataStranger.name,
                url: dataStranger.profileUrl,
                image:  dataStranger.thumbSrc
              }
              newMessage.contents.push({'typeContent': 'image', 'valueContent':message.body, reference: 1})
              newMessage._account = objData._account
              newMessage._sender = objData._sender
              await newMessage.save()
            }
          } else {
            newMessage.stranger = {
              id: message.senderID,
              name: dataStranger.name,
              url: dataStranger.profileUrl,
              image:  dataStranger.thumbSrc
            }
            newMessage.contents.push({'typeContent': 'text', 'valueContent':message.body, reference: 1})
            newMessage._account = objData._account
            newMessage._sender = objData._sender
            await newMessage.save()
            // case in script
            if (foundBlock !== undefined) {
              foundBlock.contents.map( async val => {
                api.sendMessage(val.valueText, message.senderID, async err =>{
                  if (err) console.log(err)
                  if (val.typeContent === 'image'){
                    newMessage.contents.push({'typeContent': 'image', 'valueContent':val.valueText, reference: 2})
                    await newMessage.save()
                  } else {
                    newMessage.contents.push({'typeContent': 'text', 'valueContent':val.valueText, reference: 2})
                    await newMessage.save()
                  }
                })
              })
            }
          }
        })
      }
      //case 2: message from stranger and you accept see on facebook and able to reply
      else if (foundFriend.length === 0 && foundConverStrang.length === 1){
        if (message.attachments.length !== 0){
          if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
            foundConverStrang[0].contents.push({'typeContent': 'image', 'valueContent':message.body, reference: 1})
            await foundConverStrang[0].save()
          }
        } else {
          foundConverStrang[0].contents.push({'typeContent': 'text', 'valueContent':message.body, reference: 1})
          await foundConverStrang[0].save()
          // case in script
          if (foundBlock !== undefined) {
            foundBlock.contents.map( async val => {
              api.sendMessage(val.valueText, message.senderID, async err =>{
                if (err) console.log(err)
                if (val.typeContent === 'image'){
                  foundConverStrang[0].contents.push({'typeContent': 'image', 'valueContent':val.valueText, reference: 2})
                  await foundConverStrang[0].save()
                } else {
                  foundConverStrang[0].contents.push({'typeContent': 'text', 'valueContent':val.valueText, reference: 2})
                  await foundConverStrang[0].save()
                }
              })
            })
          }
        }
      }
      //case 3: message from friend and not able to reply
      else if (foundFriend.length === 1 && foundConversation.length === 0){
        if (message.attachments.length !== 0){
          if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
            newMessage.contents.push({'typeContent': 'image', 'valueContent':message.body, reference: 1})
            newMessage._account = objData._account
            newMessage._sender = objData._sender
            newMessage._receiver = message.senderID
            await newMessage.save()
          }
        } else {
          newMessage.contents.push({'typeContent': 'text', 'valueContent':message.body, reference: 1})
          newMessage._account = objData._account
          newMessage._sender = objData._sender
          newMessage._receiver = message.senderID
          await newMessage.save()
          // case in script
          if (foundBlock !== undefined) {
            foundBlock.contents.map( async val => {
              api.sendMessage(val.valueText, message.senderID, async err =>{
                if (err) console.log(err)
                if (val.typeContent === 'image'){
                  newMessage.contents.push({'typeContent': 'image', 'valueContent':val.valueText, reference: 2})
                  await newMessage.save()
                } else {
                  newMessage.contents.push({'typeContent': 'text', 'valueContent':val.valueText, reference: 2})
                  await newMessage.save()
                }
              })
            })
          }
        }
      }
      //case 4: message from friend and able to reply
      else if (foundFriend.length === 1 && foundConversation.length === 1){
        if (message.attachments.length !== 0){
          if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
            foundConversation[0].contents.push({'typeContent': 'image', 'valueContent':message.body, reference: 1})
            await foundConversation[0].save()
          }
        } else {
          foundConversation[0].contents.push({'typeContent': 'text', 'valueContent':message.body, reference: 1})
          await foundConversation[0].save()
          // case in script
          if (foundBlock !== undefined) {
            await foundBlock.contents.map( async val => {
              api.sendMessage(val.valueText, message.senderID, async err =>{
                if (err) console.log(err)
                if(val.typeContent) {
                  if (val.typeContent === 'image'){
                    foundConversation[0].contents.push({'typeContent': 'image', 'valueContent':val.valueText, reference: 2})
                    await foundConversation[0].save()
                  } else {
                    foundConversation[0].contents.push({'typeContent': 'text', 'valueContent':val.valueText, reference: 2})
                    await foundConversation[0].save()
                  }
                }
              })
            })
          }
        }
      }
    })
  },

  /**
   * Delete conversation
   * @param: req
   * @param: res
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    await Message.findByIdAndRemove(req.query._threadId)
    res.status(200).json(JsonResponse('Xóa cuộc hội thoại thành công!', null))
  },
}
