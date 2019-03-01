const MessageFacebook = require('../models/MessageFacebook.model')

let api = "";

module.exports = {
  chat: (socket) => {
    
    // send message
    socket.on('serve-send', () => {
      api.listen((err, message) => {
        console.log('message', message);
        if (err)
          return
        const data = { 
          text: message.body,
          threadID: message.threadID,
          timestamp: message.timestamp,
          isGroup: message.isGroup
        }
        socket.emit('listen-send', data);
      })
    })

    socket.on('send', data => {
      api.sendMessage(data.text, data.id, (err) => {
        if (err)
          return
      });
    })
  },
  getAPI: (res, result) => {
    if (!result) {
      res.send("false")
    }
    api = result;
    res.send("ss")
  }
  
}