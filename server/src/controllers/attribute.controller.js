/**
 * Controller attribute for project
 * author: Tran Toan (Sky Albert)
 * date up: 08/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require("../models/Account.model")
const Friends = require("../models/Friends.model")
const Attribute = require("../models/Attribute.model")

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')

module.exports = {
	/**
	 *	Get All data from Attribute collection
	 *  @param req
	 *  @param res
	 *	Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
	 */
	index: async (req, res) => {
		let dataResponse = null
		const authorization = req.headers.authorization
		const role = req.headers.cfr

		const userId = Secure(res, authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

		if (DecodeRole(role, 10) === 0) {
			!req.query ? dataResponse = await Attribute.find({'_account': userId}) : dataResponse = await Attribute.find(req.query)
			if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
			dataResponse = dataResponse.map((item) => {
				if (item._account.toString() === userId) return item
			})
		} else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
			dataResponse = await Attribute.find(req.query)
			if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
		}
		res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
	},
	/**
	 * What?
	 *  @param req
	 *  @param res
	 *
	 */
	create: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
		const objectSaver = {
			name: req.body.name,
			value: req.body.value
		}
		const attribute = await new Attribute(objectSaver)
		attribute._account = userId
		await attribute.save()
		res.status(201).json(JsonResponse("Tạo thuộc tính thành công =))", attribute))
	},
	/**
	 *	What?
	 *  @param req
	 *  @param res
	 *
	 */
	update: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
		const attrResult = await Attribute.findOne({'_id': req.query._attrId})
		if (attrResult._account.toString() !== userId) return res.status(405).json(JsonResponse("Bạn không có quyền cho mục này!", null))
		if (!attrResult) res.status(403).json(JsonResponse("Thuộc tính này không tồn tại!", null))
		const objectSaver = {
			name: req.body.name,
			value: req.body.value,
			updated_at: Date.now()
		}
		const newAttribute = await Attribute.findByIdAndUpdate(req.query._attrId, { $set: objectSaver }, { new: true })
		res.status(200).json(JsonResponse("Cập nhật thuộc tính thành công!", newAttribute))
	},
	/**
	 *	What?
	 *  @param req
	 *  @param res
	 *
	 */
	delete: async (req, res, next) => {
		const userId = Secure(res, req.headers.authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
		const attrResult = await Attribute.findOne({'_id': req.query._attrId})
		if (!attrResult) res.status(403).json(JsonResponse("Thuộc tính này không tồn tại!", null))
		if (attrResult._account.toString() !== userId) return res.status(405).json(JsonResponse("Bạn không có quyền cho mục này!", null))
		await attrResult.remove()
		res.status(200).json(JsonResponse("Xóa dữ liệu thành công!", null))
	}
}
