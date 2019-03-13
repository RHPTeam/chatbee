const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupBlockSchema = new Schema({
  name: String,
  blocks: [{
    type: Schema.Types.ObjectId,
    ref: 'Block'
  }],
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

GroupBlockSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})


const GroupBlock = mongoose.model('GroupBlock', GroupBlockSchema)
module.exports = GroupBlock
