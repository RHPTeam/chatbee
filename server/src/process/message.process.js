const Message = require('../models/Messages.model')
const Friend = require('../models/Friends.model')
const Vocate = require('../models/Vocate.model')
const Sequence = require('../models/Sequence.model')

const Attribute = require('../models/Attribute.model')
const ErrorText = require('../configs/errors')
const VocateProcess = require('./vocate.process')

const config = require('../configs/configs');
const fs = require('fs')

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
				// Define object message
				const messageObject = {
					reference: 2,
					timeStamp: Date.now(),
					typeContent: 'text',
					valueContent: data.message
				}

				const messageCurrent = await Message.findOne({ '_account': data._account, '_sender': data._sender, '_receiver': data._receiver})

				// Check if not chat then create message
				if(!messageCurrent) {
					const newMessagePreview = {
						_account: account._account,
						created_at: Date.now()
					}
					const newMessage = new Message(newMessagePreview)
					newMessage._receiver = data._receiver
					newMessage._sender = data._sender
					newMessage.contents.push(messageObject)
					await newMessage.save()
				} else {
					messageCurrent.contents.push(messageObject)
					await messageCurrent.save()

					// Define error null
					result.error = null
				}
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

// Handle message text type block
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

// Handle message image type block
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

	// Replace message when appear vocate
	data.message = data.message.replace(/{{ten}}/g, firstName).replace(/{{danhxung}}/g, vocateActiveReceiver)

	// Replace message when appear attribute (Note: Using for to handle async)
	for (let index = 0; index < attributeList.length; index++) {
		// If message exsits keyword in "{{_}}", then we replace keyword to value of that keyword
		if (data.message.includes(`{{${attributeList[index].name}}}`)) {
			// Get friend apply with attribute and check receiver exsits in that friends list
			const applyFriendsList = attributeList[index]._friends || []

			if (applyFriendsList.indexOf(userInfoReceiver._id) === 0) {
				data.message = data.message.replace(new RegExp(`{{${attributeList[index].name}}}`, 'g'), attributeList[index].value)
			} else {
				data.message = data.message.replace(new RegExp(`{{${attributeList[index].name}}}`, 'g'), '')
			}
		}
	}

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
		return new Promise(async (resolve,reject)=> {
			// Get userID Facebook (Important)
			const userInfoFriend = await Friend.findOne({ 'userID': message.senderID })
			if (val.typeContent === 'text') {
				// Create json data to handle when text have include vocate
				let data = {
					message: val.valueText,
					_account: account._account,
					_receiver: userInfoFriend._id
				}
				let result = await sendMessageTextTypeInBlock(data, val, api ,account)

				// Update seen status message
				const messageCurrent = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFriend._id })
				messageCurrent.seen = true
				messageCurrent.save()

				// Return result
				resolve(result)
			}
			if (val.typeContent === 'image') {
				// Check if client send text message
				let result = await sendMessageImageTypeInBlock(message, val, api ,account)

				// Update seen status message
				const messageCurrent = await Message.findOne({ '_account': account._account, '_sender': account._id, '_receiver': userInfoFriend._id })
				messageCurrent.seen = true
				messageCurrent.save()

				// Return result
				resolve(result)
			}
			if (val.typeContent === 'tag'){
				console.log(val)
				val.valueText.split(',').map( async item => {
					const foundAttribute = await Attribute.findById(item)
          foundAttribute._friends = foundAttribute._friends.indexOf(userInfoFriend._id) === 0? foundAttribute._friends : foundAttribute._friends.push(userInfoFriend._id)
					await foundAttribute.save()
				})
        return
			}
			if (val.typeContent === 'time') {
				waitTime(val.valueText)
			}
			if (val.typeContent === 'subscribe') {
				console.log(val)
				// case have 1 sequence is subscribe
				const item = (val.valueText.split(','))[Math.floor(Math.random() * (val.valueText.split(',')).length)];
				console.log(item)
				const foundSequence = await Sequence.findById(item)
				console.log(foundSequence)
			}
		})
	}
}
