const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rcrypt = require('../secures')

const AccountSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  status: Boolean,
  code: String,
  expireDate: Date,
  maxAccountFb: {
    type: Number,
    default: 2
  },
  presenter: String,
  imageAvatar: String,
  _role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  _accountfb: [{
    type: Schema.Types.ObjectId,
    ref: 'AccountFacebook'
  }],
  _server: {
    type: Schema.Types.ObjectId,
    ref: 'Server'
  },
  settings:{
    themeCustom: {
      typeTheme: {type: String, default: 'auto'},
      valueTheme: String
    },
    system: {
      tutorial:{type: Number , default: 1},
      suggest:{type: Number , default: 1}
    }
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: Date
})

AccountSchema.pre('save', async function (next) {
  try {
    this.password = await rcrypt.encode(this.password, 10)
    this.updated_at = Date.now()
    next()
  } catch (error) {
    next(error)
  }
})

// =================== METHODS ========================= //

AccountSchema.methods.isValidPassword = async function (newPassword) {
  try {
    const password = this.password
    return await rcrypt.unlock(newPassword, password)
  } catch (error) {
    throw new Error(error)
  }
}

const Account = mongoose.model('Account', AccountSchema)
module.exports = Account
