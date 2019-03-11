const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlternateNameSchema = new Schema({
  name: String,
  friends: [
  ],
  _ownerFb: {
    type: Schema.Types.ObjectId,
    ref: 'AccountFacebook'
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }

})

const AlternateName = mongoose.model('AlternateName', AlternateNameSchema)
module.exports = AlternateName
