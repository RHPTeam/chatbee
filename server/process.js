const login = require("facebook-chat-api");
let CronJob  = require('cron').CronJob;
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

/*************************************************************************/
const ConvertCookieToObject = require('./src/helpers/util/cookie.util')
const CookieFacebook = require('./src/configs/cookieFacebook')
const ConvertUnicode = require('./src/helpers/util/convertUnicode.util')
const ErrorText = require('./src/configs/errors')
/*************************************************************************/

/*************************************************************************/
const FriendProcess = require('./src/process/friend.process')
const VocateProcess = require('./src/process/vocate.process')
const MessageProcess = require('./src/process/message.process')
const BlockProcess = require('./src/process/block.process')
const SyntaxProcess = require('./src/process/syntax.process')
/*************************************************************************/

/*************************************************************************/
const Facebook = require('./src/models/Facebook.model')
const Friend = require('./src/models/Friends.model')
const Message = require('./src/models/Messages.model')
const Vocate = require('./src/models/Vocate.model')
const Block = require('./src/models/Blocks.model')
const Syntax = require('./src/models/Syntax.model')
/*************************************************************************/

// Setup login facebook function
const loginFacebook = cookie => {
  return new Promise((resolve, reject) => {
    login({ appState: cookie }, (err, api) => {
      if (err) {
        reject(err);
      } else {
        resolve(api);
      }
    });
  });
};

// Setup wait time delay
const waitTime = time => {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(true);
    }, time);
  });
};

