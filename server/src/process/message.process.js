const Message = require('../models/Messages.model')
const Friend = require('../models/Friends.model')
const Vocate = require('../models/Vocate.model')
const Sequence = require('../models/Sequence.model')
const Block = require('../models/Blocks.model')

const Attribute = require('../models/Attribute.model')
const ErrorText = require('../configs/errors')
const VocateProcess = require('./vocate.process')

const config = require('../configs/configs');
const fs = require('fs')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const CronJob = require('cron').CronJob

// Handle message text
const sendMessageTextType = async (data, api, account) => {
	return new Promise(async resolve=> {

		// HANDLE BEFORE SEND MESSAGE TEXT TYPE (UPDATE BY TOAN VERSION TEMP 03/04/2019)
		data = await handleBeforeSendMessageText(data)

		// Get userID Facebook (Important)
		const userInfoFriend = await Friend.findOne({ '_id': data._receiver })

		api.sendMessage({ body: data.message }, userInfoFriend.userID, async (err, message) => {
			let result = {}

			// Update message after send message finnish
			if (err === null) {
				const messageCurrent = await Message.findOne({ '_account': data._account, '_sender': data._sender, '_receiver': data._receiver })

				// Define object message
				const messageObject = {
					reference: 2,
					timeStamp: Date.now(),
					typeContent: 'text',
					valueContent: data.message
				}
				messageCurrent.contents.push(messageObject)
				await messageCurrent.save()

				// Define error null
				result.error = null
			} else {
				// error of api
				if (err.error === 'Not logged in.') {
					account.status = 0
					account.error = ErrorText.LOGOUT
					account.save()
				}
			}

			// Update message
			const messageUpdated = await Message.findOne({ '_account': data._account, '_sender': data._sender, '_receiver': data._receiver }).populate({path: '_receiver', select: '-_account -_facebook'}).populate({
				path: '_sender',
				select: '-cookie'
			})
			result.data = messageUpdated
			// resolve result
			resolve(result)
		})
	})
}

// Handle message attachment
const sendMessageAttachmentType = async (data, api, account) => {
	return new Promise(async resolve=> {

		// Get userID Facebook (Important)
		const userInfoFriend = await Friend.findOne({ '_id': data._receiver })

		api.sendMessage({ attachment:  fs.createReadStream(__dirname.replace('\\src\\process', '') + ( data.message.replace(config.URL, ''))) }, userInfoFriend.userID, async (err, message) => {
			let result = {}

			// Update message after send message finnish
			if (err === null) {
				const messageCurrent = await Message.findOne({ '_account': data._account, '_sender': data._sender, '_receiver': data._receiver })

				// Define object message
				const messageObject = {
					reference: 2,
					timeStamp: Date.now(),
					typeContent: 'image',
					valueContent: data.message
				}
				messageCurrent.contents.push(messageObject)
				await messageCurrent.save()

				// Define error null
				result.error = null
			} else {
				// error of api
				if (err.error === 'Not logged in.') {
					account.status = 0
					account.error = ErrorText.LOGOUT
					account.save()
				}
			}

			// Update message
			const messageUpdated = await Message.findOne({ '_account': data._account, '_sender': data._sender, '_receiver': data._receiver }).populate({path: '_receiver', select: '-_account -_facebook'}).populate({
				path: '_sender',
				select: '-cookie'
			})
			result.data = messageUpdated
			// resolve result
			resolve(result)
		})
	})
}

