const jwt = require('jsonwebtoken')
const JsonResponse = require('../../configs/res')
const config = require('../../configs/configs')

module.exports = (res, authorization) => {
	return jwt.verify(authorization, config.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).end()
		return decoded.sub
	})
}
