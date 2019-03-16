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
    signUp: async(req, res) => {
        let role = ""
        const {
            email,
            phone
        } = req.value.body
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
            imageAvatar: req.body.imageAvatar ? base64Img.base64Sync(req.value.body.imageAvatar) : ''
        }
        const newUser = await new Account(objDefine)
        const sessionToken = await signToken(newUser)
        await res.cookie('sid', sessionToken, option)
        await res.cookie('uid', newUser._id, option)
        const expireDate = new Date(newUser.created_at)
        newUser.expireDate = expireDate.setDate(expireDate.getDate() + 3)
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
    const defaultBlockDel = await new Block()
    // deliver
    defaultDel.typeBroadCast = 'Tin nhắn gửi ngay'
    defaultDel._account = newUser._id
    await defaultDel.save()
    defaultBlockDel.name = ''
    defaultBlockDel._account = newUser._id
    await defaultBlockDel.save()
    defaultDel.blocks.push({blockId:defaultBlockDel._id})
    await defaultDel.save()
    // schedue
    const defaultSchedule = await new BroadCast()
    const defaultBlockSchedule = await new Block()
    defaultSchedule.typeBroadCast = 'Thiết lập bộ hẹn'
    defaultSchedule._account = newUser._id
    await defaultSchedule.save()
    const date = new Date()
    date.setHours(12,0,0)
    date.setDate(date.getDate()+1)
    defaultBlockSchedule.name = date.toString()
    defaultBlockSchedule._account = newUser._id
    await defaultBlockSchedule.save()
    defaultSchedule.blocks.push({blockId:defaultBlockSchedule._id})
    await defaultSchedule.save()

    // Create default sequence
    const newSeq = await new Sequence()
    newSeq.name = 'Chuỗi kịch bản'
    newSeq._account = newUser._id
    await  newSeq.save()

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
    signIn: async(req, res) => {
        let role = ""
        const foundUser = await Account.findById(req.user._id).select('-password')
            // check expire date
        if (Date.now() >= (foundUser.expireDate).getTime()) return res.status(405).json(JsonResponse('Account expire, please buy license to continue', {
            token: [],
            user: null
        }))

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
            role = randomstring.generate(10) + 1 + randomstring.generate(1997)
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
    index: async(req, res) => {
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
     * @param reqf
     * @param res
     */
    update: async(req, res) => {
      const authorization = req.headers.authorization
      const userId = Secure(res, authorization)
        const { body } = req
      let objectDefine = req.body
      objectDefine.imageAvatar = base64Img.requestBase64(req.body.imageAvatar)
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
        if (body.password) {
            return res.status(403).json(JsonResponse('Có lỗi xảy ra! Vui lòng kiểm tra lại API!', null))
        }
        const dataUserUpdated = await Account.findByIdAndUpdate(
            userId, {
                $set: objectDefine
            }, {
                new: true
            }
        ).select('-password')
        res
            .status(201)
            .json(JsonResponse('Update account successfull!', dataUserUpdated))
    },

    /**
     * delete user by id
     * @param req
     * @param res
     */
    deleteUser: async(req, res) => {
        const {
            query
        } = req
        const userId = query._userId
        const foundUser = await Account.findById(userId)
        if (!foundUser) {
            return res.status(403).json(JsonResponse('User is not found!', null))
        }
        await Account.findByIdAndRemove(userId)
        res.status(200).json(JsonResponse('Delete user successfull!', null))
    },

    /**
     * Change Password
     * @param req
     * @param res
     */
    changePassword: async(req, res) => {
        const {
            body,
            query
        } = req
        if (!query._userId) {
            return res.status(405).json(JsonResponse('Not authorized!', null))
        }
        const foundUser = await Account.findById(query._userId)
        if (!foundUser) {
            return res.status(403).json(JsonResponse('User is not found!', null))
        }
        if (JSON.stringify(query._userId) !== JSON.stringify(foundUser._id)) {
            return res.status(403).json(JsonResponse('Authorized is wrong!', null))
        }
        const isPassword = await foundUser.isValidPassword(body.password)
        if (!isPassword) {
            return res.status(403).json(JsonResponse('Password is wrong!', null))
        }
        foundUser.password = body.newPassword
        await foundUser.save()
        res.status(201).json(JsonResponse('Change Password successfully!', null))
    },

    /**
     * Change Password
     * @param req
     * @param res
     */
    createNewPassword: async(req, res) => {
        const {
            body,
            query
        } = req
        if (!query._userId) {
            return res.status(405).json(JsonResponse('Not authorized!', null))
        }
        const foundUser = await Account.findById(query._userId)
        if (!foundUser) {
            return res.status(403).json(JsonResponse('User is not found!', null))
        }
        if (JSON.stringify(query._userId) !== JSON.stringify(foundUser._id)) {
            return res.status(403).json(JsonResponse('Authorized is wrong!', null))
        }
        foundUser.password = body.newPassword
        await foundUser.save()
        res.status(201).json(JsonResponse('Change Password successfully!', null))
    },

    /**
     * Secret for unlock key token
     * @param req
     * @param res
     */
    secret: (req, res) => {
        res
            .status(200)
            .json(
                JsonResponse('resources!', 200, 'Authorization successfully!', false)
            )
    },

    /**
     * Reset password
     * @param req
     * @param res
     * @param next
     */
    resetPassword: async(req, res, next) => {
        const {
            email
        } = req.body
        if (!email) return res.status(405).json(JsonResponse('Not email!', null))
        const foundUser = await Account.findOne({
            email
        })
        if (!foundUser) {
            return res.status(405).json(JsonResponse('Not found User!', null))
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
        <span>Code: </span> ${code}
      </div>`

        await transporter.sendMail({
                from: CONFIG.gmail_email,
                to: email,
                subject: 'confirm reset password',
                html: html
            },
            (err, info) => {
                if (err) return next(err)
            }
        )
        const updateUser = await Account.findOneAndUpdate({
            email
        }, {
            code: code
        })
        if (!updateUser) {
            return res.status(405).json(JsonResponse('Update false!', null))
        }
        updateUser.save()
            /**
             * Cron job runs every minute set
             */
        await new CronJob(
            '5 * * * * *',
            async() => {
                const user = await Account.findById(foundUser._id)
                if (user.code === '' || user.code === null) return false
                user.code = ''
                user.save()
                return true
            },
            null,
            true,
            'Asia/Ho_Chi_Minh'
        )
        return res
            .status(201)
            .json(JsonResponse('Reset Password successfully!', null))
    },
    /**
     * Check code
     * @param req
     * @param res
     * @param next
     */
    checkCode: async(req, res, next) => {
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
        foundUser.code = ''
        foundUser.save()
        return res.status(201).json(JsonResponse('Code successfully!', null))
    },
    test: async(req, res) => {
        console.log(req.headers)
    }
}