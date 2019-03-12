const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SendTimerSchema = new Schema(
  {
    _tagIdList: [],
    content: String,
    timerStart: Date,
    timerDelay: {
      valueTimer: {
        type: String,
        default: 5
      },
      typeTimer: {
        type: Number,
        default: 1
      }
    }
  },
  { minimize: false }
)

const SendTimer = mongoose.model('SendTimer', SendTimerSchema)
module.exports = SendTimer
