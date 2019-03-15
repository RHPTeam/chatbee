const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SequenceSchema = new Schema({
  name: String,
  sequences: [
    {
        time: String,
        _block: {
          type: Schema.Types.ObjectId,
          ref: 'Block'
        }
    }
  ], 
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

SequenceSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})

const Sequence = mongoose.model('Sequence', SequenceSchema)
module.exports = Sequence
