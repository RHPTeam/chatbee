const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupFriendSchema = new Schema({
  name: String,
  _friends: [],
  _account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: Date
})

GroupFriendSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})

const GroupFriend = mongoose.model('GroupFriend', GroupFriendSchema)
module.exports = GroupFriend
