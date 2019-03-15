/**
 * Controller group block for project
 * author: hocpv
 * date up: 13/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const GroupFriend = require('../models/GroupFriends.model')
const Friend = require('../models/Friends.model')

const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const ArrayFunction = require('../helpers/util/arrayFunction.util')

module.exports = {
  /**
   *  get all group friend & group friend by Id
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
      !req.query._id ? dataResponse = await GroupFriend.find({'_account': userId}) : dataResponse = await GroupFriend.find({'_id':req.query,'_account': userId})
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await GroupFriend.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   *  create group friend
   *  @param req
   *  @param res
   *
   */
  create: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundGroupFriend = await GroupFriend.find({'_account': userId})
    let checkName = false
    foundGroupFriend.map(val => {
      if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
        checkName = true
        return checkName
      }
    })
    if (checkName) return res.status(403).json(JsonResponse('Tên nhóm bạn bè đã tồn tại!', null))
    const newGroupFriend = await new GroupFriend()
    newGroupFriend.name = req.body.name
    newGroupFriend._account = userId
    await  newGroupFriend.save()
    res.status(200).json(JsonResponse('Tạo nhóm bạn bè thành công!', newGroupFriend))
  },
  /**
   *  update group friend
   *  @param req
   *  @param res
   *
   */
  update: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundGroupFriend = await GroupFriend.findById(req.query._groupId)
    if(!foundGroupFriend) return res.status(403).json(JsonResponse('Nhóm bạn bè không tồn tại!', null))
    // Check name group friend is exist
    const foundAllGroupFriend = await GroupFriend.find({'_account': userId})
    let checkName = false
    foundAllGroupFriend.map(val => {
      if(ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(req.body.name).toString().toLowerCase()) {
        checkName = true
        return checkName
      }
    })
    foundGroupFriend.name = req.body.name
    await  foundGroupFriend.save()
    res.status(201).json(JsonResponse('Cập nhật nhóm bạn bè thành công!', foundGroupFriend))
  },
  /**
   *  add friend to group friend
   *  @param req
   *  @param res
   *
   */
  addFriend: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundGroupFriend = await GroupFriend.findById(req.query._groupId)
    if(!foundGroupFriend) return res.status(403).json(JsonResponse('Nhóm bạn bè không tồn tại!', null))

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
      if(foundGroupFriend._friends.indexOf(val) > -1) {
        checkCon = true
        return checkCon
      }
    })
    if (checkCon) return res.status(405).json(JsonResponse('Bạn đã thêm một trong những bạn bè này!', null))
    const checkFriend = ArrayFunction.removeDuplicates(friends)
    checkFriend.map(val => {
      foundGroupFriend._friends.push(val)
    })
    await foundGroupFriend.save()
    res.status(200).json(JsonResponse('Thêm bạn bè vào danh sách bạn bè thành công!', foundGroupFriend))
  },
  /**
   *  delete group friend
   *  @param req
   *  @param res
   *
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const foundUser = await Account.findById(userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('Người dùng không tồn tại!', null))
    const foundGroupFriend = await GroupFriend.findById(req.query._groupId)
    if(!foundGroupFriend) return res.status(403).json(JsonResponse('Nhóm bạn bè không tồn tại!', null))
    if (req.query._friend){

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
        if(foundGroupFriend._friends.indexOf(val) < 0) {
          checkCon = true
          return checkCon
        }
      })
      if (checkCon) return res.status(405).json(JsonResponse('Không tồn tại một trong các bạn bè bạn muốn xóa ở nhớm bạn bè này!', null))
      const checkFriend = ArrayFunction.removeDuplicates(friends)
      checkFriend.map(val => {
        foundGroupFriend._friends.pull(val)
      })
      await foundGroupFriend.save()
      return res.status(200).json(JsonResponse('Xóa bạn bè trong nhóm bạn bè thành công!', foundGroupFriend))
    }
    await GroupFriend.findByIdAndRemove(userId)
    res.status(200).json(JsonResponse('Xóa nhóm bạn bè thành công!', null))
  },
}
