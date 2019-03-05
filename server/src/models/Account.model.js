const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const AccountSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  status: Boolean,
  code: String,
  expireDate: {
    type: Number,
    default: 3
  },
  maxAccountFb: {
    type: Number,
    default: 2
  },
  imageAvatar: String,
  _role: {
    type: Schema.Types.ObjectId,
    default: '5c6a59f61b43a13350fe65d8',
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
