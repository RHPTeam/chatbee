const Joi = require('joi')
const JsonResponse = require('../../configs/res')

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req['params'][name] }, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value) req.value = {}
        if (!req.value['params']) req.value['params'] = {}
        req.value['params'][name] = result.value.param
        next()
      }
    }
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema)
      if (result.error) {
        return res.status(405).json(JsonResponse('Validator is error!', result.error))
      } else {
        if (!req.value) req.value = {}
        if (!req.value['body']) req.value['body'] = {}
        req.value['body'] = result.value
        next()
      }
    }
  },

  /**
   * Schema Define validator
   */
  schemas:
    {
      idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      }),
      userSignInSchema: Joi.object().keys({
        email: Joi.string().email().required().label('Email không đúng định dang!'),
        password: Joi.string().min(6).max(20).required().label('Mật khẩu phải ít nhất 6 ký tự và tối đa 20 ký tự!')
      }),
      userSignUpSchema: Joi.object().keys({
        name: Joi.string().min(6).max(50).required().label('Tên phải ít nhất 6 ký tự và tối đa 50 ký tự!'),
        email: Joi.string().email().required().label('Email không đúng định dang!'),
        password: Joi.string().min(6).max(20).required().label('Mật khẩu phải ít nhất 6 ký tự và tối đa 20 ký tự!'),
        phone: Joi.string().min(9).max(20).required().label('Số điện thoại phải lớn hơn 9 số!'),
        imageAvatar: Joi.string().label('Định dạng ảnh là một url path')
      })
    }
}
