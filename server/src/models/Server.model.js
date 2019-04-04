
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServerSchema = new Schema({
  name: String,
  ip: String,
  link: String,
  maxUser: Number,
  currentUser: Number,
  status: {type: Number, default: 1},
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: Date
})

ServerSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})

const Server = mongoose.model('Server', ServerSchema)
module.exports = Server