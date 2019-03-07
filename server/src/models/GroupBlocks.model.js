const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupBlockSchema = new Schema({
  name: String,
  contents: [
    {
      valueText: String,
      type: String
    }
  ],
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


const GroupBlock = mongoose.model('Block', GroupBlockSchema)
module.exports = GroupBlock
