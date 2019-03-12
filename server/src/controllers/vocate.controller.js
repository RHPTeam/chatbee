/**
 * Controller vocate for project
 * author: Tran Toan (Sky Albert)
 * date up: 10/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require("../models/Account.model")
const Friends = require("../models/Friends.model")
const Vocate = require("../models/Vocate.model")

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')

module.exports = {
  /**
   *    What?
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
      !req.query ? dataResponse = await Vocate.find({'_account': userId}) : dataResponse = await Vocate.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Danh xưng không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Vocate.find(req.query)
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
    let dataResponse = null
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    // Remove item same value in array _friends
    const friends = req.body._friends
    const friendsChecked = ArrayFunction.removeDuplicates(friends)

    // Check item friends have exists in friends collection (Waiting hoc 's branch)

    const listVocates = await Vocate.find({'_account': userId})
    if (listVocates.length === 0) {
      const objectSaver = {
        name: req.body.name.toLowerCase(),
        _friends: friendsChecked,
        _account: userId,
        created_at: Date.now()
      }
      dataResponse = await new Vocate(objectSaver)
    }

    // Check name is exists
    const nameConverted = ConvertUnicode(req.body.name)
    dataResponse = listVocates.map(async vocate => {
      if (nameConverted.toString().toLowerCase() !== ConvertUnicode(vocate.name).toString().toLowerCase()) {
        console.log("Khong trung!")
      }
      // Find vocate include name exists
      const vocateFound = await Vocate.findOne({'name': req.body.name.toLowerCase()})
      // Push new item friend to _friends
      friendsChecked.map(friend => {
        const arrFriends = vocateFound._friends.map(function (vocate) {
          return vocate['_id'].toString()
        })
        arrFriends.includes(friend) !== true ? vocateFound._friends.push(friend) : res.status(403).json(JsonResponse("Có lỗi xảy ra!", { 'id': friend}))
      })
      console.log(vocateFound)
      console.log(typeof vocateFound)
      return vocateFound
    })
    // Restructure data send from client
    if (dataResponse === null) return;
    dataResponse.updated_at = Date.now()
    console.log(dataResponse)
    await dataResponse.save()
    res.status(201).json(JsonResponse("Thao tác danh xưng thành công!", dataResponse))
  },
  /**
   *    What?
   *  @param req
   *  @param res
   *
   */
  update: async (req, res) => {
    // Step 01: Authorize
    // Check Header has: Authorize to get Id

    // Do Conditional Results

    // ========================================

    // Step 02: Restructure Object

    // Step 03: Catch Code

    // Step 04: Action

    // Step 05: Response
  },
  /**
   *    What?
   *  @param req
   *  @param res
   *
   */
  delete: async (req, res) => {
    // Step 01: Authorize
    // Check Header has: Authorize to get Id

    // Do Conditional Results

    // ========================================

    // Step 02: Restructure Object

    // Step 03: Catch Code

    // Step 04: Action

    // Step 05: Response
  }
}