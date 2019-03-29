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
const Sequence = require('../models/Sequence.model')

const base64Img = require('base64-img')
const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')
const config = require('../configs/configs');
const fs = require('fs')

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
      day_name = "Thứ sáu";
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
      !req.query._id ? dataResponse = await Broadcast.find({'_account': userId}) : dataResponse = await Broadcast.find({'_id':req.query._id, '_account': userId}).populate("blocks.blockId")
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))

      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Broadcast.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    if (req.query._id && req.query._blockId) {
      Promise.all(dataResponse[0].blocks.map(block => {
        if (block._id.toString() !== req.query._blockId) return
        return block
      }).filter(val => {
        if (val === undefined) return
        return true
      })).then(item => {
        return res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", item))
      })
    } else {
      return res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
    }
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

    if(foundBroadcast.typeBroadCast === 'Tin nhắn gửi ngay') {
      const result = foundBroadcast.blocks[0]
      if (req.query._blockId !== result._id.toString()) return res.status(403).json(JsonResponse('Không tìm thấy block!', null))
      const contentItem = foundBroadcast.blocks[0].content.filter(id => id.id === req.query._contentId)[0]
      if (!contentItem) return  res.status(405).json(JsonResponse('Không có nội dung này trong block'), null)
      // Add type image in block
      if (contentItem.typeContent === 'image') {
        if (req.file === null || req.file === undefined) {
          contentItem.valueText = ''
          contentItem.typeContent = 'image'
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Cập nhật nội dung loại ảnh trong kịch bản từ trình tự kịch bản thành công!', foundBroadcast))
        }
        contentItem.valueText = config.URL + '/' + ((req.file.path).replace(/\\/gi, "/")),
        contentItem.typeContent = 'image'
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Cập nhật nội dung loại ảnh trong kịch bản từ trình tự kịch bản thành công!', foundBroadcast))
      }

      // add type time in block
      if (contentItem.typeContent === 'time') {
        if(req.body.valueText === '' || req.body.valueText === null || req.body.valueText === undefined){
          contentItem.valueText = '5',
          contentItem.typeContent = 'time'
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Cập nhật kịch bản loại thời gian trong chiến dịch thành công!', foundBroadcast))
        }
        if (isNaN(parseFloat(req.body.valueText)) || parseFloat(req.body.valueText) < 5 || parseFloat(req.body.valueText) > 20) return res.status(405).json(JsonResponse('Thời gian nằm trong khoảng từ 5 - 20, định dạng là số!', null))
        contentItem.valueText =  req.body.valueText,
        contentItem.typeContent =  'time'
        await foundBroadcast.save()
        return res.status(201).json(JsonResponse('Cập nhật kịch bản loại thời gian trong chiến dịch thành công!', foundBroadcast))
      }
      // With type item is subscribe & unsubscribe
      if (contentItem.typeContent === 'subscribe' || contentItem.typeContent === 'unsubscribe') {
        if (req.body.valueText.length === 0 || req.body.valueText === null ||  req.body.valueText === undefined) {
          contentItem.valueText = '',
          contentItem.typeContent = contentItem.typeContent  === 'subscribe' ? 'subscribe' : 'unsubscribe'
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Cập nhật nội dung loại đăng kí kịch bản trong block thành công!', foundBroadcast))
        }

        const sequences = req.body.valueText
        let checkExist = false

        await  Promise.all(sequences.map(async  val => {
          const foundSequence = await Sequence.findOne({'_account': userId,'_id':val})
          return foundSequence === null
        })).then(result => {
          result.map(value => {
            if ( value === true ){
              checkExist = true
              return checkExist
            }
          })
        })
        if (checkExist) return res.status(405).json(JsonResponse('Một trong số các chuỗi kịch bản không có trong tài khoản của bạn!', null))
        const checkSequences = ArrayFunction.removeDuplicates(sequences)
        contentItem.valueText = checkSequences.toString(),
        contentItem.typeContent =   contentItem.typeContent === 'subscribe' ? 'subscribe' : 'unsubscribe'
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse(`Cập nhât nội dung loại ${req.query._type === 'subscribe' ? 'subscribe' : 'unsubscribe'} trong block thành công!`, foundBroadcast))
      }
      if (contentItem.typeContent === 'text') {
        // Add type text in block
        contentItem.valueText = req.body.valueText ? req.body.valueText : '',
        contentItem.typeContent = 'text'
        await foundBroadcast.save()
        return res.status(201).json(JsonResponse('Cập nhật chiến dịch loại tin nhắn gửi ngay thành công!', foundBroadcast))
      }
      foundBroadcast.blocks[0].timeSetting.dateMonth = req.body.dateMonth ? req.body.dateMonth :  block.timeSetting.dateMonth
      foundBroadcast.blocks[0].timeSetting.hour = req.body.hour ? req.body.hour : block.timeSetting.hour
      await foundBroadcast.save()
      res.status(201).json(JsonResponse('Cập nhật chiến dịch tin nhan ngay thành công!', foundBroadcast))
    }

    const block = foundBroadcast.blocks.filter(id => id.id === req.query._blockId)[0]
    if(!block) return res.status(403).json(JsonResponse('Block không tồn tại ở Broadcast này!', null))
    // Update item in block with type schedule broadcast
    if ( req.query._contentId) {
      const contentItem = block.content.filter(id => id.id === req.query._contentId)[0]
      if (!contentItem) return  res.status(405).json(JsonResponse('Không có nội dung này trong block'), null)
      // Add type image in block
      if (contentItem.typeContent === 'image') {
        if (req.file === null || req.file === undefined) {
          contentItem.valueText = ''
          contentItem.typeContent = 'image'
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Cập nhật nội dung loại ảnh trong kịch bản từ trình tự kịch bản thành công!', block))
        }
        contentItem.valueText = config.URL + '/' + ((req.file.path).replace(/\\/gi, "/")),
          contentItem.typeContent = 'image'
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Cập nhật nội dung loại ảnh trong kịch bản từ trình tự kịch bản thành công!', block))
      }

      // add type time in block
      if (contentItem.typeContent === 'time') {
        if(req.body.valueText === '' || req.body.valueText === null || req.body.valueText === undefined){
          contentItem.valueText = '5',
            contentItem.typeContent = 'time'
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Cập nhật kịch bản loại thời gian trong chiến dịch thành công!', block))
        }
        if (isNaN(parseFloat(req.body.valueText)) || parseFloat(req.body.valueText) < 5 || parseFloat(req.body.valueText) > 20) return res.status(405).json(JsonResponse('Thời gian nằm trong khoảng từ 5 - 20, định dạng là số!', null))
        contentItem.valueText =  req.body.valueText,
          contentItem.typeContent =  'time'
        await foundBroadcast.save()
        return res.status(201).json(JsonResponse('Cập nhật kịch bản loại thời gian trong chiến dịch thành công!', foundBroadcast))
      }
      // With type item is subscribe & unsubscribe
      if (contentItem.typeContent === 'subscribe' || contentItem.typeContent === 'unsubscribe') {
        if (req.body.valueText.length === 0 || req.body.valueText === null ||  req.body.valueText === undefined) {
          contentItem.valueText = '',
            contentItem.typeContent = contentItem.typeContent  === 'subscribe' ? 'subscribe' : 'unsubscribe'
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Cập nhật nội dung loại đăng kí kịch bản trong block thành công!', block))
        }

        const sequences = req.body.valueText
        let checkExist = false

        await  Promise.all(sequences.map(async  val => {
          const foundSequence = await Sequence.findOne({'_account': userId,'_id':val})
          return foundSequence === null
        })).then(result => {
          result.map(value => {
            if ( value === true ){
              checkExist = true
              return checkExist
            }
          })
        })
        if (checkExist) return res.status(405).json(JsonResponse('Một trong số các chuỗi kịch bản không có trong tài khoản của bạn!', null))
        const checkSequences = ArrayFunction.removeDuplicates(sequences)
        contentItem.valueText = checkSequences.toString(),
          contentItem.typeContent =   contentItem.typeContent === 'subscribe' ? 'subscribe' : 'unsubscribe'
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse(`Cập nhât nội dung loại ${req.query._type === 'subscribe' ? 'subscribe' : 'unsubscribe'} trong block thành công!`, foundBroadcast))
      }
      if (contentItem.typeContent === 'text') {
        // Add type text in block
        contentItem.valueText = req.body.valueText ? req.body.valueText : '',
          contentItem.typeContent = 'text'
        await foundBroadcast.save()
        return res.status(201).json(JsonResponse('Cập nhật chiến dịch loại tin nhắn gửi ngay thành công!', block))
      }
    }

    // Choose type cron for timer block
    switch (req.query._type) {
      case '0':
        req.body.dateMonth ? block.timeSetting.dateMonth = req.body.dateMonth :  block.timeSetting.dateMonth
        req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
        block.timeSetting.repeat.typeRepeat =  'Không'
        block.timeSetting.repeat.valueRepeat = ''
        await foundBroadcast.save()
        break
      case '1':
        block.timeSetting.dateMonth = ''
        req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
        block.timeSetting.repeat.typeRepeat =  'Hằng ngày'
        // 0,1,2,3,4,5,6 match day of week 'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'
        block.timeSetting.repeat.valueRepeat = '0,1,2,3,4,5,6'
        await foundBroadcast.save()
        break
      case '2':
        block.timeSetting.dateMonth = ''
        req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
        block.timeSetting.repeat.typeRepeat =  'Cuối tuần'
        block.timeSetting.repeat.valueRepeat = '0,6'
        await foundBroadcast.save()
        break
      case '3':
        req.body.dateMonth ? block.timeSetting.dateMonth = req.body.dateMonth :  block.timeSetting.dateMonth
        req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
        block.timeSetting.repeat.typeRepeat =  'Hằng tháng'
        block.timeSetting.repeat.valueRepeat = ''
        await foundBroadcast.save()
        break
      case '4':
        block.timeSetting.dateMonth = ''
        req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
        block.timeSetting.repeat.typeRepeat =  'Ngày làm việc'
        block.timeSetting.repeat.valueRepeat = '1,2,3,4,5'
        await foundBroadcast.save()
        break
      case '5':
        switch (req.body.day) {
          case '0,1,2,3,4,5,6' :
            block.timeSetting.dateMonth = ''
            req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
            block.timeSetting.repeat.typeRepeat =  'Hằng ngày'
            block.timeSetting.repeat.valueRepeat = '0,1,2,3,4,5,6'
            await foundBroadcast.save()
            break
          case '0,6':
            block.timeSetting.dateMonth = ''
            req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
            block.timeSetting.repeat.typeRepeat =  'Cuối tuần'
            block.timeSetting.repeat.valueRepeat = '0,6'
            await foundBroadcast.save()
            break
          case '1,2,3,4,5':
            block.timeSetting.dateMonth = ''
            req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
            block.timeSetting.repeat.typeRepeat =  'Ngày làm việc'
            block.timeSetting.repeat.valueRepeat = '1,2,3,4,5'
            await foundBroadcast.save()
            break
          default:
            const arr = (req.body.day).split(',')
            const result = arr.map(val => {
              return checkDay(val)
            })
            block.timeSetting.dateMonth =result.join(', ')  
            req.body.hour? block.timeSetting.hour = req.body.hour : block.timeSetting.hour
            block.timeSetting.repeat.typeRepeat =  'Tùy chỉnh'
            block.timeSetting.repeat.valueRepeat = req.body.day
            await foundBroadcast.save()
            break
        }
        break
    }
    block.timeSetting.dateMonth = req.body.dateMonth ? req.body.dateMonth :  block.timeSetting.dateMonth
    block.timeSetting.hour = req.body.hour ? req.body.hour : block.timeSetting.hour
    await foundBroadcast.save()
    res.status(201).json(JsonResponse('Cập nhật broadcast thành công', foundBroadcast))
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
    /**
     *  With type broadcast === thiết lập bộ hẹn
     */
    if(foundBroadcast.typeBroadCast === 'Thiết lập bộ hẹn') {
      const block = foundBroadcast.blocks.filter(id => id.id === req.query._blockId)[0]

      // add friend to block in broadcast
      if (req.query._blockId) {
        if(!block) return res.status(403).json(JsonResponse('Block không tồn tại ở Broadcast này!', null))
        if (req.query._typeItem === 'image') {
          block.content.push({'valueText':'','typeContent':'image'})
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Tạo nội dung loại ảnh trong kịch bản từ trình tự kịch bản thành công!', block))
        }
        if (req.query._typeItem === 'time') {
          block.content.push({'valueText':'5','typeContent':'time'})
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Tạo kịch bản loại thời gian trong chiến dịch thành công!', foundBroadcast))
        }
        if (req.query._typeItem === 'text') {
          block.content.push({'valueText':'','typeContent':'text'})
          await foundBroadcast.save()
          return  res.status(201).json(JsonResponse('Tao content trong block cua broadcast thành công', block))
        }
        // With type item is subscribe & unsubscribe
        if (req.query._typeItem === 'subscribe' || req.query._typeItem === 'unsubscribe') {
          const content = {
            valueText: '',
            typeContent: req.query._typeItem === 'subscribe' ? 'subscribe' : 'unsubscribe'
          }
          block.content.push(content)
          await foundBroadcast.save()
          return res.status(200).json(JsonResponse('Tạo nội dung loại đăng kí kịch bản trong block thành công!', foundBroadcast))
        }

        let result = null
        foundBroadcast.blocks.map( val => {
          if(val._id.toString() === req.query._blockId){
            result = val
            return result
          }
        })
        const friends = req.body.friendId
        let checkCon = false
        friends.map((val) => {
          if(result._friends.indexOf(val)>-1) {
            checkCon = true
            return checkCon
          }
        })
        if (checkCon) return res.status(405).json(JsonResponse('Bạn đã thêm một trong những bạn bè này!', null))
        const checkFriend = ArrayFunction.removeDuplicates(friends)
        checkFriend.map(val => {
          result._friends.push(val)
        })
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Thêm bạn bè thành công', foundBroadcast))
      }
      // add new block in broadcast

      const date = new Date()
      date.setHours(12,0,0)
      date.setDate(date.getDate()+1)
      foundBroadcast.blocks.push({
        timeSetting: {
          dateMonth: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay(),
          hour: date.getHours()+':'+'0'+date.getMinutes(),
          repeat: {
            typeRepeat: 'Không',
            valueRepeat: ''
          }
        }
      })
      await foundBroadcast.save()
      return res.status(200).json(JsonResponse('Thêm block trong broadcast thành công!', foundBroadcast))
    }
    /**
     *  With type broadcast === tin nhắn gửi ngay
     */
    // add friend to block in broadcast
    if (req.query._blockId) {
      const result = foundBroadcast.blocks[0]
      if (req.query._blockId !== result._id.toString()) return res.status(403).json(JsonResponse('Không tìm thấy block!', null))
      // Add type image in block
      if (req.query._typeItem === 'image') {
        foundBroadcast.blocks[0].content.push({'valueText':'','typeContent':'image'})
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Tạo nội dung loại ảnh trong kịch bản từ trình tự kịch bản thành công!', foundBroadcast.blocks[0]))
      }

      // add type time in block
      if (req.query._typeItem === 'time') {
        foundBroadcast.blocks[0].content.push({'valueText':'5','typeContent':'time'})
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Cập nhật kịch bản loại thời gian trong chiến dịch thành công!', foundBroadcast.blocks[0]))
      }
      // With type item is subscribe & unsubscribe
      if (req.query._typeItem === 'subscribe' || req.query._typeItem === 'unsubscribe') {
        const content = {
          valueText: '',
          typeContent:  req.query._typeItem === 'subscribe' ? 'subscribe' : 'unsubscribe'
        }
        foundBroadcast.blocks[0].content.push(content)
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Tạo nội dung loại đăng kí kịch bản trong block thành công!', foundBroadcast.blocks[0]))
      }

      // Add type text in block
      if (req.query._typeItem === 'text') {
        foundBroadcast.blocks[0].content.push({'valueText':'','typeContent':'text'})
        await foundBroadcast.save()
        return  res.status(201).json(JsonResponse('Tao content trong block cua broadcast thành công', foundBroadcast.blocks[0]))
      }

      const friends = req.body.friendId
      let checkCon = false
      friends.map((val) => {
         if(result._friends.indexOf(val)>-1) {
           checkCon = true
           return checkCon
         }
      })
      if (checkCon) return res.status(405).json(JsonResponse('Bạn đã thêm một trong những bạn bè này!', null))
      const checkFriend = ArrayFunction.removeDuplicates(friends)
      checkFriend.map(val => {
        result._friends.push(val)
      })
      await foundBroadcast.save()
      return res.status(200).json(JsonResponse('Thêm bạn bè thành công', foundBroadcast))
    }
    res.status(405).json(JsonResponse('Mục tin nhắn gửi ngay không sử dụng được chức năng này', null))
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
      if (req.query._friend === 'true'){
        const friends = req.body.friendId
        let checkCon = false
        let checkExist = false
        await  Promise.all(friends.map(async  val => {
          const foundFriend = await Friend.findOne({'_account': userId,'_id':val})
          return foundFriend === null
        })).then(result => {
          result.map(value => {
            if ( value === true ){
              checkExist = true
              return checkExist
            }
          })
        })
        if (checkExist) return res.status(405).json(JsonResponse('Một trong số các bạn bè không có trong tài khoản của bạn!', null))
        friends.map( async (val) => {
          if(findBlock._friends.indexOf(val) < 0) {
            checkCon = true
            return checkCon
          }
        })
        if (checkCon) return res.status(405).json(JsonResponse('Không tồn tại một trong các bạn bè bạn muốn xóa ở nhớm bạn bè này!', null))
        const checkFriend = ArrayFunction.removeDuplicates(friends)
        checkFriend.map(val => {
          findBlock._friends.pull(val)
        })
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Xóa bạn bè trong block thành công!', findBlock))
      }
      if (req.query._contentId) {
        const findContent = findBlock.content.filter(x => x.id === req.query._contentId)[0]
        if(!findContent) return res.status(403).json(JsonResponse('Broadcast của bạn có block không chứa này!', null))
        if ((findContent.typeContent === 'subscribe' && req.query._sequence === 'true') || (findContent.typeContent === 'unsubscribe' && req.query._sequence === 'true')) {
          if (findContent.valueText.split(',').indexOf(req.body.valueText) < 0) return res.status(405).json(JsonResponse('Không có trình tự kịch bản này trong item này! ', null))
          findContent.valueText = findContent.valueText.split(',').filter(val => val !== req.body.valueText).toString()
          await foundBroadcast.save()
          return  res.status(200).json(JsonResponse('Xóa chuỗi kịch bản trong item đăng kí của block thành công'))
        }
        findBlock.content.pull(findContent)
        await foundBroadcast.save()
        return res.status(200).json(JsonResponse('Xóa content trong block thành công!', findBlock))
      }
      foundBroadcast.blocks.pull(findBlock)
      await foundBroadcast.save()
      return res.status(200).json(JsonResponse('Xóa  block thành công!', foundBroadcast))
    }
    await Broadcast.findByIdAndRemove(req.query._bcId)
    res.status(200).json(JsonResponse('Xóa broadcast thành công!', foundBroadcast))
  },
}