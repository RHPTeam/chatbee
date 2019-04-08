const MessageProcess = require('./message.process')

module.exports = {
  // Handle message when vocative and script
  handleScheduleBroadcast: async ( foundScheduleBroadcast, account, api) => {

    return new Promise(async resolve => {
      for (var i = 0 ;  i < foundScheduleBroadcast.blocks.length ; i++)
      {
        let result = await MessageProcess.handMessageScheduleBroadcast( foundScheduleBroadcast.blocks[i], account, api)
        resolve(result)
      }
    })
  }
}