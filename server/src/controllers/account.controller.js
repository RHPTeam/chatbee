/**
 * Controller users or account for project
 * author: Sky Albert
 * date up: 07/02/2019
 * date to: ___
 * team: BE-RHP
 */

const JWT = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const CronJob = require('cron').CronJob
const base64Img = require('base64-img')
const randomstring = require("randomstring")

const CONFIG = require('../configs/configs')
const Account = require('../models/Account.model')
const Block = require('../models/Blocks.model')
const GroupBlock = require('../models/GroupBlocks.model')
const BroadCast = require('../models/Broadcasts.model')
const Sequence = require('../models/Sequence.model')

const JsonResponse = require('../configs/res')
const checkPhone = require('../helpers/util/checkPhone.util')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const fs = require('fs')


// set one cookie
const option = {
  maxAge: 1000 * 60 * 60 * 24, // would expire after 1 days
  httpOnly: true, // The cookie only accessible by the web server
  signed: true, // Indicates if the cookie should be signed
  secure: true
}

const signToken = user => {
  return JWT.sign({
      iss: 'RHPTeam',
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    CONFIG.JWT_SECRET
  )
}

module.exports = {
  /**
   * Register By User
   * @param req
   * @param res
   */
  signUp: async (req, res) => {
    let role = ""
    const {email, phone} = req.value.body
    const isPhone = checkPhone(req.value.body.phone)
    if (isPhone === false) {
      return res
        .status(403)
        .json(JsonResponse('Number phone is not correctly!', null))
    }
    const foundUserEmail = await Account.findOne({
      email
    })
    if (foundUserEmail) {
      return res.status(404).json(JsonResponse('Email is exists!', null))
    }
    const foundUserPhone = await Account.findOne({
      phone
    })
    if (foundUserPhone) {
      return res.status(404).json(JsonResponse('Number phone is exists!', null))
    }

    const objDefine = {
      email: req.value.body.email,
      name: req.value.body.name,
      phone: req.value.body.phone,
      password: req.value.body.password,
      imageAvatar: ''
    }
    const newUser = await new Account(objDefine)
    const sessionToken = await signToken(newUser)
    await res.cookie('sid', sessionToken, option)
    await res.cookie('uid', newUser._id, option)
    const expireDate = new Date(newUser.created_at)
    newUser.expireDate = expireDate.setDate(expireDate.getDate() + 3)
    Date.now() >= (newUser.expireDate).getTime() ? newUser.status = 0 :  newUser.status = 1
    await newUser.save()
    newUser._role.toString() === '5c6a59f61b43a13350fe65d8' ? res.cookie('c_fr', 0, option) : newUser._role.toString() === '5c6a598f1b43a13350fe65d6' ? res.cookie('c_fr', 1, option) : newUser._role.toString() === '5c6a57e7f02beb3b70e7dce0' ? res.cookie('c_fr', 2, option) : res.status(405).json(JsonResponse('You are not assign!', null))

    // create group default when signup
    const defaultGroup = await new GroupBlock()
    defaultGroup.name = 'Mặc Định'
    defaultGroup._account = newUser._id
    await defaultGroup.save()

    // create block welcome in default
    const defaultBlock = await new Block()
    defaultBlock.name = 'Welcome'
    defaultBlock._account = newUser._id
    defaultBlock._groupBlock = defaultGroup._id
    await defaultBlock.save()
    defaultGroup.blocks.push(defaultBlock._id)
    await defaultGroup.save()

    // Create block default in broadcast type schedule, deliver
    const defaultDel = await new BroadCast()
    // deliver
    defaultDel.typeBroadCast = 'Tin nhắn gửi ngay'
    defaultDel._account = newUser._id
    await defaultDel.save()
    // schedue
    const defaultSchedule = await new BroadCast()
    defaultSchedule.typeBroadCast = 'Thiết lập bộ hẹn'
    defaultSchedule._account = newUser._id
    await defaultSchedule.save()
    const date = new Date()
    date.setHours(12, 0, 0)
    date.setDate(date.getDate() + 1)
    defaultSchedule.blocks.push({
      timeSetting: {
        dateMonth: date,
        hour:  date.getHours()+':'+date.getMinutes(),
        repeat: {
          typeRepeat: 'Không',
          valueRepeat: ''
        }
      }
    })
    await defaultSchedule.save()

    // Create default sequence
    const newSeq = await new Sequence()
    newSeq.name = 'Chuỗi kịch bản 0'
    newSeq._account = newUser._id
    await newSeq.save()

    // Add cfr to data storage of browser
    if (newUser._role.toString() === '5c6a59f61b43a13350fe65d8') {
      role = randomstring.generate(10) + 0 + randomstring.generate(1997)
    } else if (newUser._role.toString() === '5c6a598f1b43a13350fe65d6') {
      role = randomstring.generate(10) + 1 + randomstring.generate(1997)
    } else if (newUser._role.toString() === '5c6a57e7f02beb3b70e7dce0') {
      role = randomstring.generate(10) + 1 + randomstring.generate(1997)
    }
    res.status(200).json(
      JsonResponse('Successfully!', {
        _id: newUser._id,
        email: newUser.email,
        token: sessionToken,
        role: role
      })
    )
  },

  /**
   * Login Local Using Passport Middleware By User
   * @param req
   * @param res
   */
  signIn: async (req, res) => {
    let role = ""
    const foundUser = await Account.findById(req.user._id).select('-password')
    // check expire date
    if (Date.now() >= (foundUser.expireDate).getTime()){
      await Account.findByIdAndUpdate(req.user._id, {$set: {'status':0}}, {new:true})
      return res.status(405).json(JsonResponse('Account expire, please buy license to continue', {
        token: [],
        user: null
      }))
    }
    if (foundUser.status === false) return res.status(405).json(JsonResponse('Tài khoản của bạn đã ngừng hoạt động vui lòng liên hệ hỗ trợ!', null))
    // Generate the token
    const sessionToken = await signToken(req.user)
    res.cookie('sid', sessionToken, option)
    res.cookie('uid', foundUser._id.toString(), option)
    foundUser._role.toString() === '5c6a59f61b43a13350fe65d8' ? res.cookie('c_fr', 0) : foundUser._role.toString() === '5c6a598f1b43a13350fe65d6' ? res.cookie('c_fr', 1, option) : foundUser._role.toString() === '5c6a57e7f02beb3b70e7dce0' ? res.cookie('c_fr', 2, option) : res.status(405).json(JsonResponse('You are not assign!', null))
    if (foundUser._role.toString() === '5c6a59f61b43a13350fe65d8') {
      role = randomstring.generate(10) + 0 + randomstring.generate(1997)
    } else if (foundUser._role.toString() === '5c6a598f1b43a13350fe65d6') {
      role = randomstring.generate(10) + 1 + randomstring.generate(1997)
    } else if (foundUser._role.toString() === '5c6a57e7f02beb3b70e7dce0') {
      role = randomstring.generate(10) + 2 + randomstring.generate(1997)
    }
    res.status(200).json(
      JsonResponse('Successfully!', {
        token: sessionToken,
        user: foundUser,
        role: role
      })
    )
  },

  /**
   * Get User (Query can get one data)
   * @param req
   * @param res
   */
  index: async (req, res) => {
    const dataFound = await Account.find(req.query)
      .select('-password')
      .populate({
        path: '_role',
        select: 'level'
      })
    if (!dataFound) {
      return res.status(403).json(JsonResponse('Data is not found!', null))
    }
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },

  /**
   * Update User (Note: Have to header['Authorization']
   * @param req
   * @param res
   */
  update: async (req, res) => {
    const {body} = req
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId)
    if (!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))

    if (body.imageAvatar) {
      base64Img.requestBase64(body.imageAvatar, async (err, res, body) => {
        console.log(body)
        if (err) return err
        foundUser.imageAvatar = body
        await Account.findByIdAndUpdate(foundUser._id, {$set: {imageAvatar: body}}, {new: true}).select('-password')
      })
      var base64Image = new Buffer(body.imageAvatar, 'binary').toString('base64');
      console.log(base64Image)

    }
    const dataResponse = await Account.findByIdAndUpdate(
      userId, {
        $set: body
      }, {
        new: true
      }
    ).select('-password')
    res
      .status(201)
      .json(JsonResponse('Update account successfull!', dataResponse))
  },
  /**
   * Update expire for users by admin
   * @param req
   * @param res
   */
  updateExpire: async (req, res) => {
    const authorization = req.headers.authorization
    const role = req.headers.cfr
    const userId = Secure(res, authorization)
    const accountAdminResult = await Account.findById(userId)
    if (!accountAdminResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    if (accountAdminResult._role.toString() !== '5c6a598f1b43a13350fe65d6' &&  accountAdminResult._role.toString() !== '5c6a57e7f02beb3b70e7dce0') return res.status(405).json(JsonResponse('Bạn không có quyền truy cập !!!!!!', null))
    if (DecodeRole(role, 10) === 1 ) {
      const foundUser = await Account.findById(req.query._userId).select('-password ')
      if (!foundUser) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
      if (foundUser._role.toString() === '5c6a598f1b43a13350fe65d6' ||  foundUser._role.toString() === '5c6a57e7f02beb3b70e7dce0') return res.status(405).json(JsonResponse('Bạn không có quyền thực hiện chức năng này!', null))
      if (req.body._role) return res.status(405).json(JsonResponse("Bạn không được cài đặt quyền người dùng!", null))
      const result = await Account.findByIdAndUpdate(req.query._userId, {$set: req.body}, {new:true})
      return res.status(201).json(JsonResponse('Gia hạn người dùng thành công!', result ))
    }
    if (DecodeRole(role, 10) === 2) {
      const foundUser = await Account.findById(req.query._userId).select('-password')
      if (!foundUser) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
      if (foundUser._role.toString() === '5c6a57e7f02beb3b70e7dce0') return res.status(405).json(JsonResponse('Bạn không có quyền thực hiện chức năng này!', null))
      const objUpdate = {
        expireDate: req.body.expireDate,
        maxAccountFb: req.body.maxAccountFb,
        status: (req.body.status === true || req.body.status === false ) ? req.body.status : foundUser.status
      }
      if (req.body._role) {
        if (ConvertUnicode(req.body._role.trim().toLowerCase()).toString() === 'member'){
          objUpdate['_role'] = '5c6a59f61b43a13350fe65d8'
        }
        if (ConvertUnicode(req.body._role.trim().toLowerCase()).toString() === 'admin') {
          objUpdate['_role'] = '5c6a598f1b43a13350fe65d6'
        }
        if (ConvertUnicode(req.body._role.trim().toLowerCase()).toString() === 'superadmin') {
          objUpdate['_role'] = '5c6a57e7f02beb3b70e7dce0'
        }
      }
      const result = await Account.findByIdAndUpdate(req.query._userId, {$set: objUpdate}, {new:true})
      return res.status(201).json(JsonResponse('Gia hạn người dùng thành công!', result ))
    }
    res.status(405).json(JsonResponse('Bạn không có quyền truy cập !!!!!!', null))
  },
  /**
   * delete user by id
   * @param req
   * @param res
   */
  deleteUser: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId)
    if (!foundUser) {
      return res.status(403).json(JsonResponse('User is not found!', null))
    }
    if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      await Account.findByIdAndRemove(userId)
      res.status(200).json(JsonResponse('Delete user successfull!', null))
    }
    res.status(405).json(JsonResponse('Only Admin and SuperAdmin do action!!', null))

  },

  /**
   * Change Password
   * @param req
   * @param res
   */
  changePassword: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const {
      body
    } = req
    if (!userId) {
      return res.status(405).json(JsonResponse('Not authorized!', null))
    }
    const foundUser = await Account.findById(userId)
    if (!foundUser) {
      return res.status(403).json(JsonResponse('User is not found!', null))
    }
    if (JSON.stringify(userId) !== JSON.stringify(foundUser._id)) {
      return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    }
    const isPassword = await foundUser.isValidPassword(body.password)
    if (!isPassword) {
      return res.status(403).json(JsonResponse('Password is wrong!', null))
    }
    await Account.findByIdAndUpdate(foundUser._id, {$set: {password: body.newPassword}}, {new: true}).select('-password')
    res.status(201).json(JsonResponse('Change Password successfully!', null))
  },

  /**
   * Change Password
   * @param req
   * @param res
   */
  createNewPassword: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const {
      body
    } = req
    if (!userId) {
      return res.status(405).json(JsonResponse('Not authorized!', null))
    }
    const foundUser = await Account.findById(userId)
    if (!foundUser) {
      return res.status(403).json(JsonResponse('User is not found!', null))
    }
    if (JSON.stringify(userId) !== JSON.stringify(foundUser._id)) {
      return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    }
    await Account.findByIdAndUpdate(foundUser._id, {$set: {password: body.newPassword}}, {new: true}).select('-password')
    res.status(201).json(JsonResponse('Change Password successfully!', null))
  },

  /**
   * Reset password
   * @param req
   * @param res
   * @param next
   */
  resetPassword: async (req, res, next) => {
    if (!req.body.email) return res.status(405).json(JsonResponse('Vui lòng cung cấp email!', null))
    const foundUser = await Account.findOne({
      email: req.body.email
    })
    if (!foundUser) {
      return res.status(405).json(JsonResponse('Người dùng không tồn tại!', null))
    }

    let code = ''
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < 6; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    // Use Smtp Protocol to send Email
    const transporter = await nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: CONFIG.gmail_email,
        pass: CONFIG.gmail_password
      }
    })

    const html = `
      <div>
        <img src="http://zinbee.vn/assets/landing/image/logo/zinbee.png"> <br>
        <span style="font-size: 20px">Email tự động xác nhận passcode</span><br>
        <span style="font-size: 20px"><b>Code: ${code}</b> </span> 
      </div>`

    await transporter.sendMail({
        from: CONFIG.gmail_email,
        to: req.body.email,
        subject: 'Confirm reset password',
        html: html
      },
      (err, info) => {
        if (err) return next(err)
      }
    )
    const updateUser = await Account.findOneAndUpdate({
      email: req.body.email
    }, {
      code: code
    }).select('-password')
    if (!updateUser) {
      return res.status(405).json(JsonResponse('Lỗi trong quá trình cập nhật mật khẩu!', null))
    }
    /**
     * Cron job runs every minute set
     */
    await new CronJob(
      '5 * * * * *',
      async () => {
        const user = await Account.findById(foundUser._id)
        if (user.code === '' || user.code === null) return false
        user.code = ''
        await Account.findByIdAndUpdate(foundUser._id, {$set: {code: ''}}, {new: true}).select('-password')
        return true
      },
      null,
      true,
      'Asia/Ho_Chi_Minh'
    )
    return res
      .status(201)
      .json(JsonResponse('Cập nhật mật khẩu thành công!', null))
  },
  /**
   * Check code
   * @param req
   * @param res
   * @param next
   */
  checkCode: async (req, res, next) => {
    const {
      email,
      code
    } = req.body
    if (!email || !code) {
      return res.status(405).json(JsonResponse('Not email or not code!', null))
    }
    const foundUser = await Account.findOne({
      email
    })
    if (!foundUser) {
      return res.status(405).json(JsonResponse('Not found User!', null))
    }
    if (code !== foundUser.code) {
      return res.status(405).json(JsonResponse('Code false!', null))
    }
    await Account.findByIdAndUpdate(foundUser._id, {$set: {code: ''}}, {new: true}).select('-password')
    return res.status(201).json(JsonResponse('Code successfully!', null))
  },

  upload: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    foundUser.imageAvatar = CONFIG.URL + '/' + ((req.file.path).replace(/\\/gi, "/"))
    await Account.findByIdAndUpdate(userId, {$set: {imageAvatar: foundUser.imageAvatar}}, {new: true}).select('-password')
    res.status(200).json(JsonResponse('Cập nhật ảnh đại diện thành công', foundUser.imageAvatar))
  }
}