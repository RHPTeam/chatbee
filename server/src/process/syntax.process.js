const Block = require('../models/Blocks.model')
const Friend = require('../models/Friends.model')

const BlockProcess = require('./block.process')
const MessageProcess = require('./message.process')
module.exports = {
  // Handle message when vocative and script
  handleSyntax: async (message, foundSyntax, account, api) => {
    return new Promise(async resolve => {
      const randomItem = (foundSyntax.content)[Math.floor(Math.random() * (foundSyntax.content).length)];
      const userInfoFriend = await Friend.findOne({'userID': message.senderID})
      if (randomItem.typeContent === 'block') {
        const foundBlock = await Block.findById(randomItem.valueContent)
        let result = await BlockProcess.handleBlock(message, foundBlock, account, api)
        resolve(result)
      } else if (randomItem.typeContent === 'text') {
        let data = {
          message: randomItem.valueContent,
          type: 'text',
          _account: account._account,
          _sender: account._id,
          _receiver: userInfoFriend._id
        }
        let result = MessageProcess.handleMessage(data,account,api)
        resolve(result)
      }
    })
  }
}