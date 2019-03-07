/**
 * Controller socket messenger facebook for project
 * author: hocpv
 * date up: 19/02/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const Block = require('../models/Blocks.model')
const GroupBlock = require('../models/GroupBlocks.model')


const JsonResponse = require('../configs/res')

module.exports = {
	/**
	 *  get all groupt block & group block by Id
	 *  @param req
	 *  @param res
	 *
	 */
	index: async (req, res) => {
		const dataFound = await GroupBlock.find(req.query)
		if (!dataFound)
			return res.status(403).json(JsonResponse('Data is not found!', null))
		res.status(200).json(JsonResponse('Data fetch successfully!', dataFound))
	},
	/**
	 *  create block by user
	 *  @param req
	 *  @param res
	 *
	 */
	create: async (req, res) => {
		const foundUser = await Account.findById(req.query._userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
    // create group default for user
    const foundDefaultGroup = await GroupBlock.findOne({ 'name': 'default', '_account': req.query._userId })
    if (!foundDefaultGroup) {
      const defaultGroup = await new GroupBlock()
      defaultGroup.name = 'default'
      defaultGroup._account = req.query._userId
      await defaultGroup.save()
		}
    const foundGroupBlock = await GroupBlock.findOne({ 'name':  req.body.name, '_account': req.query._userId })
    if (foundGroupBlock) return res.status(403).json(JsonResponse('Group block of account  is exist!', null))
    const newGroupBlock = await new GroupBlock(req.body)
		newGroupBlock._account =  req.query._userId
		newGroupBlock.blocks.push(req.body.block)
    await newGroupBlock.save()
    res.status(200).json(JsonResponse('Create Group Block Succesfull', newGroupBlock))
	},
	addBlock: async (req, res) => {
		const foundUser = await Account.findById(req.query._userId).select('-password')
		if(!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
		const foundGroupBlock = await GroupBlock.findOne({'_id': req.query._groupId, '_account': req.query._userId})
		if (!foundGroupBlock) return res.status(403).json(JsonResponse('Group block is not exist!', null))
		foundGroupBlock.blocks.push(req.body.block)
		await foundGroupBlock.save()
		res.status(200).json(JsonResponse('Add block in group block successfull!', foundGroupBlock))
	},
  /**
	 *  update group block by user
	 *  @param req
	 *  @param res
	 *
	 */
	update: async (req, res) => {
		const {
      body,
      query
    } = req
    if (!query._userId) return res.status(405).json(JsonResponse('Not authorized!', null))
    const foundUser = await Account.findById(query._userId)
    if (!foundUser) return res.status(403).json(JsonResponse('User is not found!', null))
    if (JSON.stringify(query._userId) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Authorized is wrong!', null))
		const dataGroupGroupUpdated = await GroupBlock.findOne({'_id': query._groupId, '_account': query._userId})
		dataGroupGroupUpdated.name = body.name
		await dataGroupGroupUpdated.save()
    res.status(201).json(JsonResponse('Update group successfull!', dataGroupGroupUpdated))
  },
  /**
	 *  delete group block by user
	 *  @param req
	 *  @param res
	 *
	 */
	delete: async (req, res, next) => {
		const foundUser = await Account.findById(req.query._userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
    const foundGroupBlock = await GroupBlock.findById(req.query._groupId)    
		if (!foundGroupBlock) return res.status(404).json(JsonResponse('Group block is not found!', null))
		// Delete block in group block
		if (req.query._blockId) {
			if (foundGroupBlock.blocks.includes(req.query._blockId)){
				foundGroupBlock.blocks.pull(req.query._blockId)
				await foundGroupBlock.save()
				return res.status(200).json(JsonResponse('Deleted block  in this group block successfull! ', foundGroupBlock))
			}
			next()
		}
		if (req.query._type === 'default') {
      const foundDefaultGroup = await GroupBlock.findOne({ 'name': 'default', '_account': req.query._userId })
      foundGroupBlock.blocks.map(async (value, index, array) => {
        foundDefaultGroup.blocks.push(value)
        await foundDefaultGroup.save()
      })
    }
    await GroupBlock.findByIdAndRemove( req.query._groupId)
    res.status(200).json(JsonResponse('Delete group script successfull!', null))
  }
}
