const Friend = require('../models/Friends.model')

const ConvertUnicode = require('../helpers/util/convertUnicode.util')

const findDeepVocative = (vocative, input) => {
	return vocative.some(voca => {
		if(voca.toString() === input.toString()) return true
		if (voca._friends) return findDeepVocative(voca._friends, input)
	})
}


module.exports = {

	/**
	 * Handle vocate before do something with friend receiver
	 * @param  {Object}  receiver     [description]
	 * @param  {Array}  vocative [description]
	 * @return {Promise}          [description]
	 */
	getVocate: async (receiver, vocative) => {

		// Convert receiver to normal object (convert all properties to normal)
		const normalReceiverObject = {
			_id: receiver._id
		}

		if (vocative.length > 0) {
			// Handle vocate if user set
			if (findDeepVocative(vocative, receiver._id) === true) {
				normalReceiverObject.vocative = vocative.filter(voca => voca._friends.indexOf(receiver._id) === 0)[0].name
			} else {
				if (receiver.gender === 'male_singular') {
					normalReceiverObject.vocative = 'Anh'
				} else if (receiver.gender === 'female_singular') {
					normalReceiverObject.vocative = 'Chị'
				}
			}
		} else {
			// Handle vocate if user not set
			if (receiver.gender === 'male_singular') {
				normalReceiverObject.vocative = 'Anh'
			} else if (receiver.gender === 'female_singular') {
				normalReceiverObject.vocative = 'Chị'
			}
		}

		return normalReceiverObject
	}
}
