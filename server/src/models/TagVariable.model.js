const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagVariableSchema = new Schema({
  nameKey: String,
  valueKey: String,
  _scripts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Script'
    }
  ]
})

const TagVariable = mongoose.model('TagVariable', TagVariableSchema)
module.exports = TagVariable
