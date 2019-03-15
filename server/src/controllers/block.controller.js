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
const base64Img = require('base64-img')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')

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
      !req.query._id ? dataResponse = await Block.find({'_account': userId}) : dataResponse = await Block.find({'_id':req.query,'_account': userId})
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
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBlock = await Block.find({'_account': userId})
    const foundDefaultGr = await  GroupBlock.findOne({ 'name': 'Mặc Định', '_account': userId })
    const num = foundBlock.length
    const block = await new Block(req.body)
    if(req.query._groupId){
      const findGroup = await GroupBlock.findOne({'_id':req.query._groupId, '_account': userId})
      if (!findGroup) return res.status(403).json(JsonResponse('Nhóm block không tồn tại!', null))
      block.name = 'Kịch bản '+ num
      block._account = userId
      block._groupBlock = req.query._groupId
      await block.save()
      findGroup.blocks.push(block._id)
      await findGroup.save()
      return res.status(200).json(JsonResponse('Tạo block thành công!', block))
    }
    block.name = 'Kịch bản '+ num
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
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBlock = await Block.findOne({'_id': req.query._blockId, '_account': userId})
    if (!foundBlock) return res.status(403).json(JsonResponse('Block không tồn tại!', null))

    // with type item is image
    if (req.query._type === 'image') {
      const content = {
        valueText: (req.body.valueText).trim() === '' ? '' : base64Img.base64Sync(req.body.valueText),
        typeContent: 'image'
      }
      foundBlock.contents.push(content)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Tạo nội dung loại ảnh trong block thành công!', foundBlock))
    }

    // With type item is time
    if (req.query._type === 'time') {
      if((req.body.valueText).trim() === '' || req.body.valueText === null){
        const content = {
          valueText: '',
          typeContent: 'time'
        }
        foundBlock.contents.push(content)
        await foundBlock.save()
        return res.status(200).json(JsonResponse('Tạo nội dung loại thời gian trong block thành công!', foundBlock))
      }
      if (isNaN(parseFloat(req.body.valueText)) || parseFloat(req.body.valueText) < 0 || parseFloat(req.body.valueText) > 20) return res.status(405).json(JsonResponse('Thời gian nằm trong khoảng từ 0 - 20, định dạng là số!', null))
      const content = {
        valueText: req.body.valueText,
        typeContent: 'time'
      }
      foundBlock.contents.push(content)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Tạo nội dung loại thời gian trong block thành công!', foundBlock))
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
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    if (JSON.stringify(userId) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Lỗi truy cập!', null))
    const foundBlock = await Block.findById(req.query._blockId)    
    if (!foundBlock) return res.status(404).json(JsonResponse('Block không tồn tại!', null))
    // update item in block
    if(req.query._itemId) {
      const findItem = foundBlock.contents.filter(x => x.id === req.query._itemId)[0]
      if (typeof findItem === undefined) return res.status(403).json(JsonResponse('Nội dung không tồn tại trong block này!', null))

      // with type item is image
      if (req.query._type === 'image') {
        findItem.valueText = (req.body.valueText).trim() === '' ? '' : base64Img.base64Sync(req.body.valueText),
        findItem.typeContent = 'image'
        await foundBlock.save()
        return res.status(201).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
      }

      // With type item is time
      if (req.query._type === 'time') {
        if((req.body.valueText).trim() === '' || req.body.valueText === null){
          findItem.valueText= '',
          findItem.typeContent = 'time'
          await foundBlock.save()
          return res.status(200).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
        }
        if (isNaN(parseFloat(req.body.valueText)) || parseFloat(req.body.valueText) < 0 || parseFloat(req.body.valueText) > 20) return res.status(405).json(JsonResponse('Thời gian nằm trong khoảng từ 0 - 20, định dạng là số!', null))
        findItem.valueText= req.body.valueText,
        findItem.typeContent = 'time'
        await foundBlock.save()
        await foundBlock.save()
        return res.status(200).json(JsonResponse('Cập nhật nội dung trong block thành công!', foundBlock))
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
      if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
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
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundBlock = await Block.findById(req.query._blockId)    
    if (!foundBlock) return res.status(404).json(JsonResponse('Block không tồn tại!', null))
     // delete item in script using query
     if (req.query._itemId) {
      const findItem = foundBlock.contents.filter(x => x.id === req.query._itemId)[0]
      if (typeof findItem === 'undefined') return res.status(403).json(JsonResponse('Nội dung block không tồn tại!', null))
      foundBlock.contents.pull(findItem)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Xóa nội dung trong block thành công! ', foundBlock))
    }
    const foundGroupBlock = await GroupBlock.find({'_account': userId})
    foundGroupBlock.map(async (value, index, array) => {
      if (value._block.includes(foundBlock._id)){
        value._block.pull(foundBlock._id)
        await value.save()
      }
      next()
    })
  
    await Block.findByIdAndRemove(req.query._blockId)
    res.status(200).json(JsonResponse('Xóa block thành công!', null))
  }
}
