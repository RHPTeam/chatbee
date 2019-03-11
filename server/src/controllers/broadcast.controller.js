/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 08/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require ('../models/Account.model')
const Broadcast = require ('../models/Broadcasts.model')

const JsonResponse = require('../configs/res')

module.exports = {
  /**
   * Get all(id) broadcast
   * @param: req
   * @param: res
   */
  index: async (req, res) => {
    const dataFound = await Broadcast.find(req.query)
    if (!dataFound)
      return res.status(403).json(JsonResponse('Data is not found!', null))
    res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
  },
  /**
   * Create broadcast
   * @param: req
   * @param: res
   */
  create: async (req, res) => {
    const foundUser = await Account.findById(req.query._userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))

    const foundBroadcastDel = await Broadcast.findOne({'typeBroadCast': 'Deliver', '_account': req.query._userId})
    const foundBroadcastSch = await Broadcast.findOne({'typeBroadCast': 'Schedule', '_account': req.query._userId})
    const newBroadcastDel = await new Broadcast()
    const newBroadcastSch = await new Broadcast()
    if(!foundBroadcastDel && !foundBroadcastSch) {
      newBroadcastDel.typeBroadCast = 'Deliver'
      await  newBroadcastDel.save()

      newBroadcastSch.typeBroadCast = 'Schedule'
      await newBroadcastSch.save()

     return res.status(200).json(JsonResponse('You are already create broadcast', null))
    }
    if (!foundBroadcastDel) {
      newBroadcastDel.typeBroadCast = 'Deliver'
      await  newBroadcastDel.save()
    }
    if (!foundBroadcastSch) {
      newBroadcastSch.typeBroadCast = 'Schedule'
      await newBroadcastSch.save()
    }
    res.status(403).json(JsonResponse('You are already create broadcast', null))
  },
  /**
   * Update broadcast
   * @param: req
   * @param: res
   */
  update: async (req, res) => {

  },
  /**
   * Delete broadcast
   * @param: req
   * @param: res
   */
  delete: async (req, res) => {

  },
}