// Handle message text
const sendMessageTextTypeInBlock = async (data, val, api, account) => {
	return new Promise(async resolve=> {
		// Get userID Facebook (Important)
		const userInfoFriend = await Friend.findOne({ '_id': data._receiver })


		// HANDLE BEFORE SEND MESSAGE TEXT TYPE (UPDATE BY HOC VERSION TEMP 03/04/2019)
		data = await handleBeforeSendMessageText(data)

		api.sendMessage({ body: data.message}, userInfoFriend.userID, async (err, message) => {
			let result = {}

			// Update message after send message finnish
			if (err === null) {
				const messageCurrent = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFriend._id })

				// Define object message
				const messageObject = {
					reference: 2,
					timeStamp: Date.now(),
					typeContent: 'text',
					valueContent: data.message
				}
				messageCurrent.contents.push(messageObject)
				await messageCurrent.save()

				// Define error null
				result.error = null
			} else {
				// error of api
				if (err.error === 'Not logged in.') {
					account.status = 0
					account.error = ErrorText.LOGOUT
					account.save()
				}
			}

			// Update message
			const messageUpdated = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFriend._id }).populate({path: '_receiver', select: '-_account -_facebook'}).populate({
				path: '_sender',
				select: '-cookie'
			})
			result.data = messageUpdated
			// resolve result
			resolve(result)
		})
	})
}
// Handle message text
const sendMessageImageTypeInBlock = async (message, val, api, account) => {
	return new Promise(async resolve=> {

		// Get userID Facebook (Important)
		const userInfoFriend = await Friend.findOne({ 'userID': message.senderID })
		api.sendMessage({attachment: fs.createReadStream((__dirname.includes('\\'))?(__dirname.replace('\\src\\process', '') + (val.valueText.replace(config.URL, ''))):(__dirname.replace('/src/process', '') + (val.valueText.replace(config.URL, ''))))}, userInfoFriend.userID, async (err, message) => {
			let result = {}

			// Update message after send message finnish
			if (err === null) {
				const messageCurrent = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFriend._id })

				// Define object message
				const messageObject = {
					reference: 2,
					timeStamp: Date.now(),
					typeContent: 'image',
					valueContent:  val.valueText
				}
				messageCurrent.contents.push(messageObject)
				await messageCurrent.save()

				// Define error null
				result.error = null
			} else {
				// error of api
				if (err.error === 'Not logged in.') {
					account.status = 0
					account.error = ErrorText.LOGOUT
					account.save()
				}
			}

			// Update message
			const messageUpdated = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFriend._id }).populate({path: '_receiver', select: '-_account -_facebook'}).populate({
				path: '_sender',
				select: '-cookie'
			})
			result.data = messageUpdated
			// resolve result
			resolve(result)
		})
	})
}

/**
 * Handle vocate and attribute. Note: When client or system send text type message
 * @type {Object}
 */
const handleBeforeSendMessageText = async (data) => {

	// Step 01: Get info of receiver
	const userInfoReceiver = await Friend.findOne({ '_id': data._receiver }).select('-_facebook -_account')

	// Step 02: Get all vocate and attribute
	const vocaList = await Vocate.find({ '_account': data._account })
	const attributeList = await Attribute.find({ '_account': data._account })

	// Handle 4 type default gender, first name, last name, full name
	const userInfoCheckedVocate = await VocateProcess.getVocate(userInfoReceiver, vocaList)
	vocateActiveReceiver = userInfoCheckedVocate.vocative

	const firstName = userInfoReceiver.firstName

	// Replace message when appear vocate or attribute
	data.message = data.message.replace(/{{ten}}/g, firstName).replace(/{{danhxung}}/g, vocateActiveReceiver)


	return data
}


/**
 * 	Global function set time out
 * @type {{handleMessage: (function(*=, *=, *=): Promise<*>), handMessageInBlock: (function(*=, *=, *=, *=): Promise<*>)}}
 *
 */
// Setup wait time delay
const waitTime = time => {
	return new Promise(resolve => {
		setTimeout(function() {
			resolve(true);
		}, time);
	});
};

/**
 *
 * @type {{handleMessage: (function(*=, *=, *=): Promise<*>), handMessageInBlock: (function(*=, *=, *=, *=): Promise<*>)}}
 */
handleMessageSequenceInBlock = async (message, val, account, api) => {
	return new Promise(async (resolve, reject) => {
		// Get userID Facebook (Important)
		const userInfoFriend = await Friend.findOne({'userID': message.senderID})
		let result
		let messageCurrent
		switch (val.typeContent) {
			case 'text':
				// Create json data to handle when text have include vocate
				let data = {
					message: val.valueText,
					_account: account._account,
					_receiver: userInfoFriend._id
				}
				result = await sendMessageTextTypeInBlock(data, val, api, account)

				// Update seen status message
				messageCurrent = await Message.findOne({
					'_account': account._account,
					'_sender': account._id,
					'_receiver': userInfoFriend._id
				})
				messageCurrent.seen = true
				messageCurrent.save()

				// Return result
				resolve(result)
				break
			case 'image' :
				// Check if client send text message
				result = await sendMessageImageTypeInBlock(message, val, api, account)

				// Update seen status message
				messageCurrent = await Message.findOne({
					'_account': account._account,
					'_sender': account._id,
					'_receiver': userInfoFriend._id
				})
				messageCurrent.seen = true
				messageCurrent.save()

				// Return result
				resolve(result)
				break
			case 'tag' :
				val.valueText.split(',').map(async item => {
					const foundAttribute = await Attribute.findById(item)
					foundAttribute._friends = foundAttribute._friends.indexOf(userInfoFriend._id) === 0 ? foundAttribute._friends : foundAttribute._friends.push(userInfoFriend._id)
					await foundAttribute.save()
					resolve(foundAttribute)
				})
				break
			case 'time':
				resolve(waitTime(val.valueText))
				break
		}
	})
}


