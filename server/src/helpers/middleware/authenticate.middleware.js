const jwt = require('jsonwebtoken')

const JsonResponse = require('../../configs/res')
const Account = require('../../models/Account.model')
const config = require('../../configs/configs')

/**
 *  The Auth Checker middleware function.
 */

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.status(404).json(JsonResponse('Your cookie is not found!', null))
  const token = req.headers.authorization
  return jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).end()
    const userId = decoded.sub
    return Account.findById(userId, (userErr, user) => {
      if (userErr || !user) return res.status(401).end()
      return next()
    })
  })
}
