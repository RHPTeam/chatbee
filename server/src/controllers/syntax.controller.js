/**
 * Controller vocate for project
 * author: Tran Toan (Sky Albert)
 * date up: 18/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require("../models/Account.model")
const Syntax = require("../models/Syntax.model")


const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')

module.exports = {

	/**
	 *  Get All Syntax (Note: User only can get all syntax of them)
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
			!req.query ? dataResponse = await Syntax.find({'_account': userId}) : dataResponse = await Syntax.find(req.query)
			if (!dataResponse) return res.status(403).json(JsonResponse("Cú pháp không tồn tại"))
			dataResponse = dataResponse.map((item) => {
				if (item._account.toString() === userId) return item
			})
		} else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
			dataResponse = await Syntax.find(req.query)
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
		
	},

	/**
	 *    What?
	 *  @param req
	 *  @param res
	 *
	 */
	delete: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
		if (!req.query._vocateId) return res.status(404).json(JsonResponse('Query thất bại! Vui lòng kiểm tra lại api', null))
		const vocateResult = await Vocate.findOne({ '_id': req.query._vocateId })
		if (!vocateResult) res.status(403).json(JsonResponse('Danh xưng này không tồn tại!', null))
		if (vocateResult._account.toString() !== userId) return res.status(405).json(JsonResponse('Bạn không có quyền cho mục này!', null))
		await vocateResult.remove()
		res.status(200).json(JsonResponse('Xóa dữ liệu thành công!', null))
	}
}