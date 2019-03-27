/**
 * Controller vocate for project
 * author: Tran Toan (Sky Albert)
 * date up: 10/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require("../models/Account.model")
const Friend = require("../models/Friends.model")
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
      !req.query ? dataResponse = await Vocate.find({'_account': userId}).stream() : dataResponse = await Vocate.find(req.query).stream()

      if (!dataResponse) return res.status(403).json(JsonResponse("Danh xưng không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      }).filter(item => {
        if (item === undefined) return
        return true
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
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    // Remove item same value in array _friends
    const friends = req.body._friends
    const friendsChecked = ArrayFunction.removeDuplicates(friends)

    // Check item friends have exists in friends collection
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

    const listVocates = await Vocate.find({'_account': userId})
    if (listVocates.length === 0) {
      const objectSaver = {
        name: req.body.name.toLowerCase(),
        _friends: friendsChecked,
        _account: userId,
        updated_at: Date.now()
      }
      const dataResponse = await new Vocate(objectSaver)
      await dataResponse.save()
      return res.status(201).json(JsonResponse("Tạo danh xưng thành công!", dataResponse))
    }

    // Check name is exists
    const nameConverted = ConvertUnicode(req.body.name)
    const resData = await Vocate.find({ '_account': userId })

    const resultCheckCon = await Promise.all(listVocates.map(async vocate => {
      if (nameConverted.toString().toLowerCase() === ConvertUnicode(vocate.name).toString().toLowerCase()) {
        const vocateFound = await Vocate.findOne({ 'name': req.body.name.toLowerCase() })
        await resData.filter(vocate => {
          if (ConvertUnicode(vocate.name).toString().toLowerCase() === ConvertUnicode(vocateFound.name).toString().toLowerCase()) return
          return true
        }).map(item => {
          item._friends.map((friendItem, index, item) => {
            friendsChecked.map(fi => {
              if (fi.toString() === friendItem['_id'].toString()) return item.pop(friendItem)
            })
          })
        })
        if (resData.length === 0) return
        resData.map(async vocate => { await vocate.save() })
        await friendsChecked.map(friend => {
          const arrFriends = vocateFound._friends.map(function (vocate) {
            return vocate['_id'].toString()
          })
          if (arrFriends.includes(friend) !== true) {
            vocateFound._friends.push(friend)
          }
          return false;
        })
        vocateFound._account = userId
        vocateFound.updated_at = Date.now()
        return vocateFound
      }
    })).then(results => {
      const dataResult = results.filter(item => {
        if (item === undefined) return
        return true
      }).map(item => {
        return item
      })
      if (dataResult.length === 0) return
      dataResult[0].save()
      return res.status(200).json(JsonResponse("Cập nhật danh xưng thành công!", dataResult[0]))
    })

    if (resultCheckCon === undefined) {
      resData.map(item => {
        item._friends.map((friendItem, index, item) => {
          friendsChecked.map(fi => {
            if (fi.toString() === friendItem['_id'].toString()) return item.pop(friendItem)
          })
        })
      })
      resData.map(async vocate => { await vocate.save() })

      const objectSaver = {
        name: req.body.name.toLowerCase(),
        _friends: friendsChecked,
        _account: userId,
        updated_at: Date.now()
      }

      const dataResponse = await new Vocate(objectSaver)
      await dataResponse.save()
      res.status(201).json(JsonResponse("Thao tác danh xưng thành công!", dataResponse))
    }
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
