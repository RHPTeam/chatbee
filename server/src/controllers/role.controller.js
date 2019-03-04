/**
 * Controller Role for project
 * author: hocpv
 * date up: 18/02/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const Role = require('../models/Role.model')

const JsonResponse = require('../configs/res')

module.exports = {
  /**
   *  Get all role
   *  @param req
   *  @param res
   */
  index: async (req, res) => {
    const dataRoleFound = await Role.find({})
    if (!dataRoleFound) return res.status(403).json(JsonResponse('Data Role is not found!', null))
    res.status(200).json(JsonResponse('Data Role fetch successfully!', dataRoleFound))
  },

  /**
   *  Add Role
   *  @param req
   *  @param res
   *
   */
  create: async (req, res) => {
    const userIdAdmin = req.query._user
    const addRole = await new Role(req.body)
    // check exist account superadmin
    const foundUserAdmin = await Account.findById(userIdAdmin)
    if (!foundUserAdmin) return res.status(403).json(JsonResponse('User is not found!', null))
    // check user has role superadmin
    const findRoleAdmin = await Role.findById(foundUserAdmin._role)
    if ((findRoleAdmin.level) !== 'SuperAdmin') return res.status(403).json(JsonResponse('Account not permisstion create roles!', null))
    // check role is exist
    const foundRole = await Role.find({ 'level': req.body.level })
    if (foundRole.length > 0) return res.status(403).json(JsonResponse('Role is exist!', null))
    addRole._owners = userIdAdmin
    await addRole.save()
    res.status(200).json(JsonResponse('Create role successfull', addRole))
  },

  /**
   *  Update Role
   *  @param req
   *  @param res
   *
   */
  update: async (req, res) => {
    const { body, query } = req
    // check exist account superadmin
    const foundUserAdmin = await Account.findById(query._user)
    if (!foundUserAdmin) return res.status(403).json(JsonResponse('User is not found!', null))
    // check user has role superadmin
    const findRoleAdmin = await Role.findById(foundUserAdmin._role)
    if ((findRoleAdmin.level) !== 'SuperAdmin') return res.status(403).json(JsonResponse('Account not permisstion create roles!', null))
    // check role not found
    const foundRole = await Role.findById(query._role)
    if (!foundRole) return res.status(403).json(JsonResponse('Role is not found'))
    const dataRoleUpdated = await Role.findByIdAndUpdate(query._role, { $set: body }, { new: true })
    res.status(201).json(JsonResponse('Update role successfull!', dataRoleUpdated))
  },

  /**
   *  Delete Role
   *  @param req
   *  @param res
   *
   */
  delete: async (req, res) => {
    const { query } = req
    // check exist account superadmin
    const foundUserAdmin = await Account.findById(query._user)
    if (!foundUserAdmin) return res.status(403).json(JsonResponse('User is not found!', null))
    // check user has role superadmin
    const findRoleAdmin = await Role.findById(foundUserAdmin._role)
    if ((findRoleAdmin.level) !== 'SuperAdmin') return res.status(403).json(JsonResponse('Account not permisstion create roles!', null))
    // check role not found
    const foundRole = await Role.findById(query._role)
    if (!foundRole) return res.status(403).json(JsonResponse('Role is not found'))
    await Role.findByIdAndRemove(query._role)
    res.status(201).json(JsonResponse('Delete role successfull!', null))
  }

}
