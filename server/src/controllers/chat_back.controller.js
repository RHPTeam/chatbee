const MessageFacebook = require('../models/MessageFacebook.model')
const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const JsonResponse = require('../configs/res')
let api = ''
let res = ''

const create = async (data, res) => {
  let dataSave = {}
  console.log('data', data)
  const { api, userId, fbId, idReceiver, msg } = data
  // const userId = req.query._user
  // const fbId = req.query._fbId
  const foundUser = await Account.findById(userId).select('-password')
  if (!foundUser) {
    return res.status(403).json(JsonResponse('User is not exist!', null))
  }
  // check account facebook has exist in account user
  const fbAccount = foundUser._accountfb
  const rel = fbAccount.map((value, index, array) => {
    if (fbAccount[index].toString() === fbId) {
      return true
    } else return false
  })
  if (Object.values(rel).indexOf(true) !== 1) {
    return res
      .status(403)
      .json(JsonResponse('Account not exist this facebook Id!', null))
  }
  const foundAccountFb = await AccountFacebook.findById(fbId)
  if (!foundAccountFb) {
    return res
      .status(403)
      .json(JsonResponse('Account facebook not exist!', null))
  }

  // const idReceiver = req.body.idReceiver
  // const msg = req.body.content

  const foundConversation = await MessageFacebook.find({
    _ownerFb: fbId,
    _owner: userId
  })
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
  if (foundConversation.length > 0 && foundConversationMess !== null) {
    foundConversationMess.contentMessage.push({body:msg})
    await foundConversationMess.save()
    return res
      .status(200)
      .json(JsonResponse('Create message successfully!', foundConversationMess))
  } else {
    const conversation = await new MessageFacebook()
    conversation._owner = userId
    conversation._ownerFb = fbId
    conversation.sender = {
      id: foundAccountFb.userInfo.id,
      name: foundAccountFb.userInfo.name,
      url: foundAccountFb.userInfo.profileUrl
    }
    api.getUserInfo(idReceiver, async (err, ret) => {
      if (err) return console.error(err)
      dataSave = Object.values(ret)[0]
      conversation.receiver = {
        id: idReceiver,
        name: dataSave.name,
        url: dataSave.profileUrl,
        image: dataSave.thumbSrc
      }
      await conversation.save()
    })
    conversation.potentialCustomer.push(idReceiver)
    conversation.contentMessage.push({msg:body})
    await conversation.save()
    return res
      .status(200)
      .json(JsonResponse('Create message successfully!', conversation))
  }
}

module.exports = {
  chat: socket => {
    if (!api || api === '' || api === null) return
    api.listen((err, message) => {
      console.log('message', message)
      if (err) return
      // const data = {
      //   text: message.body,
      //   threadID: message.threadID,
      //   timestamp: message.timestamp,
      //   isGroup: message.isGroup
      // }
      const data = {
        api: api,
        idReceiver: message.threadID,
        msg: message.body
      }
      socket.emit('listen-send', data)
    })

    socket.on('send', dt => {
      console.log(dt)
      api.sendMessage(dt.text, dt.id, err => {
        if (err) return
        const data = {
          api: api,
          // userId: data.userId,
          userId: '5c6a8616dba3d2299001be9d',
          // fbId: data.fbId,
          fbId: '5c6b7c8d5a659d3aa8d15954',
          idReceiver: dt.id,
          msg: dt.text
        }
        create(data, res)
      })
    })
  },
  getAPI: (res, result) => {
    if (!result) {
      res.send('false')
    }
    api = result
    res = res
    res.send('ss')
  }
}
