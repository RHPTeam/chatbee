const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const AccountSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  status: Boolean,
  _role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  _accountfb: [{
    type: Schema.Types.ObjectId,
    ref: 'AccountFacebook'
  }]
})

AccountSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const passwordHased = await bcrypt.hash(this.password, salt)
    this.password = passwordHased
    next()
  } catch (error) {
    next(error)
  }
})

// =================== METHODS ========================= //

AccountSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const Account = mongoose.model('Account', AccountSchema)
module.exports = Account
