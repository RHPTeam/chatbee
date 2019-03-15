/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 14/03/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require ('../models/Account.model')
const Friend = require('../models/Friends.model')
const Block = require('../models/Blocks.model')
const Sequence = require('../models/Sequence.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')

module.exports = {
  /**
   * Get all(id) broadcast
   * @param: req
   * @param: res
   */
  index: async (req, res) => {
    let dataResponse = null
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    if (DecodeRole(role, 10) === 0) {
      !req.query._id ? dataResponse = await Sequence.find({'_account': userId}) : dataResponse = await Sequence.find({'_id':req.query._id, '_account': userId})
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Sequence.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   * create sequence
   * @param: req
   * @param: res
   */
  create: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundAllSequence = await Sequence.find({})

    // check name sequence exists
    let checkName = false
    foundAllSequence.map(val => {
      if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
        checkName = true
        return checkName
      }
    })
    if (checkName) return res.status(405).json(JsonResponse('Tên trình tự kịch bản đã tồn tại!', null))

    const newSeq = await new Sequence()
    newSeq.name = req.body.name
    newSeq._account = userId
    await  newSeq.save()

    res.status(200).json(JsonResponse('Tạo trình tự kịch bản thành công!', newSeq))
  },
  /**
   * add block to sequence
   * @param: req
   * @param: res
   */
  addBlock: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
  },
  /**
   * update sequence
   * @param: req
   * @param: res
   */
  update: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundSequence = await Sequence.findOne({'_id':req.query._sqId,'_account':userId})
    if(!foundSequence) return res.status(403).json(JsonResponse('Trình tự kịch bản không tồn tại!', null))
    const foundAllSequence = await Sequence.find({})
    // check name sequence exists
    let checkName = false
    foundAllSequence.map(val => {
      if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
        checkName = true
        return checkName
      }
    })
    if (checkName) return res.status(405).json(JsonResponse('Tên trình tự kịch bản với tên này đã tồn tại!', null))
    foundSequence.name = req.body.name
    await foundSequence.save()
    res.status(201).json(JsonResponse('Cập nhật trình tự kịch bản thành công!', foundSequence))
  },
  /**
   * delete sequence
   * @param: req
   * @param: res
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundSequence = await Sequence.findOne({'_id':req.query._sqId,'_account':userId})
    if(!foundSequence) return res.status(403).json(JsonResponse('Trình tự kịch bản không tồn tại!', null))
  },
}