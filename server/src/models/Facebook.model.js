const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacebookSchema = new Schema({
  cookie: String,
  userInfo: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    thumbSrc: {
      type: String,
      default: ''
    },
    profileUrl: {
      type: String,
      default: ''
    }
  },
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

FacebookSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})

const Facebook = mongoose.model('Facebook', FacebookSchema)
module.exports = Facebook