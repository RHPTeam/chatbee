/**
 * Controller block for project
 * author: hocpv
 * date up: 07/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const Block = require('../models/Blocks.model')
const GroupBlock = require('../models/GroupBlocks.model')
const Attribute = require('../models/Attribute.model')
const Sequence = require('../models/Sequence.model')
const base64Img = require('base64-img')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')
const Dictionaries = require('../configs/dictionaries')
const config = require('../configs/configs');
const fs = require('fs')

module.exports = {
  /**
   *  get all block & block by Id
   *  @param req
   *  @param res
   *
   */
  index: async (req, res) => {
    let dataResponse = null
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    if (DecodeRole(role, 10) === 0) {
      !req.query._id ? dataResponse = await Block.find({'_account': userId}) : dataResponse = await Block.find({
        '_id': req.query,
        '_account': userId
      })
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Block.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   *  create block by user
   *  @param req
   *  @param res
   *
   */
  create: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBlock = await Block.find({'_account': userId})

    // num block only exist in block
    let nameArr = foundBlock.map(block => {
      if (block.name.toLowerCase().includes(Dictionaries.BLOCK.toLowerCase()) === true)
        return block.name
    }).filter(item => {
      if (item === undefined) return
      return true
    }).map(item => parseInt(item.slice(Dictionaries.BLOCK.length)))
    const indexCurrent = Math.max(...nameArr)

    const foundDefaultGr = await GroupBlock.findOne({'name': 'Mặc Định', '_account': userId})
    const block = await new Block(req.body)
    if (req.query._groupId) {
      const findGroup = await GroupBlock.findOne({'_id': req.query._groupId, '_account': userId})
      if (!findGroup) return res.status(403).json(JsonResponse('Nhóm block không tồn tại!', null))
      block.name = indexCurrent.toString() === 'NaN' || foundBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.BLOCK} 1` : `${Dictionaries.BLOCK} ${indexCurrent + 1}`,
      block._account = userId
      block._groupBlock = req.query._groupId
      await block.save()
      findGroup.blocks.push(block._id)
      await findGroup.save()
      return res.status(200).json(JsonResponse('Tạo block thành công!', block))
    }
    block.name = indexCurrent.toString() === 'NaN'|| foundBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.BLOCK} 1` : `${Dictionaries.BLOCK} ${indexCurrent + 1}`,
    block._account = userId
    block._groupBlock = foundDefaultGr._id
    await block.save()
    foundDefaultGr.blocks.push(block._id)
    await foundDefaultGr.save()
    res.status(200).json(JsonResponse('Tạo block thành công!', block))
  },
  /**
   *  create item in block by user
   *  @param req
   *  @param res
   *
   */
  createItem: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBlock = await Block.findOne({'_id': req.query._blockId, '_account': userId})
    if (!foundBlock) return res.status(403).json(JsonResponse('Block không tồn tại!', null))

    // with type item is image
    if (req.query._type === 'image') {
      if (req.file === null || req.file === undefined) {
        const content = {
          valueText: '',
          typeContent: 'image'
        }
        foundBlock.contents.push(content)
        await foundBlock.save()
        return res.status(200).json(JsonResponse('Tạo nội dung loại ảnh trong block thành công!', foundBlock))
      }
      const content = {
        valueText: config.URL + '/' + ((req.file.path).replace(/\\/gi, "/")),
        typeContent: 'image'
      }
      foundBlock.contents.push(content)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Tạo nội dung loại ảnh trong block thành công!', foundBlock))
    }

    // With type item is time
    if (req.query._type === 'time') {
      if ((req.body.valueText).trim() === '' || req.body.valueText === null) {
        const content = {
          valueText: '5',
          typeContent: 'time'
        }
        foundBlock.contents.push(content)
        await foundBlock.save()
        return res.status(200).json(JsonResponse('Tạo nội dung loại thời gian trong block thành công!', foundBlock))
      }
      if (isNaN(parseFloat(req.body.valueText)) || parseFloat(req.body.valueText) < 4 || parseFloat(req.body.valueText) > 20) return res.status(405).json(JsonResponse('Thời gian nằm trong khoảng từ 5 - 20, định dạng là số!', null))
      const content = {
        valueText: req.body.valueText,
        typeContent: 'time'
      }
      foundBlock.contents.push(content)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Tạo nội dung loại thời gian trong block thành công!', foundBlock))
    }

    // With type item is attribute
    if (req.query._type === 'tag') {
      if (req.body.nameAttribute.trim() === '' || req.body.valueAttribute.trim() === '') return res.status(405).json(JsonResponse('Bạn không thể để trống trường này!', null))
      const foundAttribute = await Attribute.findOne({'_account': userId, 'name': req.body.nameAttribute})
      if (foundAttribute) return res.status(405).json(JsonResponse('Bạn đã từng thêm thuộc tính này!', null))
      const newAttribute = await new Attribute()
      newAttribute.name = req.body.nameAttribute
      newAttribute.value = req.body.valueAttribute
      newAttribute._account = userId
      await newAttribute.save()
      const content = {
        valueText: req.body.nameAttribute,
        typeContent: 'tag'
      }
      foundBlock.contents.push(content)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Tạo nội dung loại thẻ trong block thành công!', foundBlock))
    }

    // With type item is subscribe & unsubscribe
    if (req.query._type === 'subscribe' || req.query._type === 'unsubscribe') {
      if ((req.body.valueText).trim() === '' || req.body.valueText === null) {
        const content = {
          valueText: '',
          typeContent: req.query._type === 'subscribe' ? 'subscribe' : 'unsubscribe'
        }
        foundBlock.contents.push(content)
        await foundBlock.save()
        return res.status(200).json(JsonResponse('Tạo nội dung loại đăng kí kịch bản trong block thành công!', foundBlock))
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
      const content = {
        valueText: checkSequences.toString(),
        typeContent:  req.query._type === 'subscribe' ? 'subscribe' : 'unsubscribe'
      }
      foundBlock.contents.push(content)
      await foundBlock.save()
      return res.status(200).json(JsonResponse(`Tạo nội dung loại ${req.query._type === 'subscribe' ? 'subscribe' : 'unsubscribe'} trong block thành công!`, foundBlock))
    }

    // with type item is text
    const content = {
      valueText: req.body.valueText,
      typeContent: 'text'
    }
    foundBlock.contents.push(content)
    await foundBlock.save()
    res.status(200).json(JsonResponse('Tạo nội dung trong block thành công!', foundBlock))
  },
  /**
   *  update block by user
   *  @param req
   *  @param res
   *
   */
  update: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    if (JSON.stringify(userId) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Lỗi truy cập!', null))
    const foundBlock = await Block.findById(req.query._blockId)
    if (!foundBlock) return res.status(404).json(JsonResponse('Block không tồn tại!', null))
    // update item in block
    if (req.query._itemId) {
      const findItem = foundBlock.contents.filter(x => x.id === req.query._itemId)[0]
      if (typeof findItem === undefined) return res.status(403).json(JsonResponse('Nội dung không tồn tại trong block này!', null))

      // with type item is image
      if (findItem.typeContent === 'image') {
        if (findItem.valueText === '') {
          if (req.file === null || req.file === undefined) {
            findItem.valueText = '' ,
              findItem.typeContent = 'image'
            await foundBlock.save()
            return res.status(201).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
          } else {
            findItem.valueText = config.URL + '/' + ((req.file.path).replace(/\\/gi, "/"))
            findItem.typeContent = 'image'
            await foundBlock.save()
            return res.status(201).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
          }
        }
        if (req.file === null || req.file === undefined) {
          findItem.valueText = '' ,
          findItem.typeContent = 'image'
          await foundBlock.save()
          return res.status(201).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
        }
        findItem.valueText = config.URL + '/' + ((req.file.path).replace(/\\/gi, "/"))
        findItem.typeContent = 'image'
        await foundBlock.save()
        return res.status(201).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
      }

      // With type item is time
      if (findItem.typeContent === 'time') {
        if ((req.body.valueText).trim() === '' || req.body.valueText === null) {
          findItem.valueText = '5',
          findItem.typeContent = 'time'
          await foundBlock.save()
          return res.status(200).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
        }
        if (isNaN(parseFloat(req.body.valueText)) || parseFloat(req.body.valueText) < 5 || parseFloat(req.body.valueText) > 20) return res.status(405).json(JsonResponse('Thời gian nằm trong khoảng từ 0 - 20, định dạng là số!', null))
        findItem.valueText = req.body.valueText,
          findItem.typeContent = 'time'
        await foundBlock.save()
        return res.status(200).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
      }

      // With type item is attribute
      if (findItem.typeContent === 'tag') {
        if (req.body.nameAttribute.trim() === '' || req.body.valueAttribute.trim() === '') return res.status(405).json(JsonResponse('Bạn không thể để trống trường này!', null))
        const foundAttribute = await Attribute.findOne({'_account': userId, 'name': findItem.valueText})
        foundAttribute.name = req.body.nameAttribute
        foundAttribute.value = req.body.valueAttribute
        await foundAttribute.save()
        findItem.valueText = req.body.nameAttribute,
        findItem.typeContent = 'tag'
        await foundBlock.save()
        return res.status(200).json(JsonResponse('Tạo nội dung loại thẻ trong block thành công!', foundBlock))
      }

      //  With type item is subscribe or unsubscribe
      if (findItem.typeContent === 'subscribe' || findItem.typeContent === 'unsubscribe') {
        const sequences = req.body.valueText
        let checkExist = false
        sequences.map( async (val) => {
          if(findItem.split('').indexOf(val) > -1) {
            checkExist = true
            return checkExist
          }
        })
        if (checkExist) return res.status(405).json(JsonResponse('Bạn đã thêm một trong những chuỗi kịch bản  này!', null))
        findItem.valueText = findItem.valueText+','+req.body.valueText,
        findItem.typeContent = findItem.typeContent === 'subscribe' ? 'subscribe' : 'unsubscribe'
        await foundBlock.save()
        return res.status(200).json(JsonResponse(`Tạo nội dung loại ${findItem.typeContent === 'subscribe' ? 'subscribe' : 'unsubscribe'} trong block thành công!`, foundBlock))
      }

      // With type item is text
      findItem.valueText = req.body.valueText,
      findItem.typeContent = 'text'
      await foundBlock.save()
      return res.status(201).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
    }
    const foundAllBlock = await Block.find({})
    // check name group block exists
    let checkName = false
    foundAllBlock.map(val => {
      if (ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
        checkName = true
        return checkName
      }
    })
    if (checkName) return res.status(403).json(JsonResponse('Tên block đã tồn tại!', null))
    // update name block
    foundBlock.name = req.body.name
    await foundBlock.save()
    res.status(201).json(JsonResponse('Cập nhật block thành công!', foundBlock))
  },
  /**
   *  delete block by user
   *  @param req
   *  @param res
   *
   */
  delete: async (req, res, next) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if (!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBlock = await Block.findById(req.query._blockId)
    if (!foundBlock) return res.status(404).json(JsonResponse('Block không tồn tại!', null))
    // delete item in script using query
    if (req.query._itemId) {
      const findItem = foundBlock.contents.filter(x => x.id === req.query._itemId)[0]
      if (typeof findItem === 'undefined') return res.status(403).json(JsonResponse('Nội dung block không tồn tại!', null))
      if ((findItem.typeContent === 'subscribe' && req.query._sequence === 'true') || (findItem.typeContent === 'unsubscribe' && req.query._sequence === 'true')) {
        if (findItem.valueText.split(',').indexOf(req.body.valueText) < 0) return res.status(405).json(JsonResponse('Không có trình tự kịch bản này trong item này! ', null))

      }
      foundBlock.contents.pull(findItem)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Xóa nội dung trong block thành công! ', foundBlock))
    }
    const foundGroupBlock = await GroupBlock.find({'_account': userId})
    foundGroupBlock.map(async (value, index, array) => {
      if (value._block.includes(foundBlock._id)) {
        value._block.pull(foundBlock._id)
        await value.save()
      }
      next()
    })

    await Block.findByIdAndRemove(req.query._blockId)
    res.status(200).json(JsonResponse('Xóa block thành công!', null))
  }
}
