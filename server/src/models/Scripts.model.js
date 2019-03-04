const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScriptSchema = new Schema({
  name: String,
  _group: {
    type: Schema.Types.ObjectId,
    ref: 'GroupScript'
  },
  contents: [
    {
      text: String,
      typeScript: {
        image: String,
        timer: String
      }
    }
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

const Script = mongoose.model('Script', ScriptSchema)
module.exports = Script
