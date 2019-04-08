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

					console.log(messageCurrent)

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

		api.sendMessage({ attachment: fs.createReadStream((__dirname.includes('\\'))?(__dirname.replace('\\src\\process', '') + (data.message.replace(config.URL, ''))):(__dirname.replace('/src/process', '') + (data.message.replace(config.URL, '')))) }, userInfoFriend.userID, async (err, message) => {
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
 *  Handle message text type block
 * @param data
 * @param val
 * @param api
 * @param account
 * @returns {Promise<*>}
 */
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

/**
 * Handle message image type block
 * @param message
 * @param val
 * @param api
 * @param account
 * @returns {Promise<*>}
 */
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
				} else if (data.type === 'image') {
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
						if (foundAttribute._friends.indexOf(userInfoFriend._id) < 0 ) {
							foundAttribute._friends.push(userInfoFriend._id)
						}
            await foundAttribute.save()
						resolve(foundAttribute)
          })
          break
				case 'time':
					resolve(waitTime(parseFloat(val.valueText)*1000))
					break
        case 'subscribe':
          //  sequence is subscribe
          const item = (val.valueText.split(','))[Math.floor(Math.random() * (val.valueText.split(',')).length)];
          const foundSequence = await Sequence.findById(item)
					// Add id friend to sequence
					if (foundSequence.friends.indexOf(userInfoFriend._id) < 0) {
						foundSequence.friends.push(userInfoFriend._id)
						await foundSequence.save()
					}
					let date = 0
					for (var i = 0; i < foundSequence.sequences.length; i++) {
						let item = foundSequence.sequences[i]
						const foundBlockSeq = await Block.findById(item._block)
						switch (ConvertUnicode(item.time.descTime.trim().toLowerCase()).toString()) {
							case 'gui ngay':
								if (foundSequence.friends.indexOf(userInfoFriend._id) > -1) {
									for (var j =0; j< foundBlockSeq.contents.length ; j++) {
										result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[j], account, api)
										resolve (result)
									}
								}
								break
							case 'giay':
								date === 0 ? date = new Date().setSeconds(new Date().getSeconds()+item.time.numberTime) : date = date+item.time.numberTime*1000 // 1000 = 1s
								if (foundSequence.friends.indexOf(userInfoFriend._id) > -1) {
									var job = new CronJob(`${new Date(date).getSeconds()} ${new Date(date).getMinutes()} ${new Date(date).getHours()} ${new Date(date).getDate()} ${new Date(date).getMonth()} ${new Date(date).getDay()}`, function () {
											/* This function is executed when the job stops */
											if (foundSequence.friends.indexOf(userInfoFriend._id) > -1) {
												for (var k =0; k< foundBlockSeq.contents.length ; k++) {
													result =  handleMessageSequenceInBlock(message, foundBlockSeq.contents[k], account, api)
													resolve (result)
												}
											}
										},
										true, /* Start the job right now */
										'Asia/Ho_Chi_Minh' /* Time zone of this job. */
									);
									resolve (job)}
								break
							case 'phut':
								date === 0 ? date = new Date().setMinutes(new Date().getMinutes()+item.time.numberTime) : date = date+item.time.numberTime*60000// 60.000 = 1 minute
								var job1 = new CronJob(`${new Date(date).getSeconds()} ${new Date(date).getMinutes()} ${new Date(date).getHours()} ${new Date(date).getDate()} ${new Date(date).getMonth()} ${new Date(date).getDay()}`, function () {
										/* This function is executed when the job stops */
										if (foundSequence.friends.indexOf(userInfoFriend._id) > -1) {
											for (var l =0; l< foundBlockSeq.contents.length ; l++) {
												result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[l], account, api)
												resolve (result)
											}
										}
									},
									true, /* Start the job right now */
									'Asia/Ho_Chi_Minh' /* Time zone of this job. */
								);
								resolve (job1)
								break
							case 'gio':
								date === 0 ? date = new Date().setHours(new Date().getHours()+item.time.numberTime) : date = date+item.time.numberTime*3600000 //3.600.000 = 1 hour
								var job2 = new CronJob(`${new Date(date).getSeconds()} ${new Date(date).getMinutes()} ${new Date(date).getHours()} ${new Date(date).getDate()} ${new Date(date).getMonth()} ${new Date(date).getDay()}`, function () {
										/* This function is executed when the job stops */
										if (foundSequence.friends.indexOf(userInfoFriend._id) > -1) {
											for (var m =0; m< foundBlockSeq.contents.length ; m++) {
												result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[m], account, api)
												resolve (result)
											}
										}
									},
									true, /* Start the job right now */
									'Asia/Ho_Chi_Minh' /* Time zone of this job. */
								);
								resolve (job2)
								break
							case 'ngay':
								date === 0 ? date = new Date().setDate(new Date().getDate()+item.time.numberTime) : date = date+item.time.numberTime*86400000  //86.400.000 = 1 day
								var job3 = new CronJob(`${new Date(date).getSeconds()} ${new Date(date).getMinutes()} ${new Date(date).getHours()} ${new Date(date).getDate()} ${new Date(date).getMonth()} ${new Date(date).getDay()}`, function () {
										/* This function is executed when the job stops */
										if (foundSequence.friends.indexOf(userInfoFriend._id) > -1) {
											for (var n =0; n< foundBlockSeq.contents.length ; n++) {
												result = handleMessageSequenceInBlock(message, foundBlockSeq.contents[n], account, api)
												resolve (result)
											}
										}
									},
									true, /* Start the job right now */
									'Asia/Ho_Chi_Minh' /* Time zone of this job. */
								);
								resolve (job3)
								break
							case 'tat':
								break
						}
					}

          break
				case 'unsubscribe':
					console.log(val)
					val.valueText.split(',').map(async item => {
						const findSequence= await Sequence.findById(item)
						console.log(findSequence)
						console.log(findSequence.friends.indexOf(userInfoFriend._id))
						if (findSequence.friends.indexOf(userInfoFriend._id) > -1) {
							findSequence.friends.pull(userInfoFriend._id)
							await findSequence.save()
						}
						resolve(findSequence)
					})
					break
      }
    })
  },
	handMessageScheduleBroadcast: async (dataItem, account, api) => {
		return new Promise(async (resolve, reject) => {
			let date = 0
			let result
			let message
			if (dataItem.status === true) {

				// data hour date month respond
				let dataRes = {
					second: 0,
					minute: parseFloat(dataItem.timeSetting.hour.split(':')[1]),
					hour: parseFloat(dataItem.timeSetting.hour.split(':')[0]),
					date: parseFloat(dataItem.timeSetting.dateMonth.split('-')[2]),
					month: parseFloat(dataItem.timeSetting.dateMonth.split('-')[1]) - 1,
					day: dataItem.timeSetting.repeat.valueRepeat
				}
				switch (dataItem.timeSetting.repeat.typeRepeat) {
					case "Không":
            let job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} ${dataRes.date} ${dataRes.month} *`, function () {
              dataItem._friends.forEach(async friend => {
                const foundFriend = await Friend.findById(friend)
                dataItem.content.forEach(async val => {
                  message = {
                    senderID: foundFriend.userID
                  }
                  // using again  function handle message sequence in block to send message broadcast
                  result = await handleMessageSequenceInBlock(message,val, account, api)
                  // console.log(result)
                  resolve (result)
                })
              })
              },
              true, /* Start the job right now */
              'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            resolve (job)
						break
					case "Hằng ngày":
						console.log(1)
						break
					case "Cuối tuần":
						break
					case "Hằng tháng":
						break
					case "Ngày làm việc":
						break
					case "Tùy chỉnh":
						break
				}
				// console.log(dataItem)

			}
		})
	}
}
