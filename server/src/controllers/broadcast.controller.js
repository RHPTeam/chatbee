/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 12/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require ('../models/Account.model')
const Broadcast = require ('../models/Broadcasts.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')

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
      !req.query ? dataResponse = await Broadcast.find({'_account': userId}) : dataResponse = await Broadcast.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Broadcast.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   * Create broadcast
   * @param: req
   * @param: res
   */
  create: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))

    const foundBroadcastDel = await Broadcast.findOne({'typeBroadCast': 'Deliver', '_account': req.query._userId})
    const foundBroadcastSch = await Broadcast.findOne({'typeBroadCast': 'Schedule', '_account': req.query._userId})
    const newBroadcastDel = await new Broadcast()
    const newBroadcastSch = await new Broadcast()
    if(!foundBroadcastDel && !foundBroadcastSch) {
      newBroadcastDel.typeBroadCast = 'Deliver'
      await  newBroadcastDel.save()

      newBroadcastSch.typeBroadCast = 'Schedule'
      await newBroadcastSch.save()

     return res.status(200).json(JsonResponse('Tạo broadcast thành công !', null))
    }
    if (!foundBroadcastDel) {
      newBroadcastDel.typeBroadCast = 'Deliver'
      await  newBroadcastDel.save()
      return res.status(200).json(JsonResponse('Tạo broadcast thành công !', null))
    }
    if (!foundBroadcastSch) {
      newBroadcastSch.typeBroadCast = 'Schedule'
      await newBroadcastSch.save()
      return res.status(200).json(JsonResponse('Tạo broadcast thành công !', null))
    }
    res.status(403).json(JsonResponse('Bạn đã tạo broadcast trước đó!', null))
  },
  /**
   * Update broadcast
   * @param: req
   * @param: res
   */
  update: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))


  },
  /**
   * add block to broadcast
   * @param: req
   * @param: res
   */
  addBlock: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBroadcast = await  Broadcast.findById(req.query._bdId)
    if(!foundBroadcast) return res.status(403).json(JsonResponse('Broadcast không tồn tại!', null))
    if (req.query._blockId) {
      const foundBlock = foundBroadcast.blocks.filter(id => id === req.query._blockId)
      foundBlock._friends.push(req.body.friendId)
      await foundBroadcast.save()
    }
    foundBroadcast.blocks.push({blockId:req.body.blockId})
    await foundBroadcast.save()
    res.status(200).json(JsonResponse('Thêm block trong broadcast thành công!', foundBroadcast))
  },
  /**
   * Delete broadcast
   * @param: req
   * @param: res
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBroadcast = await  Broadcast.findById(req.query._bdId)
    if(!foundBroadcast) return res.status(403).json(JsonResponse('Broadcast không tồn tại!', null))

  },
}