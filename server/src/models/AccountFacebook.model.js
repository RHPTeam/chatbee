const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountFacebookSchema = new Schema({
  email: String,
  password: String,
  cookie: String,
  status: String,
  type: String,
  userInfo: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    thumbSrc: {
      type: String,
      default: ''
    },
    profileUrl: {
      type: String,
      default: ''
    }
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
})

const AccountFacebook = mongoose.model('AccountFacebook', AccountFacebookSchema)
module.exports = AccountFacebook
