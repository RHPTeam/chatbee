const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VocateSchema = new Schema({
  name: String,
  _account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  _friends: [{
      type: Schema.Types.ObjectId,
      ref: 'Friend'
  }],
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: Date
})

VocateSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})

const Vocate = mongoose.model('Vocate', VocateSchema)
module.exports = Vocate
