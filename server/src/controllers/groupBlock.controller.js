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


const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')

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
			!req.query._id ? dataResponse = await GroupBlock.find({'_account': userId}) : dataResponse = await GroupBlock.find({'_id':req.query._id, '_account': userId})
			if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
			dataResponse = dataResponse.map((item) => {
				if (item._account.toString() === userId) return item
			})
		} else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
			dataResponse = await GroupBlock.find(req.query)
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
    // create group default for user
    const foundDefaultGroup = await GroupBlock.findOne({ 'name': 'default', '_account': userId })
    if (!foundDefaultGroup) {
      const defaultGroup = await new GroupBlock()
      defaultGroup.name = 'default'
      defaultGroup._account = userId
      await defaultGroup.save()
		}
    const foundGroupBlock = await GroupBlock.findOne({ 'name':  req.body.name, '_account': userId })
    if (foundGroupBlock) return res.status(403).json(JsonResponse('Nhóm block đã tồn tại!', null))
    const newGroupBlock = await new GroupBlock(req.body)
		newGroupBlock._account =  userId
    await newGroupBlock.save()
    res.status(200).json(JsonResponse('Tạo nhóm block thành công!', newGroupBlock))
	},
	addBlock: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const foundUser = await Account.findById(userId).select('-password')
		if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
		const foundGroupBlock = await GroupBlock.findOne({'_id': req.query._groupId, '_account': userId})
		if (!foundGroupBlock) return res.status(403).json(JsonResponse('Nhóm block không tồn tại!', null))
		const foundBlock  = await Block.findOne({'_id':req.body.block, '_account': userId})
		if(!foundBlock) return res.status(403).json(JsonResponse('Bạn không có block này!', null))
		foundGroupBlock.blocks.push(req.body.block)
		await foundGroupBlock.save()
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
		if (req.query._blockId) {
			if (foundGroupBlock.blocks.includes(req.query._blockId)){
				foundGroupBlock.blocks.pull(req.query._blockId)
				await foundGroupBlock.save()
				return res.status(200).json(JsonResponse('Xóa block trong nhóm block thành công! ', foundGroupBlock))
			}
			next()
		}
		if (req.query._type === 'default') {
      const foundDefaultGroup = await GroupBlock.findOne({ 'name': 'default', '_account': userId })
      foundGroupBlock.blocks.map(async (value, index, array) => {
        foundDefaultGroup.blocks.push(value)
        await foundDefaultGroup.save()
      })
    }
    await GroupBlock.findByIdAndRemove( req.query._groupId)
    res.status(200).json(JsonResponse('Xóa nhóm block thành công!', null))
  }
}
