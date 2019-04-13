/**
 * Controller attribute for project
 * author: hoc-anms(Sky Albert)
 * date up: 10/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require('../models/Account.model')
const Block = require('../models/Blocks.model')
const GroupBlock = require('../models/GroupBlocks.model')
const BroadCast = require('../models/Broadcasts.model')
const Sequence = require('../models/Sequence.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const fs = require('fs')
const moment = require('moment')

module.exports = {
  /**
   * Backup data from chat inbox
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*|Promise<any>>}
   */
  index: async (req, res, next) => {
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    if (DecodeRole(role, 10) !== 1 && DecodeRole(role, 10) !== 2) return res.status(405).json(JsonResponse('Bạn không có quyền thực hiện chức năng này!', null))

    fs.readFile(__dirname.includes('/') ? __dirname.replace('server/src/controllers','accountv1.txt') : __dirname.replace('server\\src\\controllers','accountv1.txt'), 'utf8', function(err, contents) {
      const result = contents.split(',,').forEach( async item => {
        const itemObject = JSON.parse(item)
        const foundUser = await Account.findOne({'email': itemObject.email})
        if (!foundUser) {
          const objDefine = {
            email: itemObject.email,
            name:  itemObject.name,
            phone: itemObject.phone,
            password: itemObject.password,
            imageAvatar: '',
            created_at: moment(itemObject.startTime).toDate(),
            expireDate: moment(itemObject.limitTime).toDate(),
            maxAccountFb: parseFloat(itemObject.FacebookCount)
          }
          const newUser = await new Account(objDefine)
          Date.now() >= (newUser.expireDate).getTime() ? newUser.status = 0 : newUser.status = 1
          await newUser.save()

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
              dateMonth: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
              hour:  date.getHours()+':'+'0'+date.getMinutes(),
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
          return  newUser
        }
      })
    });
    res.status(200).json(JsonResponse('Backup du lieu thanh cong!', null))
  }
}