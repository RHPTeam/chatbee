const db = require('../models/MessageFacebook.model');
const Message = db.MessageFacebook;

let api = "";

module.exports = {
  chat: (socket) => {
    // let api = getAPI();
    socket.on('message', data => {
      console.log(data)
      socket.broadcast.to().emit('message');
    })
    // send message
    socket.on('serve-send', () => {
      const idReceiver = "100016962126289";
      const body = "[BOT] Xin chao ban"
      console.log(1)
      api.sendMessage(body, idReceiver);

    })

    socket.on('listen', () => {
      api.listen((err, message) => {
        console.log(message, 'message')
        api.sendMessage(message.body, message.threadID);
      socket.broadcast.to().emit('listen-send', message);


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