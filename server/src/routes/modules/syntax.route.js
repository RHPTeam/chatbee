/**
 * Create route Role for project
 * author: hocpv
 * date: 18/02/2019
 * team: BE-RHP
 */
const router = require('express-promise-router')()
const SyntaxController = require('../../controllers/syntax.controller')

router.route('/')
	.get(SyntaxController.index)
	.post(SyntaxController.create)
	.patch(SyntaxController.update)
	.delete(SyntaxController.delete)

module.exports = router
