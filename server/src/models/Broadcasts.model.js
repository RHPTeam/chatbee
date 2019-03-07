const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BroadcastSchema = new Schema(
  {
    type: "Deliver",
    blocks: [
      {
        id: String,
        _friends: []
      }
    ],
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: Date
  },
  {
    type: "Schedule",
    blocks: [
      {
        id: String,
        _friends: [ {
          type: Schema.Types.ObjectId,
          ref: 'Facebook'
        }],
        timeSetting: {
          dateMonth: String,
          hour: String,
          repeat: {
            type: String,
            value: String
          }
        }
      }
    ],
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: Date
  }
)

BroadcastSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})


const Broadcast = mongoose.model('Broadcast', BroadcastSchema)
module.exports = Broadcast
