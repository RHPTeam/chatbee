const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageFacebookSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  sender: {
    id: String,
    name: String,
    url: String
  },
  receiver: {
    id: String,
    name: String,
    url: String,
    image: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  status: String,
  contentMessage: [{
  }]
})

const MessageFacebook = mongoose.model('MessageFacebook', MessageFacebookSchema)
module.exports = MessageFacebook
