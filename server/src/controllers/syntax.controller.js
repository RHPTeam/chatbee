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
const Dictionaries = require('../configs/dictionaries')
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
			}).filter(item => {
				if (item === undefined) return
				return true
			})
		} else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
			dataResponse = await Syntax.find(req.query)
			if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
		}
		res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
	},

	/**
	 * 	When user create, system auto generate name of syntax. Currently, when user setup, system will apply for all their customer
	 *  @param req
	 *  @param res
	 *
	 */
	create: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

		const syntaxCurrentDatabase = await Syntax.find({ '_account': userId })
		let nameArr = syntaxCurrentDatabase.map(syntax => {
			if (syntax.title.toLowerCase().includes(Dictionaries.SYNTAX.toLowerCase()) === true)
			return syntax.title
		}).filter(item => {
			if (item === undefined) return
			return true
		}).map(item => parseInt(item.slice(Dictionaries.SYNTAX.length)))
		const indexCurrent = Math.max(...nameArr)

		const syntaxObjectSaver = {
			title: syntaxCurrentDatabase.length === 0 || nameArr.length === 0 ? `${Dictionaries.SYNTAX} 0` : `${Dictionaries.SYNTAX} ${indexCurrent + 1}`,
			_account: userId,
			created_at: Date.now()
		}

		const syntaxResult = await new Syntax(syntaxObjectSaver)
		await syntaxResult.save()
		res.status(201).json(JsonResponse("Tạo cú pháp thành công!", syntaxResult))
	},

	/**
	 *  Update a syntax using default query _id. Ex: localhost/syntax?_id=1
	 *  @param req
	 *  @param res
	 *
	 */
	update: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
		if (!req.query._id) return res.status(403).json(JsonResponse('Cú pháp query sai, vui lòng kiểm tra lại!', req.query ))

		const syntaxObjectSaver = {
			title: req.body.title,
			name: req.body.name ? req.body.name : [],
			_account: userId,
			_facebook: req.body._facebook ? req.body._facebook : [],
			updated_at: Date.now()
		}

		const syntaxResult = await Syntax.findByIdAndUpdate(req.query._id, { $set: syntaxObjectSaver }, { new: true })
		req.body.content ? syntaxResult.content.push(req.body.content) :  syntaxResult.content
		if (req.body.facebook) {
			if (syntaxResult._facebook.indexOf(req.body.facebook) > -1) return res.status(405).json(JsonResponse('Bạn đã thêm cú pháp vào tài khoản facebook này, hãy thêm tài khoản facebook khác!', null))
			syntaxResult._facebook.push(req.body.facebook)
			await syntaxResult.save()
		}
		await syntaxResult.save()
		res.status(200).json(JsonResponse("Cập nhật cú pháp thành công!", syntaxResult))
	},

	/**
	 *  Delete a syntax using query _syntaxId. Ex: localhost/syntax?_syntaxId=1
	 *  @param req
	 *  @param res
	 *
	 */
	delete: async (req, res) => {
		const userId = Secure(res, req.headers.authorization)
		const accountResult = await Account.findById(userId)
		if (!accountResult) res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
		if (!req.query._id) return res.status(404).json(JsonResponse('Query thất bại! Vui lòng kiểm tra lại api', null))
		const syntaxResult = await Syntax.findOne({ '_id': req.query._id })
		if (!syntaxResult) res.status(403).json(JsonResponse('Cú pháp này không tồn tại!', null))
		if (syntaxResult._account.toString() !== userId) return res.status(405).json(JsonResponse('Bạn không có quyền cho mục này!', null))
		await syntaxResult.remove()
		res.status(200).json(JsonResponse('Xóa dữ liệu thành công!', null))
	}
}