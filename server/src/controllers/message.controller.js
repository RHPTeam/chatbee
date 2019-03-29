/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 15/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require('../models/Account.model')
const Message = require('../models/Messages.model')
const Facebook = require('../models/Facebook.model')
const Friend = require('../models/Friends.model')
const Block = require('../models/Blocks.model')
const Syntax = require('../models/Syntax.model')
const Vocate = require('../models/Vocate.model')
const Attribute = require('../models/Attribute.model')
const Sequence = require('../models/Sequence.model')
const Broadcast = require('../models/Broadcasts.model')


const Dictionaries = require('../configs/dictionaries')
const JsonResponse = require('../configs/res')
const Secure = require('../helpers/util/secure.util')
const DecodeRole = require('../helpers/util/decodeRole.util')
const ConvertUnicode = require('../helpers/util/convertUnicode.util')
const CronJob = require('cron').CronJob
const config = require('../configs/configs');
const fs = require('fs')

let objData
let api = ''
let dataEmit
module.exports = {
  data: () => {
    return dataEmit
  },
  /**
   * Get all(id) message
   * @param: req
   * @param: res
   */
  index: async (req, res) => {
    let dataResponse = null
    const authorization = req.headers.authorization
    const role = req.headers.cfr

    const userId = Secure(res, authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))

    if (DecodeRole(role, 10) === 0) {
      !req.query._id ? dataResponse = await Message.find({'_account': userId}) : dataResponse = await Message.find({
        '_id': req.query._id,
        '_account': userId
      })
      if (!dataResponse) return res.status(403).json(JsonResponse("Thuộc tính không tồn tại"))
      dataResponse = dataResponse.map((item) => {
        if (item._account.toString() === userId) return item
      })
    } else if (DecodeRole(role, 10) === 1 || DecodeRole(role, 10) === 2) {
      dataResponse = await Message.find(req.query)
      if (!dataResponse) return res.status(403).json(JsonResponse("Lấy dữ liệu thất bại!", null))
    }
    res.status(200).json(JsonResponse("Lấy dữ liệu thành công =))", dataResponse))
  },
  /**
   * Create conversation
   * @param: req
   * @param: res
   */
  create: async (dataRes) => {
    console.log(dataRes)
    if (!api) return
    const newMessage = await new Message()
    const foundFriend = await Friend.findById(dataRes.id)
    const foundConversation = await Message.findOne({'_receiver': dataRes.id, '_account': objData._account})
    if (!foundConversation) {
      if (objData.typeData === true) {
        await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (dataRes.content.replace(config.URL, '')))}, foundFriend.userID, async err => {
          if (err) console.log(err)
        })
        newMessage.contents.push({'typeContent': 'image', 'valueContent': dataRes.content, reference: 2})
        newMessage._account = objData._account
        newMessage._sender = objData._sender
        newMessage._receiver = dataRes.id
        await newMessage.save()
      }
      await api.sendMessage(dataRes.content, foundFriend.userID, async err => {
        if (err) console.error(err)
      })
      newMessage.contents.push({'typeContent': 'text', 'valueContent': dataRes.content, reference: 2})
      newMessage._account = objData._account
      newMessage._sender = objData._sender
      newMessage._receiver = dataRes.id
      await newMessage.save()
    } else {
      if (objData.typeData === true) {
        await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (dataRes.content.replace(config.URL, '')))}, foundFriend.userID, async err => {
          if (err) console.log(err)
        })
        foundConversation.contents.push({'typeContent': 'image', 'valueContent': dataRes.content, reference: 2})
        await foundConversation.save()
      }
      await api.sendMessage(dataRes.content, foundFriend.userID, async err => {
        if (err) console.error(err)
      })
      foundConversation.contents.push({'typeContent': 'text', 'valueContent': dataRes.content, reference: 2})
      await foundConversation.save()
    }
  },

  auto: async (apiRes, data) => {
    api = apiRes
    if (!api) return;
    objData = data
    // listen message send from customer
    api.listen(async (err, message) => {
      if (err) console.error(err)
      console.log(message)
      dataEmit = message.body
      const foundFriend = await Friend.find({'userID': message.senderID})
      const foundAllBlock = await Block.find({'_account': objData._account})
      const foundAllSyntax = await Syntax.find({'_account': objData._account})
      const foundAllVocate = await Vocate.find({'_account': objData._account})

      // found syntax when customer message to
      const foundSyntax = foundAllSyntax.map(syntax => {
        if (syntax._facebook.indexOf(objData._facebook) >= 0)
          return syntax
      }).filter(item => {
        if (item === undefined) return
        return true
      }).filter(item => {
        const filterName = item.name.find(name => ConvertUnicode(name.toLowerCase()).toString() === ConvertUnicode(message.body.toLowerCase()).toString())
        if (!filterName) return
        return true
      })[0]
      // found message is a script in block
      const foundBlock = foundAllBlock.find(val => ConvertUnicode(val.name).toString().toLowerCase() === ConvertUnicode(message.body).toString().toLowerCase())
      // found conversation with friend is exist
      const foundConversation = await Message.find({'_receiver': foundFriend[0]._id, '_account': objData._account})

      // found conversation with friend is exist
      const foundConverStrang = await Message.find({'stranger': {'id': message.senderID}, '_account': objData._account})

      // found vocate of friend has already in account facebook able to setting
      const foundVocate = foundAllVocate.find(value => value._friends.indexOf(foundFriend[0]._id) === 0)

      const newMessage = await new Message()

      // Case 1: message from stranger and you accept see on facebook but not reply
      if (foundFriend.length === 0 && foundConverStrang.length === 0) {
        let dataStranger
        api.getUserInfo(message.senderID, async (err, ret) => {
          if (err) return console.log(err)
          dataStranger = Object.values(ret)[0]
          if (message.attachments.length !== 0) {
            if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
              newMessage.stranger = {
                id: message.senderID,
                name: dataStranger.name,
                url: dataStranger.profileUrl,
                image: dataStranger.thumbSrc
              }
              dataEmit = message.attachments[0].url
              newMessage.contents.push({
                'typeContent': 'image',
                'valueContent': message.attachments[0].url,
                reference: 1
              })
              newMessage._account = objData._account
              newMessage._sender = objData._sender
              await newMessage.save()
            }
          } else {
            dataEmit = message.body
            newMessage.stranger = {
              id: message.senderID,
              name: dataStranger.name,
              url: dataStranger.profileUrl,
              image: dataStranger.thumbSrc
            }
            newMessage.contents.push({'typeContent': 'text', 'valueContent': message.body, reference: 1})
            newMessage._account = objData._account
            newMessage._sender = objData._sender
            await newMessage.save()
            // case in script
            if (foundBlock !== undefined) {
              await foundBlock.contents.map(async val => {
                // Handle exist attribute in block
                // if (val.typeContent === 'tag') {
                //   const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                //   foundAttribute._friends.push(foundFriend[0]._id)
                //   return
                // }
                if (val.typeContent) {
                  if (val.typeContent === 'image') {
                    await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    newMessage.contents.push({
                      'typeContent': 'image',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  } else {
                    // Handle process vocate
                    if (val.valueText.includes('{{')) {
                      let arrIndex = []
                      let arrResult = []
                      // bundle array send
                      const findVocateFriend = (val.valueText).split(/[{}]/)
                      // take elements null
                      findVocateFriend.map((value, index, arr) => {
                        if (value === '') {
                          arrIndex.push(index)
                        }
                      })
                      // get {{elements}}
                      for (var i = 0; i < arrIndex.length; i++) {
                        if (i % 2 === 0) {
                          arrResult.push(arrIndex[i] + 1)
                        }
                      }
                      // check value elements with == vocate
                      arrResult.map(val => {
                        // case you have define vocate for customer (receiver)
                        if (foundVocate !== undefined) {
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            findVocateFriend[val] = foundVocate.name
                            return findVocateFriend
                          }
                          return
                        }
                        // case you haven't define vocate for customer (receiver)
                        if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                          if (foundFriend[0].gender === 'male_singular') {
                            findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                            return findVocateFriend
                          }
                          if (foundFriend[0].gender === 'female_singular') {
                            findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                            return findVocateFriend
                          }
                          findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                          return findVocateFriend
                        }
                      })
                      // send to customer(receiver) & save to db collection mesage
                      await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      newMessage.contents.push({
                        'typeContent': 'text',
                        'valueContent': findVocateFriend.join(''),
                        reference: 2
                      })
                      dataEmit = findVocateFriend.join('')
                      return
                    }
                    await api.sendMessage(val.valueText, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    newMessage.contents.push({
                      'typeContent': 'text',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  }
                }
              })
              await newMessage.save()
            }
            // case in syntax
            if (foundSyntax !== undefined) {
              if (foundSyntax.content.length === 1) {
                //handle is content type block  in syntax
                if (foundSyntax.content[0].typeContent === 'block') {
                  const foundBlock = await Block.findById(foundSyntax.content[0].valueContent)
                  await foundBlock.contents.map(async val => {
                    // Handle exist attribute in block
                    // if (val.typeContent === 'tag') {
                    //   const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                    //   foundAttribute._friends.push(foundFriend[0]._id)
                    //   return
                    // }
                      if (val.typeContent) {
                      if (val.typeContent === 'image') {
                        await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                          if (err) console.log(err)
                        })
                        newMessage.contents.push({
                          'typeContent': 'image',
                          'valueContent': val.valueText,
                          reference: 2
                        })
                        dataEmit = val.valueText
                      } else {
                        // Handle process vocate
                        if (val.valueText.includes('{{')) {
                          let arrIndex = []
                          let arrResult = []
                          // bundle array send
                          const findVocateFriend = (val.valueText).split(/[{}]/)
                          // take elements null
                          findVocateFriend.map((value, index, arr) => {
                            if (value === '') {
                              arrIndex.push(index)
                            }
                          })
                          // get {{elements}}
                          for (var i = 0; i < arrIndex.length; i++) {
                            if (i % 2 === 0) {
                              arrResult.push(arrIndex[i] + 1)
                            }
                          }
                          // check value elements with == vocate
                          arrResult.map(val => {
                            // case you have define vocate for customer (receiver)
                            if (foundVocate !== undefined) {
                              if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                                findVocateFriend[val] = foundVocate.name
                                return findVocateFriend
                              }
                              return
                            }
                            // case you haven't define vocate for customer (receiver)
                            if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                              if (foundFriend[0].gender === 'male_singular') {
                                findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                                return findVocateFriend
                              }
                              if (foundFriend[0].gender === 'female_singular') {
                                findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                                return findVocateFriend
                              }
                              findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                              return findVocateFriend
                            }
                          })
                          // send to customer(receiver) & save to db collection mesage
                          await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                            if (err) console.log(err)
                          })
                          newMessage.contents.push({
                            'typeContent': 'text',
                            'valueContent': findVocateFriend.join(''),
                            reference: 2
                          })
                          dataEmit = findVocateFriend.join('')
                          return
                        }
                        await api.sendMessage(val.valueText, message.senderID, async err => {
                          if (err) console.log(err)
                        })
                        newMessage.contents.push({
                          'typeContent': 'text',
                          'valueContent': val.valueText,
                          reference: 2
                        })
                        dataEmit = val.valueText
                      }
                    }
                  })
                  await newMessage.save()
                } else {
                  // Handle content is text
                  // Handle process vocate
                  if (foundSyntax.content[0].valueContent.includes('{{')) {
                    let arrIndex = []
                    let arrResult = []
                    // bundle array send
                    const findVocateFriend = (foundSyntax.content[0].valueContent).split(/[{}]/)
                    // take elements null
                    findVocateFriend.map((value, index, arr) => {
                      if (value === '') {
                        arrIndex.push(index)
                      }
                    })
                    // get {{elements}}
                    for (var i = 0; i < arrIndex.length; i++) {
                      if (i % 2 === 0) {
                        arrResult.push(arrIndex[i] + 1)
                      }
                    }
                    // check value elements with == vocate
                    arrResult.map(val => {
                      // case you have define vocate for customer (receiver)
                      if (foundVocate !== undefined) {
                        if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                          findVocateFriend[val] = foundVocate.name
                          return findVocateFriend
                        }
                        return
                      }
                      // case you haven't define vocate for customer (receiver)
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        if (foundFriend[0].gender === 'male_singular') {
                          findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                          return findVocateFriend
                        }
                        if (foundFriend[0].gender === 'female_singular') {
                          findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                          return findVocateFriend
                        }
                        findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                        return findVocateFriend
                      }
                    })
                    // send to customer(receiver) & save to db collection mesage
                    await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    newMessage.contents.push({
                      'typeContent': 'text',
                      'valueContent': findVocateFriend.join(''),
                      reference: 2
                    })
                    dataEmit = findVocateFriend.join('')
                    await newMessage.save()
                    return
                  }
                  await api.sendMessage(foundSyntax.content[0].valueContent, message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  newMessage.contents.push({
                    'typeContent': 'text',
                    'valueContent': foundSyntax.content[0].valueContent,
                    reference: 2
                  })
                  dataEmit = foundSyntax.content[0].valueContent
                  await newMessage.save()
                }
                return
              }
              const randomItem = (foundSyntax.content)[Math.floor(Math.random() * (foundSyntax.content).length)];
              if (randomItem.typeContent === 'block') {
                const foundBlock = await Block.findById(randomItem.valueContent)
                await foundBlock.contents.map(async val => {
                  // Handle exist attribute in block
                  // if (val.typeContent === '_id') {
                  //   const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                  //   foundAttribute._friends.push(foundFriend[0]._id)
                  //   return
                  // }
                  if (val.typeContent) {
                    if (val.typeContent === 'image') {
                      await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      newMessage.contents.push({
                        'typeContent': 'image',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    } else {
                      // Handle process vocate
                      if (val.valueText.includes('{{')) {
                        let arrIndex = []
                        let arrResult = []
                        // bundle array send
                        const findVocateFriend = (val.valueText).split(/[{}]/)
                        // take elements null
                        findVocateFriend.map((value, index, arr) => {
                          if (value === '') {
                            arrIndex.push(index)
                          }
                        })
                        // get {{elements}}
                        for (var i = 0; i < arrIndex.length; i++) {
                          if (i % 2 === 0) {
                            arrResult.push(arrIndex[i] + 1)
                          }
                        }
                        // check value elements with == vocate
                        arrResult.map(val => {
                          // case you have define vocate for customer (receiver)
                          if (foundVocate !== undefined) {
                            if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                              findVocateFriend[val] = foundVocate.name
                              return findVocateFriend
                            }
                            return
                          }
                          // case you haven't define vocate for customer (receiver)
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            if (foundFriend[0].gender === 'male_singular') {
                              findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                              return findVocateFriend
                            }
                            if (foundFriend[0].gender === 'female_singular') {
                              findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                              return findVocateFriend
                            }
                            findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                            return findVocateFriend
                          }
                        })
                        // send to customer(receiver) & save to db collection mesage
                        await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                          if (err) console.log(err)
                        })
                        newMessage.contents.push({
                          'typeContent': 'text',
                          'valueContent': findVocateFriend.join(''),
                          reference: 2
                        })
                        dataEmit = findVocateFriend.join('')
                        return
                      }
                      await api.sendMessage(val.valueText, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      newMessage.contents.push({
                        'typeContent': 'text',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    }
                  }
                })
                await newMessage.save()
              } else {
                // Handle process vocate
                if (randomItem.valueContent.includes('{{')) {
                  let arrIndex = []
                  let arrResult = []
                  // bundle array send
                  const findVocateFriend = (randomItem.valueContent).split(/[{}]/)
                  // take elements null
                  findVocateFriend.map((value, index, arr) => {
                    if (value === '') {
                      arrIndex.push(index)
                    }
                  })
                  // get {{elements}}
                  for (var i = 0; i < arrIndex.length; i++) {
                    if (i % 2 === 0) {
                      arrResult.push(arrIndex[i] + 1)
                    }
                  }
                  // check value elements with == vocate
                  arrResult.map(val => {
                    // case you have define vocate for customer (receiver)
                    if (foundVocate !== undefined) {
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        findVocateFriend[val] = foundVocate.name
                        return findVocateFriend
                      }
                      return
                    }
                    // case you haven't define vocate for customer (receiver)
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      if (foundFriend[0].gender === 'male_singular') {
                        findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                        return findVocateFriend
                      }
                      if (foundFriend[0].gender === 'female_singular') {
                        findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                        return findVocateFriend
                      }
                      findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                      return findVocateFriend
                    }
                  })
                  // send to customer(receiver) & save to db collection mesage
                  await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  newMessage.contents.push({
                    'typeContent': 'text',
                    'valueContent': findVocateFriend.join(''),
                    reference: 2
                  })
                  dataEmit = findVocateFriend.join('')
                  await newMessage.save()
                  return
                }
                await api.sendMessage(randomItem.valueContent, message.senderID, async err => {
                  if (err) console.log(err)
                })
                newMessage.contents.push({'typeContent': 'text', 'valueContent': randomItem.valueContent, reference: 2})
                dataEmit = randomItem.valueContent
                await newMessage.save()
              }
            }
          }
        })
      }
      //case 2: message from stranger and you accept see on facebook and able to reply
      else if (foundFriend.length === 0 && foundConverStrang.length === 1) {
        if (message.attachments.length !== 0) {
          if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
            dataEmit = message.attachments[0].url
            foundConverStrang[0].contents.push({
              'typeContent': 'image',
              'valueContent': message.attachments[0].url,
              reference: 1
            })
            await foundConverStrang[0].save()
          }
        } else {
          dataEmit = message.body
          foundConverStrang[0].contents.push({'typeContent': 'text', 'valueContent': message.body, reference: 1})
          await foundConverStrang[0].save()
          // case in script
          if (foundBlock !== undefined) {
            await foundBlock.contents.map(async val => {
              if (val.typeContent === 'image') {
                await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                  if (err) console.log(err)
                })
                foundConverStrang[0].contents.push({
                  'typeContent': 'image',
                  'valueContent': val.valueText,
                  reference: 2
                })
                dataEmit = val.valueText
              } else {
                // Handle process vocate
                if (val.valueText.includes('{{')) {
                  let arrIndex = []
                  let arrResult = []
                  // bundle array send
                  const findVocateFriend = (val.valueText).split(/[{}]/)
                  // take elements null
                  findVocateFriend.map((value, index, arr) => {
                    if (value === '') {
                      arrIndex.push(index)
                    }
                  })
                  // get {{elements}}
                  for (var i = 0; i < arrIndex.length; i++) {
                    if (i % 2 === 0) {
                      arrResult.push(arrIndex[i] + 1)
                    }
                  }
                  // check value elements with == vocate
                  arrResult.map(val => {
                    // case you have define vocate for customer (receiver)
                    if (foundVocate !== undefined) {
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        findVocateFriend[val] = foundVocate.name
                        return findVocateFriend
                      }
                      return
                    }
                    // case you haven't define vocate for customer (receiver)
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      if (foundFriend[0].gender === 'male_singular') {
                        findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                        return findVocateFriend
                      }
                      if (foundFriend[0].gender === 'female_singular') {
                        findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                        return findVocateFriend
                      }
                      findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                      return findVocateFriend
                    }
                  })
                  // send to customer(receiver) & save to db collection mesage
                  await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  foundConverStrang[0].contents.push({
                    'typeContent': 'text',
                    'valueContent': findVocateFriend.join(''),
                    reference: 2
                  })
                  dataEmit = findVocateFriend.join('')
                  return
                }
                await api.sendMessage(val.valueText, message.senderID, async err => {
                  if (err) console.log(err)
                })
                foundConverStrang[0].contents.push({'typeContent': 'text', 'valueContent': val.valueText, reference: 2})
                dataEmit = val.valueText
              }
            })
            await foundConverStrang[0].save()
          }
          // case in syntax
          if (foundSyntax !== undefined) {
            if (foundSyntax.content.length === 1) {
              //handle is content type block  in syntax
              if (foundSyntax.content[0].typeContent === 'block') {
                const foundBlock = await Block.findById(foundSyntax.content[0].valueContent)
                await foundBlock.contents.map(async val => {
                  // Handle exist attribute in block
                  // if (val.typeContent === 'tag') {
                  //   const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                  //   foundAttribute._friends.push(foundFriend[0]._id)
                  //   return
                  // }
                  if (val.typeContent) {
                    if (val.typeContent === 'image') {
                      await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      foundConverStrang[0].contents.push({
                        'typeContent': 'image',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    } else {
                      // Handle process vocate
                      if (val.valueText.includes('{{')) {
                        let arrIndex = []
                        let arrResult = []
                        // bundle array send
                        const findVocateFriend = (val.valueText).split(/[{}]/)
                        // take elements null
                        findVocateFriend.map((value, index, arr) => {
                          if (value === '') {
                            arrIndex.push(index)
                          }
                        })
                        // get {{elements}}
                        for (var i = 0; i < arrIndex.length; i++) {
                          if (i % 2 === 0) {
                            arrResult.push(arrIndex[i] + 1)
                          }
                        }
                        // check value elements with == vocate
                        arrResult.map(val => {
                          // case you have define vocate for customer (receiver)
                          if (foundVocate !== undefined) {
                            if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                              findVocateFriend[val] = foundVocate.name
                              return findVocateFriend
                            }
                            return
                          }
                          // case you haven't define vocate for customer (receiver)
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            if (foundFriend[0].gender === 'male_singular') {
                              findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                              return findVocateFriend
                            }
                            if (foundFriend[0].gender === 'female_singular') {
                              findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                              return findVocateFriend
                            }
                            findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                            return findVocateFriend
                          }
                        })
                        // send to customer(receiver) & save to db collection mesage
                        await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                          if (err) console.log(err)
                        })
                        foundConverStrang[0].contents.push({
                          'typeContent': 'text',
                          'valueContent': findVocateFriend.join(''),
                          reference: 2
                        })
                        dataEmit = findVocateFriend.join('')
                        return
                      }
                      await api.sendMessage(val.valueText, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      foundConverStrang[0].contents.push({
                        'typeContent': 'text',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    }
                  }
                })
                await foundConverStrang[0].save()
              } else {
                // Handle content is text
                // Handle process vocate
                if (foundSyntax.content[0].valueContent.includes('{{')) {
                  let arrIndex = []
                  let arrResult = []
                  // bundle array send
                  const findVocateFriend = (foundSyntax.content[0].valueContent).split(/[{}]/)
                  // take elements null
                  findVocateFriend.map((value, index, arr) => {
                    if (value === '') {
                      arrIndex.push(index)
                    }
                  })
                  // get {{elements}}
                  for (var i = 0; i < arrIndex.length; i++) {
                    if (i % 2 === 0) {
                      arrResult.push(arrIndex[i] + 1)
                    }
                  }
                  // check value elements with == vocate
                  arrResult.map(val => {
                    // case you have define vocate for customer (receiver)
                    if (foundVocate !== undefined) {
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        findVocateFriend[val] = foundVocate.name
                        return findVocateFriend
                      }
                      return
                    }
                    // case you haven't define vocate for customer (receiver)
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      if (foundFriend[0].gender === 'male_singular') {
                        findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                        return findVocateFriend
                      }
                      if (foundFriend[0].gender === 'female_singular') {
                        findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                        return findVocateFriend
                      }
                      findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                      return findVocateFriend
                    }
                  })
                  // send to customer(receiver) & save to db collection mesage
                  await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  foundConverStrang[0].contents.push({
                    'typeContent': 'text',
                    'valueContent': findVocateFriend.join(''),
                    reference: 2
                  })
                  dataEmit = findVocateFriend.join('')
                  await foundConverStrang[0].save()
                  return
                }
                await api.sendMessage(foundSyntax.content[0].valueContent, message.senderID, async err => {
                  if (err) console.log(err)
                })
                foundConverStrang[0].contents.push({
                  'typeContent': 'text',
                  'valueContent': foundSyntax.content[0].valueContent,
                  reference: 2
                })
                dataEmit = foundSyntax.content[0].valueContent
                await foundConverStrang[0].save()
              }
              return
            }
            const randomItem = (foundSyntax.content)[Math.floor(Math.random() * (foundSyntax.content).length)];
            if (randomItem.typeContent === 'block') {
              const foundBlock = await Block.findById(randomItem.valueContent)
              await foundBlock.contents.map(async val => {
                // Handle exist attribute in block
                // if (val.typeContent === 'tag') {
                //   const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                //   foundAttribute._friends.push(foundFriend[0]._id)
                //   return
                // }
                if (val.typeContent) {
                  if (val.typeContent === 'image') {
                    await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    foundConverStrang[0].contents.push({
                      'typeContent': 'image',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  } else {
                    // Handle process vocate
                    if (val.valueText.includes('{{')) {
                      let arrIndex = []
                      let arrResult = []
                      // bundle array send
                      const findVocateFriend = (val.valueText).split(/[{}]/)
                      // take elements null
                      findVocateFriend.map((value, index, arr) => {
                        if (value === '') {
                          arrIndex.push(index)
                        }
                      })
                      // get {{elements}}
                      for (var i = 0; i < arrIndex.length; i++) {
                        if (i % 2 === 0) {
                          arrResult.push(arrIndex[i] + 1)
                        }
                      }
                      // check value elements with == vocate
                      arrResult.map(val => {
                        // case you have define vocate for customer (receiver)
                        if (foundVocate !== undefined) {
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            findVocateFriend[val] = foundVocate.name
                            return findVocateFriend
                          }
                          return
                        }
                        // case you haven't define vocate for customer (receiver)
                        if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                          if (foundFriend[0].gender === 'male_singular') {
                            findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                            return findVocateFriend
                          }
                          if (foundFriend[0].gender === 'female_singular') {
                            findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                            return findVocateFriend
                          }
                          findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                          return findVocateFriend
                        }
                      })
                      // send to customer(receiver) & save to db collection mesage
                      await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      foundConverStrang[0].contents.push({
                        'typeContent': 'text',
                        'valueContent': findVocateFriend.join(''),
                        reference: 2
                      })
                      dataEmit = findVocateFriend.join('')
                      return
                    }
                    await api.sendMessage(val.valueText, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    foundConverStrang[0].contents.push({
                      'typeContent': 'text',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  }
                }
              })
              await foundConverStrang[0].save()
            } else {
              // Handle process vocate
              if (randomItem.valueContent.includes('{{')) {
                let arrIndex = []
                let arrResult = []
                // bundle array send
                const findVocateFriend = (randomItem.valueContent).split(/[{}]/)
                // take elements null
                findVocateFriend.map((value, index, arr) => {
                  if (value === '') {
                    arrIndex.push(index)
                  }
                })
                // get {{elements}}
                for (var i = 0; i < arrIndex.length; i++) {
                  if (i % 2 === 0) {
                    arrResult.push(arrIndex[i] + 1)
                  }
                }
                // check value elements with == vocate
                arrResult.map(val => {
                  // case you have define vocate for customer (receiver)
                  if (foundVocate !== undefined) {
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      findVocateFriend[val] = foundVocate.name
                      return findVocateFriend
                    }
                    return
                  }
                  // case you haven't define vocate for customer (receiver)
                  if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                    if (foundFriend[0].gender === 'male_singular') {
                      findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                      return findVocateFriend
                    }
                    if (foundFriend[0].gender === 'female_singular') {
                      findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                      return findVocateFriend
                    }
                    findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                    return findVocateFriend
                  }
                })
                // send to customer(receiver) & save to db collection mesage
                await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                  if (err) console.log(err)
                })
                foundConverStrang[0].contents.push({
                  'typeContent': 'text',
                  'valueContent': findVocateFriend.join(''),
                  reference: 2
                })
                dataEmit = findVocateFriend.join('')
                await foundConverStrang[0].save()
                return
              }
              await api.sendMessage(randomItem.valueContent, message.senderID, async err => {
                if (err) console.log(err)
              })
              foundConverStrang[0].contents.push({
                'typeContent': 'text',
                'valueContent': randomItem.valueContent,
                reference: 2
              })
              dataEmit = randomItem.valueContent
              await foundConverStrang[0].save()
            }
          }
        }
      }
      //case 3: message from friend and not able to reply
      else if (foundFriend.length === 1 && foundConversation.length === 0) {
        if (message.attachments.length !== 0) {
          if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
            dataEmit = message.attachments[0].url
            newMessage.contents.push({'typeContent': 'image', 'valueContent': message.attachments[0].url, reference: 1})
            newMessage._account = objData._account
            newMessage._sender = objData._sender
            newMessage._receiver = foundFriend[0]._id
            await newMessage.save()
          }
        } else {
          dataEmit = message.body
          newMessage.contents.push({'typeContent': 'text', 'valueContent': message.body, reference: 1})
          newMessage._account = objData._account
          newMessage._sender = objData._sender
          newMessage._receiver = foundFriend[0]._id
          await newMessage.save()
          // case in script
          if (foundBlock !== undefined) {
            await foundBlock.contents.map(async val => {
              // Handle exist attribute in block
              if (val.typeContent === 'tag') {
                const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                foundAttribute._friends.push(foundFriend[0]._id)
                await foundAttribute.save()
                return
              }
              if (val.typeContent === 'image') {
                await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                  if (err) console.log(err)
                })
                newMessage.contents.push({'typeContent': 'image', 'valueContent': val.valueText, reference: 2})
                dataEmit = val.valueText
              } else {
                // Handle process vocate
                if (val.valueText.includes('{{')) {
                  let arrIndex = []
                  let arrResult = []
                  // bundle array send
                  const findVocateFriend = (val.valueText).split(/[{}]/)
                  // take elements null
                  findVocateFriend.map((value, index, arr) => {
                    if (value === '') {
                      arrIndex.push(index)
                    }
                  })
                  // get {{elements}}
                  for (var i = 0; i < arrIndex.length; i++) {
                    if (i % 2 === 0) {
                      arrResult.push(arrIndex[i] + 1)
                    }
                  }
                  // check value elements with == vocate
                  arrResult.map(val => {
                    // case you have define vocate for customer (receiver)
                    if (foundVocate !== undefined) {
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        findVocateFriend[val] = foundVocate.name
                        return findVocateFriend
                      }
                      return
                    }
                    // case you haven't define vocate for customer (receiver)
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      if (foundFriend[0].gender === 'male_singular') {
                        findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                        return findVocateFriend
                      }
                      if (foundFriend[0].gender === 'female_singular') {
                        findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                        return findVocateFriend
                      }
                      findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                      return findVocateFriend
                    }
                  })
                  // send to customer(receiver) & save to db collection mesage
                  await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  newMessage.contents.push({
                    'typeContent': 'text',
                    'valueContent': findVocateFriend.join(''),
                    reference: 2
                  })
                  dataEmit = findVocateFriend.join('')
                  return
                }
                await api.sendMessage(val.valueText, message.senderID, async err => {
                  if (err) console.log(err)
                })
                newMessage.contents.push({'typeContent': 'text', 'valueContent': val.valueText, reference: 2})
                dataEmit = val.valueText
              }
            })
            await newMessage.save()
          }
          // case in syntax
          if (foundSyntax !== undefined) {
            if (foundSyntax.content.length === 1) {
              if (foundSyntax.content[0].typeContent === 'block') {
                const foundBlock = await Block.findById(foundSyntax.content[0].valueContent)
                await foundBlock.contents.map(async val => {
                  // Handle exist attribute in block
                  if (val.typeContent === 'tag') {
                    const foundAttribute = await Attribute.findOne({
                      '_id': val.valueText,
                      '_account': objData._account
                    })
                    foundAttribute._friends.push(foundFriend[0]._id)
                    await Attribute.save()
                    return
                  }
                  if (val.typeContent) {
                    if (val.typeContent === 'image') {
                      await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      newMessage.contents.push({
                        'typeContent': 'image',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    } else {
                      // Handle process vocate
                      if (val.valueText.includes('{{')) {
                        let arrIndex = []
                        let arrResult = []
                        // bundle array send
                        const findVocateFriend = (val.valueText).split(/[{}]/)
                        // take elements null
                        findVocateFriend.map((value, index, arr) => {
                          if (value === '') {
                            arrIndex.push(index)
                          }
                        })
                        // get {{elements}}
                        for (var i = 0; i < arrIndex.length; i++) {
                          if (i % 2 === 0) {
                            arrResult.push(arrIndex[i] + 1)
                          }
                        }
                        // check value elements with == vocate
                        arrResult.map(val => {
                          // case you have define vocate for customer (receiver)
                          if (foundVocate !== undefined) {
                            if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                              findVocateFriend[val] = foundVocate.name
                              return findVocateFriend
                            }
                            return
                          }
                          // case you haven't define vocate for customer (receiver)
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            if (foundFriend[0].gender === 'male_singular') {
                              findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                              return findVocateFriend
                            }
                            if (foundFriend[0].gender === 'female_singular') {
                              findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                              return findVocateFriend
                            }
                            findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                            return findVocateFriend
                          }
                        })
                        // send to customer(receiver) & save to db collection mesage
                        await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                          if (err) console.log(err)
                        })
                        newMessage.contents.push({
                          'typeContent': 'text',
                          'valueContent': findVocateFriend.join(''),
                          reference: 2
                        })
                        dataEmit = findVocateFriend.join('')
                        return
                      }
                      await api.sendMessage(val.valueText, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      newMessage.contents.push({
                        'typeContent': 'text',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    }
                  }
                })
                await newMessage.save()
              } else {
                // Handle content is text
                // Handle process vocate
                if (foundSyntax.content[0].valueContent.includes('{{')) {
                  let arrIndex = []
                  let arrResult = []
                  // bundle array send
                  const findVocateFriend = (foundSyntax.content[0].valueContent).split(/[{}]/)
                  // take elements null
                  findVocateFriend.map((value, index, arr) => {
                    if (value === '') {
                      arrIndex.push(index)
                    }
                  })
                  // get {{elements}}
                  for (var i = 0; i < arrIndex.length; i++) {
                    if (i % 2 === 0) {
                      arrResult.push(arrIndex[i] + 1)
                    }
                  }
                  // check value elements with == vocate
                  arrResult.map(val => {
                    // case you have define vocate for customer (receiver)
                    if (foundVocate !== undefined) {
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        findVocateFriend[val] = foundVocate.name
                        return findVocateFriend
                      }
                      return
                    }
                    // case you haven't define vocate for customer (receiver)
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      if (foundFriend[0].gender === 'male_singular') {
                        findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                        return findVocateFriend
                      }
                      if (foundFriend[0].gender === 'female_singular') {
                        findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                        return findVocateFriend
                      }
                      findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                      return findVocateFriend
                    }
                  })
                  // send to customer(receiver) & save to db collection mesage
                  await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  newMessage.contents.push({
                    'typeContent': 'text',
                    'valueContent': findVocateFriend.join(''),
                    reference: 2
                  })
                  dataEmit = findVocateFriend.join('')
                  await newMessage.save()
                  return
                }
                await api.sendMessage(foundSyntax.content[0].valueContent, message.senderID, async err => {
                  if (err) console.log(err)
                })
                newMessage.contents.push({
                  'typeContent': 'text',
                  'valueContent': foundSyntax.content[0].valueContent,
                  reference: 2
                })
                dataEmit = foundSyntax.content[0].valueContent
                await newMessage.save()
              }
              return
            }
            const randomItem = (foundSyntax.content)[Math.floor(Math.random() * (foundSyntax.content).length)];
            if (randomItem.typeContent === 'block') {
              const foundBlock = await Block.findById(randomItem.valueContent)
              await foundBlock.contents.map(async val => {
                // Handle exist attribute in block
                if (val.typeContent === 'tag') {
                  const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                  foundAttribute._friends.push(foundFriend[0]._id)
                  await Attribute.save()
                  return
                }
                if (val.typeContent) {
                  if (val.typeContent === 'image') {
                    await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    newMessage.contents.push({
                      'typeContent': 'image',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  } else {
                    // Handle process vocate
                    if (val.valueText.includes('{{')) {
                      let arrIndex = []
                      let arrResult = []
                      // bundle array send
                      const findVocateFriend = (val.valueText).split(/[{}]/)
                      // take elements null
                      findVocateFriend.map((value, index, arr) => {
                        if (value === '') {
                          arrIndex.push(index)
                        }
                      })
                      // get {{elements}}
                      for (var i = 0; i < arrIndex.length; i++) {
                        if (i % 2 === 0) {
                          arrResult.push(arrIndex[i] + 1)
                        }
                      }
                      // check value elements with == vocate
                      arrResult.map(val => {
                        // case you have define vocate for customer (receiver)
                        if (foundVocate !== undefined) {
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            findVocateFriend[val] = foundVocate.name
                            return findVocateFriend
                          }
                          return
                        }
                        // case you haven't define vocate for customer (receiver)
                        if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                          if (foundFriend[0].gender === 'male_singular') {
                            findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                            return findVocateFriend
                          }
                          if (foundFriend[0].gender === 'female_singular') {
                            findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                            return findVocateFriend
                          }
                          findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                          return findVocateFriend
                        }
                      })
                      // send to customer(receiver) & save to db collection mesage
                      await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      newMessage.contents.push({
                        'typeContent': 'text',
                        'valueContent': findVocateFriend.join(''),
                        reference: 2
                      })
                      dataEmit = findVocateFriend.join('')
                      return
                    }
                    await api.sendMessage(val.valueText, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    newMessage.contents.push({
                      'typeContent': 'text',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  }
                }
              })
              await newMessage.save()
            } else {
              // Handle process vocate
              if (randomItem.valueContent.includes('{{')) {
                let arrIndex = []
                let arrResult = []
                // bundle array send
                const findVocateFriend = (randomItem.valueContent).split(/[{}]/)
                // take elements null
                findVocateFriend.map((value, index, arr) => {
                  if (value === '') {
                    arrIndex.push(index)
                  }
                })
                // get {{elements}}
                for (var i = 0; i < arrIndex.length; i++) {
                  if (i % 2 === 0) {
                    arrResult.push(arrIndex[i] + 1)
                  }
                }
                // check value elements with == vocate
                arrResult.map(val => {
                  // case you have define vocate for customer (receiver)
                  if (foundVocate !== undefined) {
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      findVocateFriend[val] = foundVocate.name
                      return findVocateFriend
                    }
                    return
                  }
                  // case you haven't define vocate for customer (receiver)
                  if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                    if (foundFriend[0].gender === 'male_singular') {
                      findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                      return findVocateFriend
                    }
                    if (foundFriend[0].gender === 'female_singular') {
                      findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                      return findVocateFriend
                    }
                    findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                    return findVocateFriend
                  }
                })
                // send to customer(receiver) & save to db collection mesage
                await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                  if (err) console.log(err)
                })
                newMessage.contents.push({
                  'typeContent': 'text',
                  'valueContent': findVocateFriend.join(''),
                  reference: 2
                })
                dataEmit = findVocateFriend.join('')
                await newMessage.save()
                return
              }
              await api.sendMessage(randomItem.valueContent, message.senderID, async err => {
                if (err) console.log(err)
              })
              newMessage.contents.push({'typeContent': 'text', 'valueContent': randomItem.valueContent, reference: 2})
              dataEmit = randomItem.valueContent
              await newMessage.save()
            }
          }
        }
      }
      //case 4: message from friend and able to reply
      else if (foundFriend.length === 1 && foundConversation.length === 1) {
        if (message.attachments.length !== 0) {
          if (message.attachments[0].type === 'sticker' || message.attachments[0].type === 'photo') {
            dataEmit = message.attachments[0].url
            foundConversation[0].contents.push({
              'typeContent': 'image',
              'valueContent': message.attachments[0].url,
              reference: 1
            })
            await foundConversation[0].save()
          }
        } else {
          dataEmit = message.body
          foundConversation[0].contents.push({'typeContent': 'text', 'valueContent': message.body, reference: 1})
          await foundConversation[0].save()
          // case in script
          if (foundBlock !== undefined) {
            await foundBlock.contents.map(async val => {
              // Handle exist attribute in block
              if (val.typeContent === 'tag') {
                const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                foundAttribute._friends.push(foundFriend[0]._id)
                await foundAttribute.save()
                return
              }
              if (val.typeContent) {
                if (val.typeContent === 'image') {
                  await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  foundConversation[0].contents.push({
                    'typeContent': 'image',
                    'valueContent': val.valueText,
                    reference: 2
                  })
                  dataEmit = val.valueText
                } else {
                  // Handle process vocate
                  if (val.valueText.includes('{{')) {
                    let arrIndex = []
                    let arrResult = []
                    // bundle array send
                    const findVocateFriend = (val.valueText).split(/[{}]/)
                    // take elements null
                    findVocateFriend.map((value, index, arr) => {
                      if (value === '') {
                        arrIndex.push(index)
                      }
                    })
                    // get {{elements}}
                    for (var i = 0; i < arrIndex.length; i++) {
                      if (i % 2 === 0) {
                        arrResult.push(arrIndex[i] + 1)
                      }
                    }
                    // check value elements with == vocate
                    arrResult.map(val => {
                      // case you have define vocate for customer (receiver)
                      if (foundVocate !== undefined) {
                        if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                          findVocateFriend[val] = foundVocate.name
                          return findVocateFriend
                        }
                        return
                      }
                      // case you haven't define vocate for customer (receiver)
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        if (foundFriend[0].gender === 'male_singular') {
                          findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                          return findVocateFriend
                        }
                        if (foundFriend[0].gender === 'female_singular') {
                          findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                          return findVocateFriend
                        }
                        findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                        return findVocateFriend
                      }
                    })
                    // send to customer(receiver) & save to db collection mesage
                    await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    foundConversation[0].contents.push({
                      'typeContent': 'text',
                      'valueContent': findVocateFriend.join(''),
                      reference: 2
                    })
                    dataEmit = findVocateFriend.join('')
                    return
                  }
                  await api.sendMessage(val.valueText, message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  foundConversation[0].contents.push({
                    'typeContent': 'text',
                    'valueContent': val.valueText,
                    reference: 2
                  })
                  dataEmit = val.valueText
                }
              }
            })
            await foundConversation[0].save()
          }
          // case in syntax
          if (foundSyntax !== undefined) {
            // case syntax has one content
            if (foundSyntax.content.length === 1) {
              //handle is content type block  in syntax
              if (foundSyntax.content[0].typeContent === 'block') {
                const foundBlock = await Block.findById(foundSyntax.content[0].valueContent)
                await foundBlock.contents.map(async val => {
                  // Handle exist attribute in block
                  if (val.typeContent === 'tag') {
                    const foundAttribute = await Attribute.findOne({
                      '_id': val.valueText,
                      '_account': objData._account
                    })
                    foundAttribute._friends.push(foundFriend[0]._id)
                    await Attribute.save()
                    return
                  }
                  if (val.typeContent) {
                    if (val.typeContent === 'image') {
                      await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      foundConversation[0].contents.push({
                        'typeContent': 'image',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    } else {
                      // Handle process vocate
                      if (val.valueText.includes('{{')) {
                        let arrIndex = []
                        let arrResult = []
                        // bundle array send
                        const findVocateFriend = (val.valueText).split(/[{}]/)
                        // take elements null
                        findVocateFriend.map((value, index, arr) => {
                          if (value === '') {
                            arrIndex.push(index)
                          }
                        })
                        // get {{elements}}
                        for (var i = 0; i < arrIndex.length; i++) {
                          if (i % 2 === 0) {
                            arrResult.push(arrIndex[i] + 1)
                          }
                        }
                        // check value elements with == vocate
                        arrResult.map(val => {
                          // case you have define vocate for customer (receiver)
                          if (foundVocate !== undefined) {
                            if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                              findVocateFriend[val] = foundVocate.name
                              return findVocateFriend
                            }
                            return
                          }
                          // case you haven't define vocate for customer (receiver)
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            if (foundFriend[0].gender === 'male_singular') {
                              findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                              return findVocateFriend
                            }
                            if (foundFriend[0].gender === 'female_singular') {
                              findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                              return findVocateFriend
                            }
                            findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                            return findVocateFriend
                          }
                        })
                        // send to customer(receiver) & save to db collection mesage
                        await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                          if (err) console.log(err)
                        })
                        foundConversation[0].contents.push({
                          'typeContent': 'text',
                          'valueContent': findVocateFriend.join(''),
                          reference: 2
                        })
                        dataEmit = findVocateFriend.join('')
                        return
                      }
                      await api.sendMessage(val.valueText, message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      foundConversation[0].contents.push({
                        'typeContent': 'text',
                        'valueContent': val.valueText,
                        reference: 2
                      })
                      dataEmit = val.valueText
                    }
                  }
                })
                await foundConversation[0].save()
              } else {
                // Handle content is text
                // Handle process vocate
                if (foundSyntax.content[0].valueContent.includes('{{')) {
                  let arrIndex = []
                  let arrResult = []
                  // bundle array send
                  const findVocateFriend = (foundSyntax.content[0].valueContent).split(/[{}]/)
                  // take elements null
                  findVocateFriend.map((value, index, arr) => {
                    if (value === '') {
                      arrIndex.push(index)
                    }
                  })
                  // get {{elements}}
                  for (var i = 0; i < arrIndex.length; i++) {
                    if (i % 2 === 0) {
                      arrResult.push(arrIndex[i] + 1)
                    }
                  }
                  // check value elements with == vocate
                  arrResult.map(val => {
                    // case you have define vocate for customer (receiver)
                    if (foundVocate !== undefined) {
                      if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                        findVocateFriend[val] = foundVocate.name
                        return findVocateFriend
                      }
                      return
                    }
                    // case you haven't define vocate for customer (receiver)
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      if (foundFriend[0].gender === 'male_singular') {
                        findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                        return findVocateFriend
                      }
                      if (foundFriend[0].gender === 'female_singular') {
                        findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                        return findVocateFriend
                      }
                      findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                      return findVocateFriend
                    }
                  })
                  // send to customer(receiver) & save to db collection mesage
                  await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                    if (err) console.log(err)
                  })
                  foundConversation[0].contents.push({
                    'typeContent': 'text',
                    'valueContent': findVocateFriend.join(''),
                    reference: 2
                  })
                  dataEmit = findVocateFriend.join('')
                  await foundConversation[0].save()
                  return
                }
                await api.sendMessage(foundSyntax.content[0].valueContent, message.senderID, async err => {
                  if (err) console.log(err)
                })
                foundConversation[0].contents.push({
                  'typeContent': 'text',
                  'valueContent': foundSyntax.content[0].valueContent,
                  reference: 2
                })
                dataEmit = foundSyntax.content[0].valueContent
                await foundConversation[0].save()
              }
              return
            }
            const randomItem = (foundSyntax.content)[Math.floor(Math.random() * (foundSyntax.content).length)];
            if (randomItem.typeContent === 'block') {
              const foundBlock = await Block.findById(randomItem.valueContent)
              await foundBlock.contents.map(async val => {
                // Handle exist attribute in block
                if (val.typeContent === 'tag') {
                  const foundAttribute = await Attribute.findOne({'_id': val.valueText, '_account': objData._account})
                  foundAttribute._friends.push(foundFriend[0]._id)
                  await Attribute.save()
                  return
                }
                if (val.typeContent) {
                  if (val.typeContent === 'image') {
                    await api.sendMessage({attachment: fs.createReadStream(__dirname.replace('\\src\\controllers', '') + (val.valueText.replace(config.URL, '')))}, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    foundConversation[0].contents.push({
                      'typeContent': 'image',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  } else {
                    // Handle process vocate
                    if (val.valueText.includes('{{')) {
                      let arrIndex = []
                      let arrResult = []
                      // bundle array send
                      const findVocateFriend = (val.valueText).split(/[{}]/)
                      // take elements null
                      findVocateFriend.map((value, index, arr) => {
                        if (value === '') {
                          arrIndex.push(index)
                        }
                      })
                      // get {{elements}}
                      for (var i = 0; i < arrIndex.length; i++) {
                        if (i % 2 === 0) {
                          arrResult.push(arrIndex[i] + 1)
                        }
                      }
                      // check value elements with == vocate
                      arrResult.map(val => {
                        // case you have define vocate for customer (receiver)
                        if (foundVocate !== undefined) {
                          if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                            findVocateFriend[val] = foundVocate.name
                            return findVocateFriend
                          }
                          return
                        }
                        // case you haven't define vocate for customer (receiver)
                        if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                          if (foundFriend[0].gender === 'male_singular') {
                            findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                            return findVocateFriend
                          }
                          if (foundFriend[0].gender === 'female_singular') {
                            findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                            return findVocateFriend
                          }
                          findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                          return findVocateFriend
                        }
                      })
                      // send to customer(receiver) & save to db collection mesage
                      await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                        if (err) console.log(err)
                      })
                      foundConversation[0].contents.push({
                        'typeContent': 'text',
                        'valueContent': findVocateFriend.join(''),
                        reference: 2
                      })
                      dataEmit = findVocateFriend.join('')
                      return
                    }
                    await api.sendMessage(val.valueText, message.senderID, async err => {
                      if (err) console.log(err)
                    })
                    foundConversation[0].contents.push({
                      'typeContent': 'text',
                      'valueContent': val.valueText,
                      reference: 2
                    })
                    dataEmit = val.valueText
                  }
                }
              })
              await foundConversation[0].save()
            } else {
              // Handle process vocate
              if (randomItem.valueContent.includes('{{')) {
                let arrIndex = []
                let arrResult = []
                // bundle array send
                const findVocateFriend = (randomItem.valueContent).split(/[{}]/)
                // take elements null
                findVocateFriend.map((value, index, arr) => {
                  if (value === '') {
                    arrIndex.push(index)
                  }
                })
                // get {{elements}}
                for (var i = 0; i < arrIndex.length; i++) {
                  if (i % 2 === 0) {
                    arrResult.push(arrIndex[i] + 1)
                  }
                }
                // check value elements with == vocate
                arrResult.map(val => {
                  // case you have define vocate for customer (receiver)
                  if (foundVocate !== undefined) {
                    if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                      findVocateFriend[val] = foundVocate.name
                      return findVocateFriend
                    }
                    return
                  }
                  // case you haven't define vocate for customer (receiver)
                  if (ConvertUnicode(findVocateFriend[val].trim().toLowerCase()).toString() === ConvertUnicode(Dictionaries.VOCATE.toLowerCase()).toString()) {
                    if (foundFriend[0].gender === 'male_singular') {
                      findVocateFriend[val] = Dictionaries.MALE.toLowerCase()
                      return findVocateFriend
                    }
                    if (foundFriend[0].gender === 'female_singular') {
                      findVocateFriend[val] = Dictionaries.FEMALE.toLowerCase()
                      return findVocateFriend
                    }
                    findVocateFriend[val] = Dictionaries.VOCATEDEFAULT.toLowerCase()
                    return findVocateFriend
                  }
                })
                await api.sendMessage(findVocateFriend.join(''), message.senderID, async err => {
                  if (err) console.log(err)
                })
                foundConversation[0].contents.push({
                  'typeContent': 'text',
                  'valueContent': findVocateFriend.join(''),
                  reference: 2
                })
                dataEmit = findVocateFriend.join('')
                await foundConversation[0].save()
                return
              }
              await api.sendMessage(randomItem.valueContent, message.senderID, async err => {
                if (err) console.log(err)
              })
              foundConversation[0].contents.push({
                'typeContent': 'text',
                'valueContent': randomItem.valueContent,
                reference: 2
              })
              dataEmit = randomItem.valueContent
              await foundConversation[0].save()
            }
          }
        }
      }
    })

    // cron message with sequence & broadcast
    const foundSequence = await Sequence.find({'_account': objData._account})
    foundSequence.map(async sequence => {
      sequence.sequences.map(async item => {
        const foundBlock = await Block.findById(item._block)
        console.log(foundBlock)
        switch (ConvertUnicode(item.time.descTime.trim().toLowerCase()).toString()) {
          case 'gui ngay':
            break
          case 'giay':
            break
          case 'phut':
            break
          case 'gio':
            break
          case 'ngay':
            break
          case 'tat':
            break
        }
      })
    })
  },

  /**
   * Delete conversation
   * @param: req
   * @param: res
   */
  delete: async (req, res) => {
    const userId = Secure(res, req.headers.authorization)
    const accountResult = await Account.findById(userId)
    if (!accountResult) return res.status(403).json(JsonResponse("Người dùng không tồn tại!", null))
    await Message.findByIdAndRemove(req.query._threadId)
    res.status(200).json(JsonResponse('Xóa cuộc hội thoại thành công!', null))
  },
}