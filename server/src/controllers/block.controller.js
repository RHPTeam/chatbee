/**
 * Controller block for project
 * author: hocpv
 * date up: 07/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const Block = require('../models/Blocks.model')
const GroupBlock = require('../models/GroupBlocks.model')
const base64Img = require('base64-img')

const JsonResponse = require('../configs/res')

module.exports = {
	/**
	 *  get all block & block by Id
	 *  @param req
	 *  @param res
	 *
	 */
	index: async (req, res) => {
		const dataFound = await Block.find(req.query)
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
    const foundBlock = await Block.findOne({'name': req.body.name, '_account': req.query._userId})
    if (foundBlock) return res.status(403).json(JsonResponse('You is created this block', null))
    const block = await new Block(req.body)
    if (req.query._type === 'image') {
      const content = {
        valueText: base64Img.base64Sync(req.body.valueText),
        typeContent: 'image'
      }
      block.contents.push(content)
      block._account = req.query._userId
      await block.save()
      return res.status(200).json(JsonResponse('Create block successfull!', block))
    }
    const content = {
      valueText: req.body.valueText,
      typeContent: 'text'
    }
    block.contents.push(content)
    block._account = req.query._userId
    await block.save()
    res.status(200).json(JsonResponse('Create block successfull!', block))
  },
  /**
	 *  create item in block by user
	 *  @param req
	 *  @param res
	 *
	 */
  createItem: async (req, res) => {
    const foundUser = await Account.findById(req.query._userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
    const foundBlock = await Block.findOne({'_id': req.query._blockId, '_account': req.query._userId})
    if (!foundBlock) return res.status(403).json(JsonResponse('Block is not exist!', null))
    if (req.query._type === 'image') {
      const content = {
        valueText: base64Img.base64Sync(req.body.valueText),
        typeContent: 'image'
      }
      foundBlock.contents.push(content)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Create item in block successfull!', foundBlock))
    }
    const content = {
      valueText: req.body.valueText,
      typeContent: 'text'
    }
    foundBlock.contents.push(content)
    await foundBlock.save()
    res.status(200).json(JsonResponse('Create item in block successfull!', foundBlock))
  },
  /**
	 *  update block by user
	 *  @param req
	 *  @param res
	 *
	 */
	update: async (req, res) => {
    const foundUser = await Account.findById(req.query._userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
    if (JSON.stringify(req.query._userId) !== JSON.stringify(foundUser._id)) return res.status(403).json(JsonResponse('Authorized is wrong!', null))
    const foundBlock = await Block.findById(req.query._blockId)    
    if (!foundBlock) return res.status(404).json(JsonResponse('Block is not found!', null))
    // update item in block
    if(req.query._itemId) {
      const findItem = foundBlock.contents.filter(x => x.id === req.query._itemId)[0]
      if (typeof findItem === 'undefined') return res.status(403).json(JsonResponse('Item content is not exist in this block !', null))
      if (req.query._type === 'image') {
        findItem.valueText = base64Img.base64Sync(req.body.valueText),
        findItem.typeContent = 'image'
        await foundBlock.save()
        return res.status(201).json(JsonResponse('Update item in block successfully!', foundBlock))
      }
      findItem.valueText = req.body.valueText,
      findItem.typeContent = 'text'
      await foundBlock.save()
      return res.status(201).json(JsonResponse('Update item in block successfully!', foundBlock))
    }
    // update name block
    foundBlock.name = req.body.name
    await foundBlock.save()
    res.status(201).json(JsonResponse('Update item in block successfully!', foundBlock))
  },
  /**
	 *  delete block by user
	 *  @param req
	 *  @param res
	 *
	 */
	delete: async (req, res, next) => {
    const foundUser = await Account.findById(req.query._userId).select('-password')
    if(!foundUser) return res.status(403).json(JsonResponse('User is not exist!', null))
    const foundBlock = await Block.findById(req.query._blockId)    
    if (!foundBlock) return res.status(404).json(JsonResponse('Block is not found!', null))
     // delete item in script using query
     if (req.query._itemId) {
      const findItem = foundBlock.contents.filter(x => x.id === req.query._itemId)[0]
      if (typeof findItem === 'undefined') return res.status(403).json(JsonResponse('Item content is not exist in this block !', null))
      foundBlock.contents.pull(findItem)
      await foundBlock.save()
      return res.status(200).json(JsonResponse('Deleted item content in this block successfull! ', foundBlock))
    }
    const foundGroupBlock = await GroupBlock.find({'_account': req.query._userId})
    foundGroupBlock.map(async (value, index, array) => {
      if (value._block.includes(foundBlock._id)){
        value._block.pull(foundBlock._id)
        await value.save()
      }
      next()
    })
  
    await Block.findByIdAndRemove(req.query._blockId)
    res.status(200).json(JsonResponse('Delete block successfull!', null))
  }
}
