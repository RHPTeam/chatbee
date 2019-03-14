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

// global function check day of week
let checkDay = (current_day)=>{
  let day_name
// Lấy tên thứ của ngày hiện tại
  switch (current_day) {
    case '0':
      day_name = "Chủ nhật";
      break;
    case '1':
      day_name = "Thứ hai";
      break;
    case '2':
      day_name = "Thứ ba";
      break;
    case '3':
      day_name = "Thứ tư";
      break;
    case '4':
      day_name = "Thứ năm";
      break;
    case '5':
      day_name = "Thứ sau";
      break;
    case '6':
      day_name = "Thứ bảy";
  }
  return day_name
}
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

    const foundBroadcast = await Broadcast.findOne({'typeBroadCast': 'Tin nhắn gửi ngay', '_account': userId})
    if (foundBroadcast) return res.status(405).json(JsonResponse('Bạn đã tạo broadcast trước đó!', null))
    const newBroadcast = await new Broadcast()
    newBroadcast.typeBroadCast = 'Tin nhắn gửi ngay'
    newBroadcast._account = userId
    await newBroadcast.save()
    return res.status(200).json(JsonResponse('Tạo broadcast thành công !', newBroadcast))
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
    const foundBroadcast = await  Broadcast.findById(req.query._bcId)
    if(!foundBroadcast) return res.status(403).json(JsonResponse('Broadcast không tồn tại!', null))

    if(foundBroadcast.typeBroadCast === 'Tin nhắn gửi ngay') return res.status(405).json(JsonResponse('Loại tin nhắn gửi ngay không thể update', null))

    const block = foundBroadcast.blocks.filter(id => id.id === req.query._blockId)[0]
    if(!block) return res.status(403).json(JsonResponse('Block không tồn tại ở Broadcast này!', null))

    const foundBlock = await Block.findOne({'_id':block.blockId, '_account': userId})
    if(!foundBlock) return res.status(405).json(JsonResponse('Có thể bạn đã xóa block này', null))
    // Choose type cron for timer block
    switch (req.query._type) {
      case '0':
        break
      case '1':
        foundBlock.name = 'Hằng ngày'+' '+req.body.hour
        await foundBlock.save()
        block.timeSetting.dateMonth = ''
        block.timeSetting.hour = req.body.hour
        block.timeSetting.repeat.typeRepeat =  'Hằng ngày'
        block.timeSetting.repeat.valueRepeat = '0,1,2,3,4,5,6'
        await foundBroadcast.save()
        break
      case '2':
        foundBlock.name = 'Cuối tuần'+' '+req.body.hour
        await foundBlock.save()
        block.timeSetting.dateMonth = ''
        block.timeSetting.hour = req.body.hour
        block.timeSetting.repeat.typeRepeat =  'Cuối tuần'
        block.timeSetting.repeat.valueRepeat = '0,6'
        await foundBroadcast.save()
        break
      case '3':
        foundBlock.name = 'Ngày '+req.body.dateMonth+' hằng tháng'+' '+req.body.hour
        await foundBlock.save()
        block.timeSetting.dateMonth = req.body.dateMonth
        block.timeSetting.hour = req.body.hour
        block.timeSetting.repeat.typeRepeat =  'Hằng tháng'
        block.timeSetting.repeat.valueRepeat = ''
        await foundBroadcast.save()
        break
      case '4':
        foundBlock.name = 'Ngày làm việc'+' '+req.body.hour
        await foundBlock.save()
        block.timeSetting.dateMonth = ''
        block.timeSetting.hour = req.body.hour
        block.timeSetting.repeat.typeRepeat =  'Ngày làm việc'
        block.timeSetting.repeat.valueRepeat = '1,2,3,4,5'
        await foundBroadcast.save()
        break
      case '5':
        switch (req.body.day) {
          case '0,1,2,3,4,5,6' :
            foundBlock.name = 'Hằng ngày'+' '+req.body.hour
            await foundBlock.save()
            block.timeSetting.dateMonth = ''
            block.timeSetting.hour = req.body.hour
            block.timeSetting.repeat.typeRepeat =  'Hằng ngày'
            block.timeSetting.repeat.valueRepeat = '0,1,2,3,4,5,6'
            await foundBroadcast.save()
            break
          case '0,6':
            foundBlock.name = 'Cuối tuần'+' '+req.body.hour
            await foundBlock.save()
            block.timeSetting.dateMonth = ''
            block.timeSetting.hour = req.body.hour
            block.timeSetting.repeat.typeRepeat =  'Cuối tuần'
            block.timeSetting.repeat.valueRepeat = '0,6'
            await foundBroadcast.save()
            break
          case '1,2,3,4,5':
            foundBlock.name = 'Ngày làm việc'+' '+req.body.hour
            await foundBlock.save()
            block.timeSetting.dateMonth = ''
            block.timeSetting.hour = req.body.hour
            block.timeSetting.repeat.typeRepeat =  'Ngày làm việc'
            block.timeSetting.repeat.valueRepeat = '1,2,3,4,5'
            await foundBroadcast.save()
            break
          default:
            const arr = (req.body.day).split(',')
            const result = arr.map(val => {
              return checkDay(val)
            })
            foundBlock.name = result.join(', ')+' '+req.body.hour
            await foundBlock.save()
            block.timeSetting.dateMonth = ''
            block.timeSetting.hour = req.body.hour
            block.timeSetting.repeat.typeRepeat =  'Tùy chỉnh'
            block.timeSetting.repeat.valueRepeat = req.body.day
            await foundBroadcast.save()
            break
        }
        break
    }
    res.status(201).json(JsonResponse('Cập nhật block trong broadcast thành công', foundBlock))
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
    /**
     *  With type broadcast === thiết lập bộ hẹn
     */
    if(foundBroadcast.typeBroadCast === 'Thiết lập bộ hẹn') {
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
      return res.status(200).json(JsonResponse('Thêm block trong broadcast thành công!', foundBroadcast))
    }
    /**
     *  With type broadcast === tin nhắn gửi ngay
     */
    if (foundBroadcast.blocks.length > 0) return res.status(403).json(JsonResponse('Bạn đã thêm block vào mục tin nhắn gửi ngay, vui lòng xóa block trước đó để thêm block mới!', null))
    // add friend to block in broadcast
    if (req.query._blockId) {
      const result = foundBroadcast.blocks[0]
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