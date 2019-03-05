const MessageFacebook = require('../models/MessageFacebook.model')
const AccountFacebook = require('../models/AccountFacebook.model')
const Account = require('../models/Account.model')
const Script = require('../models/Scripts.model')
const AlternateName = require('../models/AlternateName.model')
const TagVariable = require('../models/TagVariable.model')

const JsonResponse = require('../configs/res')
let api = ''

const create = async (data, res) => {
  let dataSave = {}
  const { api, userId, fbId, idReceiver, msg, ref } = data
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
  if (Object.values(rel).indexOf(true) === -1) {
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
    foundConversationMess.contentMessage.push({
      body: msg,
      timeStamp: new Date(),
      reference: ref
    })
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
    conversation.contentMessage.push({
      body: msg,
      timeStamp: new Date(),
      reference: ref
    })
    await conversation.save()
    return res
      .status(200)
      .json(JsonResponse('Create message successfully!', conversation))
  }
}

module.exports = {
  chat: (socket, res) => {
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
        // userId: data.userId,
        userId: '5c7ce25a14693e33205cd825',
        // fbId: data.fbId,
        fbId: '5c7ce66c3cfb8c2f6cf74991',
        idReceiver: message.senderID,
        msg: message.body,
        ref: 2
      }
      socket.emit('listen-send', data)
      create(data, res)
    })

    socket.on('send', dt => {
      console.log(dt)
      api.sendMessage(dt.text, dt.id, err => {
        if (err) return
        const data = {
          api: api,
          // userId: data.userId,
          userId: '5c7ce25a14693e33205cd825',
          // fbId: data.fbId,
          fbId: '5c7ce66c3cfb8c2f6cf74991',
          idReceiver: dt.id,
          msg: dt.text,
          ref: 2
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
    res.send('ss')
    api.listen(async (err, message) => {
      console.log('message', message)
      if (err) console.error(err)
      const data = {
        api: api,
        // userId: data.userId,
        userId: '5c7ce25a14693e33205cd825',
        // fbId: data.fbId,
        fbId: '5c7ce66c3cfb8c2f6cf74991',
        idReceiver: message.senderID,
        msg: message.body,
        ref: 2
      }
      create(data, res)
      // find script to feedback
      const foundScript = await Script.findOne({
        name: message.body,
        _ownerFb: data.fbId,
        _owner: data.userId
      })
      if (foundScript) {
        const arr = foundScript.contents
        const arrData = ['Chào', 'at_danhxung', 'at_xinchao', 'at_bo', 'yêu dấu']
        let arrayTag = null

        arrayTag = await arrData.filter(
          x => x.match(/^.{0,3}/).toString() === 'at_'
        )
        const testArr = arrayTag.map(async (value, index, array) => {
          let tag = null
          if (value.substring(3) === 'danhxung') {
            const foundAlternateName = await AlternateName.find({
              _owner: data.userId,
              _ownerFb: data.fbId
            })
            const resultMap = foundAlternateName.map(
              async (value, index, array) => {
                if (value.friends.includes(message.senderID) === true) {
                  tag = value.name
                  return tag
                } else return res.send('not exist!')
              }
            )
            Promise.all(resultMap)
              .then(data => {
                tag = data[0]
              })
              .catch(err => console.log(err))
            return tag
          } else {
            const foundTagVariable = await TagVariable.findOne({
              nameKey: value.substring(3)
            })
            if (!foundTagVariable) return
            tag = foundTagVariable.valueKey
            return tag
          }
        })
        Promise.all(testArr)
          .then(completed => {
            arrData.map((value, index, array) => {
              if (arrData[index].match(/^.{0,3}/).toString() === 'at_') {
                console.log(arrData[index])
                // completed.map((v, i, a) => {
                //   arrData.splice(index, 0, completed[i])
                // })
              }
            })
            console.log(arrData)
            console.log(completed)
          })
          .catch(err => console.log(err))
        await arr.forEach(async element => {
          if (element.typeScript === 'tag') {
          }
          await api.sendMessage(element.contentValue, message.senderID)
        })
      }
    })
  }
}
