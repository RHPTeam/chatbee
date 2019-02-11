const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  level: String,
  _members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ]
})

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role
