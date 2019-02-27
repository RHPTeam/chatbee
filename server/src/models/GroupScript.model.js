const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupScriptSchema = new Schema({
  name: String,
  _scripts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Script'
    }
  ],
  _ownerFb: {
    type: Schema.Types.ObjectId,
    ref: 'AccountFacebook'
  }
})

const GroupScript = mongoose.model('GroupScript', GroupScriptSchema)
module.exports = GroupScript
