const Message = require('../models/Messages.model')
const Friend = require('../models/Friends.model')
const ErrorText = require('../configs/errors')
const config = require('../configs/configs');
const fs = require('fs')

const MessageProcess = require('./message.process')

module.exports = {
  // Handle message when vocative and script
  handleBlock: async (message, foundBlock, account, api) => {
    return new Promise(async resolve => {
      for (var i = 0 ;  i < foundBlock.contents.length ; i++)
      {
        let result = await MessageProcess.handMessageInBlock(message, foundBlock.contents[i], account, api)
        resolve(result)
      }
    })
  }
}