module.exports = {
	// Handle message when vocative and script
	handleMessage: async (data, account, api) => {
		return new Promise(async (resolve,reject)=> {
			// Check if message of account and receiver
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
  },
  handMessageInBlock: async (message, val, account, api) => {
    return new Promise(async (resolve, reject) => {
      // Get userID Facebook (Important)
      const userInfoFriend = await Friend.findOne({'userID': message.senderID})
      let result
      let messageCurrent
      switch (val.typeContent) {
        case 'text':
          // Create json data to handle when text have include vocate
          let data = {
            message: val.valueText,
            _account: account._account,
            _receiver: userInfoFriend._id
          }
          result = await sendMessageTextTypeInBlock(data, val, api, account)

          // Update seen status message
          messageCurrent = await Message.findOne({
            '_account': account._account,
            '_sender': account._id,
            '_receiver': userInfoFriend._id
          })
          messageCurrent.seen = true
          messageCurrent.save()

          // Return result
          resolve(result)
          break
        case 'image' :
          // Check if client send text message
          result = await sendMessageImageTypeInBlock(message, val, api, account)

          // Update seen status message
          messageCurrent = await Message.findOne({
            '_account': account._account,
            '_sender': account._id,
            '_receiver': userInfoFriend._id
          })
          messageCurrent.seen = true
          messageCurrent.save()

          // Return result
          resolve(result)
          break
        case 'tag' :
          val.valueText.split(',').map(async item => {
            const foundAttribute = await Attribute.findById(item)
            foundAttribute._friends = foundAttribute._friends.indexOf(userInfoFriend._id) === 0? foundAttribute._friends : foundAttribute._friends.push(userInfoFriend._id)
            await foundAttribute.save()
						resolve(foundAttribute)
          })
          break
				case 'time':
					resolve(waitTime(val.valueText))
					break
        case 'subscribe':
          //  sequence is subscribe
          const item = (val.valueText.split(','))[Math.floor(Math.random() * (val.valueText.split(',')).length)];
          const foundSequence = await Sequence.findById(item)
					foundSequence.sequences.forEach(async item => {
						const foundBlockSeq = await Block.findById(item._block)
						switch (ConvertUnicode(item.time.descTime.trim().toLowerCase()).toString()) {
							case 'gui ngay':
									for (var i =0; i< foundBlockSeq.contents.length ; i++) {
										result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[i], account, api)
										resolve (result)
									}
								break
							case 'giay':
								var job = new CronJob(`${new Date().getSeconds() + item.time.numberTime} ${new Date().getMinutes()} ${new Date().getHours()} ${new Date().getDate()} ${new Date().getMonth()} ${new Date().getDay()}`, function () {
										/* This function is executed when the job stops */
										for (var i =0; i< foundBlockSeq.contents.length ; i++) {
											result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[i], account, api)
											resolve (result)
										}
									},
									true, /* Start the job right now */
									'Asia/Ho_Chi_Minh' /* Time zone of this job. */
								);
								resolve (job)
								break
							case 'phut':
								var job = new CronJob(`${new Date().getSeconds()} ${new Date().getMinutes() + item.time.numberTime} ${new Date().getHours()} ${new Date().getDate()} ${new Date().getMonth()} ${new Date().getDay()}`, function () {
										/* This function is executed when the job stops */
										for (var i =0; i< foundBlockSeq.contents.length ; i++) {
											result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[i], account, api)
											resolve (result)
										}
									},
									true, /* Start the job right now */
									'Asia/Ho_Chi_Minh' /* Time zone of this job. */
								);
								resolve (job)
								break
							case 'gio':
								var job = new CronJob(`${new Date().getSeconds()} ${new Date().getMinutes()} ${new Date().getHours()+ item.time.numberTime} ${new Date().getDate()} ${new Date().getMonth()} ${new Date().getDay()}`, function () {
										/* This function is executed when the job stops */
										for (var i =0; i< foundBlockSeq.contents.length ; i++) {
											result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[i], account, api)
											resolve (result)
										}
									},
									true, /* Start the job right now */
									'Asia/Ho_Chi_Minh' /* Time zone of this job. */
								);
								resolve (job)
								break
							case 'ngay':
								var job = new CronJob(`${new Date().getSeconds()} ${new Date().getMinutes()} ${new Date().getHours()} ${new Date().getDate() + item.time.numberTime} ${new Date().getMonth()} ${new Date().getDay()}`, function () {
										/* This function is executed when the job stops */
										for (var i =0; i< foundBlockSeq.contents.length ; i++) {
											result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[i], account, api)
											resolve (result)
										}
									},
									true, /* Start the job right now */
									'Asia/Ho_Chi_Minh' /* Time zone of this job. */
								);
								resolve (job)
								break
							case 'tat':
								break
						}
					})
          break
      }
    })
  },
}