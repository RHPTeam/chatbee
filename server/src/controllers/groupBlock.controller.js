/**
 * Controller group block for project
 * author: hocpv
 * date up: 07/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const Block = require('../models/Blocks.model')
const GroupBlock = require('../models/GroupBlocks.model')
const Sequence = require('../models/Sequence.model')
var mongoose = require('mongoose');

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')
const Dictionaries = require('../configs/dictionaries')


module.exports = {
	/**
	 *  get all groupt block & group block by Id
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
			!req.query._id ? dataResponse = await GroupBlock.find({'_account': userId}).populate({path: 'blocks',select: 'name'}) : dataResponse = await GroupBlock.find({'_id':req.query._id, '_account': userId}).populate({path: 'blocks',select: 'name'})
			if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
			dataResponse = dataResponse.map((item) => {
				if (item._account.toString() === userId) return item
			})
		} else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
			dataResponse = await GroupBlock.find(req.query).populate({
				path: 'blocks',
				select: 'name'
			})
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
    const foundGroupBlock = await GroupBlock.find({ '_account': userId })

		// handle num for name
		let nameArr = foundGroupBlock.map(groupBlock => {
			if (groupBlock.name.toLowerCase().includes(Dictionaries.GROUPBLOCK.toLowerCase()) === true)
				return groupBlock.name
		}).filter(item => {
			if (item === undefined) return
			return true
		}).map(item => parseInt(item.slice(Dictionaries.GROUPBLOCK.length)))
		const indexCurrent = Math.max(...nameArr)

    const newGroupBlock = await new GroupBlock()
		newGroupBlock.name = foundGroupBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.GROUPBLOCK} 0` : `${Dictionaries.GROUPBLOCK} ${indexCurrent+1}`
		newGroupBlock._account =  userId
    await newGroupBlock.save()
    res.status(200).json(JsonResponse('Tạo nhóm block thành công!', newGroupBlock))
	},
	/**
	 *  Add block by user
	 *  @param req
	 *  @param res
	 *
	 */
	addBlock: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const foundUser = await Account.findById(userId).select('-password')
		if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
		const foundGroupBlock = await GroupBlock.findOne({'_id': req.query._groupId, '_account': userId})
		if (!foundGroupBlock) return res.status(403).json(JsonResponse('Nhóm block không tồn tại!', null))
		const foundDefaultGroup = await GroupBlock.findOne({ 'name': 'Mặc Định', '_account': userId })

		// Push block to group block and pull in group block before
		if (req.query._blockId){
			const foundBlock  = await Block.findOne({'_id':req.query._blockId, '_account': userId})
			if(!foundBlock) return res.status(403).json(JsonResponse('Bạn không có kịch bản này!', null))
			if (foundBlock._groupBlock === undefined) return res.status(405).json(JsonResponse('Có lỗi xảy ra, vui lòng kiểm tra lại kịch bản muốn thêm!', null))
			const foundGroup = await GroupBlock.findOne({ '_id':foundBlock._groupBlock, '_account' : userId })

			// Check block is already this group block
			const isInArray = foundGroupBlock.blocks.some((id) => {
				return id.equals(req.query._blockId);
			})
			if (isInArray) return res.status(403).json(JsonResponse('Bạn đã thêm kịch bản vào nhóm kịch bản này!', null))
			if (foundGroup.name === 'Chuỗi Kịch Bản') {
				const foundSequence = await Sequence.find({ '_account':userId })
				let result = null
				await Promise.all(foundSequence.map( val => {
					const found = (val.sequences).some(el => el._block.toString() === req.query._blockId);
					if (found) {
						result = val
						return result
					}
				}))
				let idItem = null
				result.sequences.map( val => {
					if (val._block.toString() === req.query._blockId) {
						idItem = val._id
						return idItem
					}
				})
				result.sequences.pull(idItem)
				await result.save()
				foundBlock._groupBlock = req.query._groupId
				await foundBlock.save()
				foundGroup.blocks.pull(req.query._blockId)
				await foundGroup.save()
				foundGroupBlock.blocks.push(req.query._blockId)
				await foundGroupBlock.save()
				return res.status(200).json(JsonResponse('Thêm kịch bản từ trình tự kịch bản vào nhóm kịch bản thành công!',{
					groupBlock: foundGroupBlock,
					sequence: result,
					block: foundBlock
				}))
			}
			foundBlock._groupBlock = req.query._groupId
			await foundBlock.save()
			foundGroup.blocks.pull(req.query._blockId)
			await foundGroup.save()
			foundGroupBlock.blocks.push(req.query._blockId)
			await foundGroupBlock.save()
			return res.status(200).json(JsonResponse('Thêm kịch bản từ nhóm kịch bản khác vào nhóm kịch bản này thành công!', {
				groupBlock: foundGroupBlock,
				block: foundBlock
			}))
		}
		// add new block from sequence
		const foundBlock = await Block.find({'_account': userId})
		// num block only exist in block
		let num = 1
		foundBlock.map(val => {
			console.log(val)
			if(val._groupBlock){
				num++
				return num
			}
		})
		const newBlock = new Block()
		newBlock.name = 'Kịch Bản '+num
		newBlock._account = userId
		newBlock._groupBlock = req.query._groupId
		await newBlock.save()
		foundGroupBlock.push(newBlock._id)
		await foundGroupBlock
		res.status(200).json(JsonResponse('Thêm block trong nhóm block thành công!', foundGroupBlock))
	},
  /**
	 *  update group block by user
	 *  @param req
	 *  @param res
	 *
	 */
	update: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const {
      body,
      query
    } = req
    const foundUser = await Account.findById(userId)
    if (!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    if (JSON.stringify(userId) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Lỗi truy cập!', null))
		const dataGroupGroupUpdated = await GroupBlock.findOne({'_id': query._groupId, '_account': userId})
		const findAllGroup = await GroupBlock.find({'_account': userId})
		// check name group block exists
		let checkName = false
		findAllGroup.map(val => {
			if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
				checkName = true
				return checkName
			}
		})
		if (checkName) return res.status(403).json(JsonResponse('Tên group đã tồn tại!', null))
		dataGroupGroupUpdated.name = body.name
		await dataGroupGroupUpdated.save()
    res.status(201).json(JsonResponse('Cập nhật nhóm block thành công!', dataGroupGroupUpdated))
  },
  /**
	 *  delete group block by user
	 *  @param req
	 *  @param res
	 *
	 */
	delete: async (req, res, next) => {
		const userId = Secure(res, req.headers.authorization)
		const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundGroupBlock = await GroupBlock.findById(req.query._groupId)    
		if (!foundGroupBlock) return res.status(404).json(JsonResponse('Nhóm block không tồn tại!', null))
		// Delete block in group block
		const foundDefaultGroup = await GroupBlock.findOne({ 'name': 'Mặc Định', '_account': userId })
		if (req.query._blockId) {
			if (foundGroupBlock.blocks.includes(req.query._blockId)){
				foundGroupBlock.blocks.pull(req.query._blockId)
				await foundGroupBlock.save()
				foundDefaultGroup.push(req.query._blockId)
				await foundDefaultGroup.save()
				return res.status(200).json(JsonResponse('Xóa block trong nhóm block thành công! ', foundGroupBlock))
			}
			next()
		}
		foundGroupBlock.blocks.map(async (value, index, array) => {
			foundDefaultGroup.blocks.push(value)
			await foundDefaultGroup.save()
		})
    await GroupBlock.findByIdAndRemove( req.query._groupId)
    res.status(200).json(JsonResponse('Xóa nhóm block thành công!', null))
  }
}
