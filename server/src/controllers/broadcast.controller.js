/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 12/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require ('../models/Account.model')
const Broadcast = require ('../models/Broadcasts.model')
const Friend = require('../models/Friends.model')
const Block = require('../models/Blocks.model')

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
      !req.query._id ? dataResponse = await Broadcast.find({'_account': userId}) : dataResponse = await Broadcast.find({'_id':req.query._id, '_account': userId})
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

    const foundBroadcastDel = await Broadcast.findOne({'typeBroadCast': 'Deliver', '_account': userId})
    const foundBroadcastSch = await Broadcast.findOne({'typeBroadCast': 'Schedule', '_account': userId})
    const newBroadcastDel = await new Broadcast()
    const newBroadcastSch = await new Broadcast()
    if(!foundBroadcastDel && !foundBroadcastSch) {
      newBroadcastDel.typeBroadCast = 'Deliver'
      newBroadcastDel._account = userId
      await  newBroadcastDel.save()

      newBroadcastSch.typeBroadCast = 'Schedule'
      newBroadcastSch._account = userId
      await newBroadcastSch.save()

     return res.status(200).json(JsonResponse('Tạo broadcast thành công !',{
       Deliver:newBroadcastDel,
       Schedule:newBroadcastSch
     }))
    }
    if (!foundBroadcastDel) {
      newBroadcastDel.typeBroadCast = 'Deliver'
      newBroadcastDel._account = userId
      await  newBroadcastDel.save()
      return res.status(200).json(JsonResponse('Tạo broadcast thành công !', newBroadcastDel))
    }
    if (!foundBroadcastSch) {
      newBroadcastSch.typeBroadCast = 'Schedule'
      newBroadcastSch._account = userId
      await newBroadcastSch.save()
      return res.status(200).json(JsonResponse('Tạo broadcast thành công !', newBroadcastSch))
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
    const foundBroadcast = await  Broadcast.findById(req.query._bcId)
    if(!foundBroadcast) return res.status(403).json(JsonResponse('Broadcast không tồn tại!', null))
    const foundBlock = await Block.findOne({'_id':req.body.blockId, '_account': userId})

    // add friend to block in broadcast
    if (req.query._blockId) {
      let result = null
      foundBroadcast.blocks.map( val => {
        if(val._id.toString() === req.query._blockId){
          result = val
          return result
        }
      })
      const foundFriend = await Friend.findById(req.body.friendId)
      if(!foundFriend) return res.status(403).json(JsonResponse('Không tìm thấy bạn bè!', null))
      // check account not
      const isInArray = foundFriend._account.some((id) => {
        return id.equals(userId)
      })
      if(!isInArray) return res.status(403).json(JsonResponse('Không tìm thấy bạn bè trong danh sách bạn bè của bạn!', null))
      const isFoundFriend = result._friends.some((id) => {
        return id.equals(req.body.friendId)
      })
      if(isFoundFriend) return res.status(405).json(JsonResponse('Bạn đã thêm bạn bè này!', null))
      result._friends.push(req.body.friendId)
      await foundBroadcast.save()
      return res.status(200).json(JsonResponse('Thêm bạn bè thành công', foundBroadcast))
    }

    if(!foundBlock) return res.status(403).json(JsonResponse('Không tìm thấy block!', null))
    let checkLoop = false
    foundBroadcast.blocks.map(val => {
      if (val.blockId.toString() === req.body.blockId) {
        checkLoop = true
        return checkLoop
      }
    })
    if(checkLoop) return res.status(405).json(JsonResponse('Bạn đã thêm block này trước đó!', null))
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
    const foundBroadcast = await  Broadcast.findById(req.query._bcId)
    if(!foundBroadcast) return res.status(403).json(JsonResponse('Broadcast không tồn tại!', null))

    // delete friend in block
    if (req.query._blockId) {
      const findBlock = foundBroadcast.blocks.filter(x => x.id === req.query._blockId)[0]
      if(!findBlock) return res.status(403).json(JsonResponse('Broadcast của bạn không chứa block này!', null))
      if(req.query._friendId){
        const checkFriend = findBlock._friends.indexOf(req.query._friendId)
        if(checkFriend <0) return res.status(403).json(JsonResponse('Block trong broadcast của bạn không chứa bạn bè này!', null))
        findBlock._friends.pull(req.query._friendId)
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Xóa bạn bè trong block thành công!', foundBroadcast))
      }
      foundBroadcast.blocks.pull(findBlock)
      await foundBroadcast.save()
      return res.status(200).json(JsonResponse('Xóa bạn bè block thành công!', foundBroadcast))
    }
    await Broadcast.findByIdAndRemove(userId)
    res.status(200).json(JsonResponse('Xóa broadcast thành công!', foundBroadcast))
  },
}