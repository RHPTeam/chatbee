const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendsFacebookSchema = new Schema({
  alternateName: String,
  firstName: String,
  gender: String,
  userID: String,
  fullName: String,
  profilePicture: String,
  profileUrl: String,
  vanity: String,
  _ownerFb: []
})

const FriendsFacebook = mongoose.model('FriendsFacebook', FriendsFacebookSchema)
module.exports = FriendsFacebook
