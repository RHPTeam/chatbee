const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageFacebookSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  _ownerFb: {
    type: Schema.Types.ObjectId,
    ref: 'AccountFacebook'
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
    image: String,
    tag: {
      type: Schema.Types.ObjectId,
      ref: 'TagVariable'
    }
  },
  isRead: {
    type: Boolean,
    default: false
  },
  status: String,
  contentMessage: [
    {
      body: String,
      reference: {
        type: Number,
        default: 1
      },
      timeStamp: Date
    }
  ],
  potentialCustomer: []
})

const MessageFacebook = mongoose.model('MessageFacebook', MessageFacebookSchema)
module.exports = MessageFacebook
