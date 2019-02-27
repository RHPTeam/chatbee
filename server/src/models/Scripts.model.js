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
      typeScript: String
    }
  ],
  _ownerFb: {
    type: Schema.Types.ObjectId,
    ref: 'AccountFacebook'
  }
})

const Script = mongoose.model('Script', ScriptSchema)
module.exports = Script
