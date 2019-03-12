const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendSchema = new Schema({
  alternateName: String,
  firstName: String,
  gender: String,
  userID: String,
  fullName: String,
  profilePicture: String,
  profileUrl: String,
  vanity: String,
  _account: [{
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }],
  _facebook: [ {
    type: Schema.Types.ObjectId,
    ref: 'Facebook'
  }],
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: Date
})

FriendSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})

const Friend = mongoose.model('Friend', FriendSchema)
module.exports = Friend
