const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountFacebookSchema = new Schema({
  username: String,
  password: String,
  cookie: String,
  status: String,
  type: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
})

const AccountFacebook = mongoose.model('AccountFacebook', AccountFacebookSchema)
module.exports = AccountFacebook
