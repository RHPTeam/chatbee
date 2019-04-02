const Message = require('../models/Messages.model')
const Friend = require('../models/Friends.model')
const ErrorText = require('../configs/errors')
const config = require('../configs/configs');
const fs = require('fs')

module.exports = {
  // Handle message when vocative and script
  handleMessage: async (data, account, api) => {
    return new Promise(async (resolve,reject)=> {
      // Check if message of account and receiver
      console.log(account)
      console.log("========")
      console.log(data)
      if (account._account.toString() === data._account.toString() && account._id.toString() === data._sender.toString()) {
        // Check conditional
        if (data.type === 'text') {

          // Check if client send text message
          let result = await sendMessageTextType(data, api, account)

          // Update seen status message
          const messageCurrent = await Message.findOne({ '_account': data._account, '_sender': data._sender, '_receiver': data._receiver })
          messageCurrent.seen = true
          messageCurrent.save()

          // Return result
          resolve(result)
        } else if (data.type === 'attachment') {
          // Check if client send text message
          let result = await sendMessageAttachmentType(data, api, account)

          // Update seen status message
          const messageCurrent = await Message.findOne({ '_account': data._account, '_sender': data._sender, '_receiver': data._receiver })
          messageCurrent.seen = true
          messageCurrent.save()

          // Return result
          resolve(result)
        }
      }
    })
  }
}