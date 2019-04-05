const Friend = require('../models/Friends.model')

const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')

module.exports = {
	updateFriend: async (account, newFriend) => {
		newFriend.map(async friend => {
			const listFriendInfo = {
				alternateName: friend.alternateName,
				firstName: friend.firstName,
				gender: friend.gender,
				userID: friend.userID,
				fullName: friend.fullName,
				profilePicture: friend.profilePicture,
				profileUrl: friend.profileUrl,
				vanity: friend.vanity,
			}

			const friendResult = await Friend.findOne({ 'userID': friend.userID })

			if (friendResult) {
				const isInArrayFb = friendResult._facebook.some((id) => {
					return id.equals(account._id);
				})
				if (!isInArrayFb) {
					friendResult._facebook.push(account._id)
				}
				const isInArray = friendResult._account.some((id) => {
					return id.equals(account._account);
				})
				if (!isInArray) {
					friendResult._account.push(account._account)
				}
				await friendResult.save()
			} else {
				const friendSaver = await new Friend(listFriendInfo)

				// filter friend not exist fullName = nguoi dung facebook
				if (ConvertUnicode(friendSaver.fullName.toLowerCase()).toString() === 'nguoi dung facebook'){
					await Friend.deleteOne(friendSaver)
					return
				}
				friendSaver._facebook.push(account._id)
				const isInArray = friendSaver._account.some((id) => {
					return id.equals(account._account);
				})
				if (!isInArray) {
					friendSaver._account.push(account._account)
					await  friendSaver.save()
				}
				await  friendSaver.save()
			}
		})
	}
}