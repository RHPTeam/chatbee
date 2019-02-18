/**
 * Controller users or account for project
 * author: Sky Albert
 * date up: 07/02/2019
 * date to: ___
 * team: BE-RHP
 */

const JWT = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const CONFIG = require('../configs/configs')
const Account = require('../models/Account.model')

const JsonResponse = require('../configs/res')
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
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, CONFIG.JWT_SECRET)
}

module.exports = {

  /**
   * Register By User
   * @param req
   * @param res
   */
  signUp: async (req, res) => {
    const {
      email
    } = req.value.body
    const foundUserEmail = await Account.findOne({
      email
    })
    if (foundUserEmail) return res.status(404).json(JsonResponse('Email is exists!', null))
    const newUser = await new Account(req.value.body)
    const sessionToken = await signToken(newUser)
    await res.cookie('sid', sessionToken, option)
    await res.cookie('uid', newUser._id, option)
    await newUser.save()
    res.status(200).json(JsonResponse('Successfully!', {
      _id: newUser._id,
      email: newUser.email,
      token: sessionToken
    }))
  },

  /**
   * Login Local Using Passport Middleware By User
   * @param req
   * @param res
   */
  signIn: async (req, res) => {
    // Generate the token
    const foundUser = await Account.findById(req.user._id).select('-password')
    const sessionToken = await signToken(req.user)
    res.cookie('sid', sessionToken)
    res.status(200).json(JsonResponse('Successfully!', {
      token: sessionToken,
      user: foundUser
    }))
  },

  /**
   * Get User (Query can get one data)
   * @param req
   * @param res
   */
  index: async (req, res) => {
    const dataFound = await Account.find(req.query).select('-password')
    if (!dataFound) return res.status(403).json(JsonResponse('Data is not found!', null))
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },

  /**
   * Update User (Note: Have to header['Authorization']
   * @param req
   * @param res
   */
  update: async (req, res) => {
    const {
      body,
      query
    } = req
    if (!query._userId) return res.status(405).json(JsonResponse('Not authorized!', null))
    const foundUser = await Account.findById(query._userId)
    if (!foundUser) return res.status(403).json(JsonResponse('User is not found!', null))
    if (JSON.stringify(query._userId) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    const dataUserUpdated = await Account.findByIdAndUpdate(query._userId, {
      $set: body
    }, {
      new: true
    }).select('-password')
    res.status(201).json(JsonResponse('Update account successfull!', dataUserUpdated))
  },

  /**
   * delete user by id
   * @param req
   * @param res
   */
  deleteUser: async (req, res) => {
    const {
      query
    } = req
    const userId = query._userId
    const foundUser = await Account.findById(userId)
    if (!foundUser) return res.status(403).json(JsonResponse('User is not found!', null))
    await Account.findByIdAndRemove(userId)
    res.status(200).json(JsonResponse('Delete user successfull!', null))
  },

  /**
   * Change Password
   * @param req
   * @param res
   */
  changePassword: async (req, res) => {
    const {
      body,
      query
    } = req
    if (!query._userId) return res.status(405).json(JsonResponse('Not authorized!', null))
    const foundUser = await Account.findById(query._userId)
    if (!foundUser) return res.status(403).json(JsonResponse('User is not found!', null))
    if (JSON.stringify(query._userId) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    const isPassword = await foundUser.isValidPassword(body.password)
    if (!isPassword) return res.status(403).json(JsonResponse('Password is wrong!', null))
    foundUser.password = body.newPassword
    await foundUser.save()
    res.status(201).json(JsonResponse("Change Password successfully!", null))
  },

  /**
   * Secret for unlock key token
   * @param req
   * @param res
   */
  secret: (req, res) => {
    res.status(200).json(JsonResponse('resources!', 200, 'Authorization successfully!', false))
  },

  /**
   * Reset password
   * @param req
   * @param res
   * @param next
   */
  resetPassword: async (req, res, next) => {
    const {
      email
    } = req.body;
    if (!email) return res.status(405).json(JsonResponse('Not email!', null))
    const foundUser = await Account.findOne({email});
    if (!foundUser) return res.status(405).json(JsonResponse('Not found User!', null))

    let code = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      code += possible.charAt(Math.floor(Math.random() * possible.length));

    // Use Smtp Protocol to send Email
    const transporter = await nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: CONFIG.gmail_email,
        pass: CONFIG.gmail_password
      }
    });

    const html = `
      <div>
        <span>Code: </span> ${code}
      </div>`;

    await transporter.sendMail({
      from: CONFIG.gmail_email,
      to: email,
      subject: 'confirm reset password',
      html: html,
    }, (err, info) => {
      if (err) return next(err);
    })
    const updateUser = await Account.findOneAndUpdate({email}, {code: code});
    if(!updateUser) return res.status(405).json(JsonResponse('Update false!', null));
    updateUser.save();
    return res.status(201).json(JsonResponse("Reset Password successfully!", null));
  },
  /**
   * Check code
   * @param req
   * @param res
   * @param next
   */
  checkCode: async (req, res, next) => {
    const { email, code } = req.body;
    if (!email || !code) return res.status(405).json(JsonResponse('Not email or not code!', null));
    const foundUser = await Account.findOne({email});
    if (!foundUser) return res.status(405).json(JsonResponse('Not found User!', null));
    if (code !== foundUser.code) return res.status(405).json(JsonResponse('Code false!', null));
    const updateUser = await Account.findOneAndUpdate({email}, {code: ""});
    if(!updateUser) return res.status(405).json(JsonResponse('Update false!', null));
    updateUser.save();
    return res.status(201).json(JsonResponse("Code successfully!", null));
  }
}