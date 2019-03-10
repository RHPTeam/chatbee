const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttributeSchema = new Schema({
  name: String,
  value: String, 
  _account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  _friends: [{
      type: Schema.Types.ObjectId,
      ref: 'Facebook'
  }],
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: Date
})

AttributeSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})

const Attribute = mongoose.model('Attribute', AttributeSchema)
module.exports = Attribute
