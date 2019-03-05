const SendTimer = require('../models/SendTimer.model')
var schedule = require('node-schedule')
const moment = require('moment')

const setupCron = (api, data) => {
  const year = moment(data.timerStart).format('YYYY')
  const month =
    moment(data.timerStart).format('M') === 1
      ? moment(data.timerStart).format('M')
      : moment(data.timerStart).format('M') - 1
  const day = moment(data.timerStart).format('D')
  const hour = moment(data.timerStart).hour()
  const minute = moment(data.timerStart).minute()
  const dayOfWeek =
    moment(data.timerStart).weekday() === 1
      ? moment(data.timerStart).weekday()
      : moment(data.timerStart).weekday() - 1
  const date = new Date(year, month, day, hour, minute, dayOfWeek)
  console.log(api)
  schedule.scheduleJob(date, function (y) {
    // phan xu ly
    api.sendMessage(data.content, data.userId, err => {
      if (err) return console.error(err)
    })
  })
}

module.exports = {
  /**
   *
   */
  create: async (api, req, res, next) => {
    const { body } = req
    const sendTimer = new SendTimer(body)

    sendTimer._tagIdList.push(body.userId)
    // type 1: giay, 2: phut, 3: gio
    switch (body.type) {
      case 1:
        sendTimer.timerDelay.valueTimer = body.value
        break
      case 2:
        sendTimer.timerDelay.valueTimer = body.value * 60
        break
      case 3:
        sendTimer.timerDelay.valueTimer = body.value * 60 * 60
        break
      default:
        sendTimer.timerDelay.valueTimer = body.value
        return
    }
    sendTimer.timerDelay.typeTimer = body.type
    sendTimer.save()
    console.log('api', api)
    // setupCron(body.timerStart)
    setupCron(api, body)
    res.send('ss')
  },

  /**
   *
   */
  index: async (req, res, next) => {
    const data = await SendTimer.find({})
    res.send(data)
  }
}
