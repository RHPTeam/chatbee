const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BroadcastSchema = new Schema({
  typeBroadCast: String,
  blocks: [
    {
      content: [
        {
          valueText: String,
          typeContent: String
        }
      ],
      _friends: [ {
        type: Schema.Types.ObjectId,
        ref: 'Friend'
      }],
      timeSetting: {
        dateMonth: String,
        hour: String,
        repeat: {
          typeRepeat: String,
          valueRepeat: String
        }
      }
    }
  ],
  status:{type: Boolean, default: 0},
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

BroadcastSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})


const Broadcast = mongoose.model('Broadcast', BroadcastSchema)
module.exports = Broadcast