// Start all task process multi thread
let process = async function(account) {
  // Create api contain data of facebook chat plugin
  let api = null

  // Get info user facebook by api chat facebook
  const getInfoFB = id => {
    return new Promise(resolve => {
      api.getUserInfo(id, (err, ret) => {
        resolve(ret[id])
      });
    });
  };

  // Get all friend by api chat facebook
  const getFriendsFB = async api => {
    return new Promise(resolve => {
      api.getFriendsList((err, dataRes) => {
        resolve(dataRes)
      });
    });
  }

  // Update info after login
  const updateInfoFB = async api => {
    // Get user id from api chat facebook
    const facebookID = await api.getCurrentUserID()
    // Get user info facebook from api chat facebook
    const newInfoFB = await getInfoFB(facebookID)
    // Get user info facebook from database
    const userInfoFB = await Facebook.findOne({'userInfo.id': facebookID })

    // Set new value user info facebook
    userInfoFB.userInfo.name = newInfoFB.name
    userInfoFB.userInfo.thumbSrc = newInfoFB.thumbSrc
    userInfoFB.userInfo.profileUrl = newInfoFB.profileUrl
    await userInfoFB.save()
    return userInfoFB
  }

  // Update friend after login
  const updateFriendsFB = async api => {
    // Get all friends
    const friendsListUpdated = await getFriendsFB(api)
    // Check exist friend in database if not update it
    await FriendProcess.updateFriend(account, friendsListUpdated)
  }

  // Convert cookie to object which pass to facebook
  const cookieObject = ConvertCookieToObject(account.cookie)[0]
  const cookie = CookieFacebook(cookieObject.fr, cookieObject.datr, cookieObject.c_user, cookieObject.xs)

  try {
    api = await loginFacebook(cookie)
    await updateFriendsFB(api)
    account = await updateInfoFB(api)
  } catch (e) {
    account.status = 0
    account.error = ErrorText.LOGOUT
    await account.save()
  }

  // START ACTION SYSTEM: (Conditional system: api not null)
  if (api !== null) {
    // Active facebook account on system
    account.status = 1
    account.save()

    // Setup SOCKET.IO when client connect to server
    io.on('connection', async socket => {
      console.log(`Client connected with id: ${socket.id}`)
      // Event: Send message
      socket.on('sendMessage', async function (dataEmit, callback) {
        // get data infinite by
        let sendData = await MessageProcess.handleMessage(dataEmit, account, api)
        return callback(sendData)
      })
      // Event: Get list friends
      socket.on('getListFriends', async function (dataEmit) {
        const vocaList = await Vocate.find({ '_account': account._account })
        if (dataEmit.includes(account._id)) {
          api.getFriendsList((err, data) => {
            if (!data) {
              data = data.filter(e => {
                if (e.userID !== '0') {
                  return e
                }
              }).map(e => {
                return VocateProcess.getVocate(e, vocaList)
              })
              socket.emit('listFriends', { data: data })
            }
          })
        }
        return true;
      })
      // Event: Send message friends (Cron Job)
      socket.on('sendMessageCronFriends', async function (dataEmit) {
        // Check dataEmit of friend before cron
        const filteredData = dataEmit._friends.filter(friend => {
          if (friend._friends.includes(account._id)) {
            return friend
          }
        })
        // Handle Cron job when timer later
        new CronJob('*****', async function () {
          // Handle broadcasts from database or event listen from client with 'sendMessageCronFriends' event
        }, null, true, 'Asia/Ho_Chi_Minh')
      })
    })

    // Handle action listen from which api receive from facebook
    api.listen(async (err, message) => {
      // Handle error with api
      if (err !== null) {

        // error of api
        if (err.error === 'Not logged in.') {
          account.status = 0
          account.error = ErrorText.LOGOUT
          account.save()
        }
        // submit error by socket
        io.sockets.emit('error', { sender: account._id, status: 0 })

        return { error: ErrorText.LISTEN };
      }

      // Handle message which facebook return something
      if (message !== undefined) {
        // Define variable message
        const messageContent = message.body
        const receiverID = message.threadID
        let messageObject;

        // Define content message before save to database
        if (message.attachments.length === 0) {

          // Handle message with text type
          messageObject = {
            reference: 1,
            timeStamp: Date.now(),
            typeContent: 'text',
            valueContent: messageContent
          }

        } else {

          // Handle message with attachments type

          // 1: type photo
          if(message.attachments[0].type === 'photo') {
            messageObject = {
              reference: 1,
              timeStamp: Date.now(),
              typeContent: 'image',
              valueContent: message.attachments[0].url
            }
          }
          // 2: type sticker
          if(message.attachments[0].type === 'sticker') {
            messageObject = {
              reference: 1,
              timeStamp: Date.now(),
              typeContent: 'sticker',
              valueContent: message.attachments[0].url
            }
          }
        }

        // Check if not message, create message and user message
        const userInfoFB = await Friend.findOne({'userID': receiverID })
        const messageResult = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFB._id}).populate({path: '_receiver', select: '-_account -_facebook'}).populate({
          path: '_sender',
          select: '-cookie'
        })

        if (!messageResult) {

          // Handle message never chat together
          const messageCurrentObject = {
            contents: [messageObject],
            created_at: Date.now(),
            seen: false,
            status: 'online',
            _account: account._account,
            _receiver: userInfoFB._id,
            _sender: account._id
          }
          const messageCurrent = new Message(messageCurrentObject)
          await messageCurrent.save()
        } else {

          // Handle message chatted
          messageResult.seen = false
          messageResult.contents.push(messageObject)
          await messageResult.save()
        }

        // Handle message  is a script in syntax
        const foundAllSyntax = await Syntax.find({'_account': account._account})
        // found syntax when customer message to
        const foundSyntax = foundAllSyntax.map(syntax => {
          if (syntax._facebook.indexOf(account._id) >= 0)
            return syntax
        }).filter(item => {
          if (item === undefined) return
          return true
        }).filter(item => {
          const filterName = item.name.find(name => ConvertUnicode(name.toLowerCase()).toString() === ConvertUnicode(message.body.trim().toLowerCase()).toString())
          if (!filterName) return
          return true
        })[0]
        if (foundSyntax !== undefined) {
          const data = await SyntaxProcess.handleSyntax(message, foundSyntax, account, api)
        }

        // Handle message  is a script in block
        const foundAllBlock = await Block.find({'_account': account._account})
        const foundBlock = foundAllBlock.find(val => ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(message.body).toString().toLowerCase())
        if (foundBlock !== undefined) {
          const data = await BlockProcess.handleBlock(message, foundBlock, account, api)
        }


        // Get data chat after update listen from api
        const messageUpdated = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFB._id}).populate({path: '_receiver', select: '-_account -_facebook'}).populate({
          path: '_sender',
          select: '-cookie'
        })

        return io.sockets.emit('receiveMessage', {
          message: messageUpdated
        })

      }
    })

  }

  return account
};


// Create constructor app
(async () => {
  const accountFacebookList = await Facebook.find({})
  accountFacebookList.map(e => process(e['_doc']))
})()

http.listen(8889);
module.exports = process;
