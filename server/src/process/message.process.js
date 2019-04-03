const Message = require('../models/Messages.model')
const Friend = require('../models/Friends.model')
const Vocate = require('../models/Vocate.model')
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

		api.sendMessage({ attachment:  fs.createReadStream(__dirname.replace('\\src\\controllers', '') + ( data.message.replace(config.URL, ''))) }, userInfoFriend.userID, async (err, message) => {
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
	}
}
