const MessageProcess = require('./message.process')

module.exports = {
  // Handle message when vocative and script
  handleBroadcast: async ( foundBroadcast, account, api) => {
    console.log(foundBroadcast.blocks)

    return new Promise(async resolve => {
      // for (var i = 0 ;  i < foundBlock.contents.length ; i++)
      // {
      //   let result = await MessageProcess.handMessageInBlock(message, foundBlock.contents[i], account, api)
      //   resolve(result)
      // }
    })
  }
}