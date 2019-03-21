const SendTimer = require('../models/SendTimer.model')
const schedule = require('node-schedule')

const moment = require('moment')

const JsonResponse = require('../configs/res')


let nameJob = "";

const compareDate = ( dateNew ) => {
  if(moment(dateNew) < moment()) {
    return
  }
  return true
}

const randomString = () => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

const setupCron = async (api, data) => {
  // if(!api || api === null || api === "") return 
  const year = moment(data.timerStart).format("YYYY");
  const month = moment(data.timerStart).format("M") === 1 ? moment(data.timerStart).format("M") : moment(data.timerStart).format("M") - 1;
  const day = moment(data.timerStart).format("D");
  const hour = moment(data.timerStart).hour();
  const minute = moment(data.timerStart).minute();
  const dayOfWeek = moment(data.timerStart).weekday() === 1 ? moment(data.timerStart).weekday() : moment(data.timerStart).weekday() - 1
  const date = new Date(year, month, day, hour, minute, dayOfWeek);
  nameJob = 'send-timer-' + randomString()

  schedule.scheduleJob(nameJob, date, () => {
    //phan xu ly
    api.sendMessage(data.content, data.userId, err => {
      if (err) return console.error(err)
    })
  })
}

const convertTimer = (type, value) => {
  // type 1: giay, 2: phut, 3: gio
  switch (type) {
    case 1:
      return value
    case 2:
      return value * 60;
    case 3:
      return value * 60 * 60
    default:
      return value;
  }
}

module.exports = {
  /**
   *
   */
  create: async (api, req, res, next) => {

    const {
      body
    } = req;
    if (!compareDate(body.timerStart))
      return res.status(403).json(JsonResponse('Time start less date time!', null))

    const sendTimer = await new SendTimer(body);
    sendTimer._tagIdList.push(body.userId);
    sendTimer.timerDelay.valueTimer = convertTimer(body.type, body.value)
    sendTimer.timerDelay.typeTimer = body.type;
    sendTimer.save();
    setupCron(api, body)
    res.status(201).json(JsonResponse('Create send timer successfully!', sendTimer))

  },

  /**
   *
   */
  index: async (req, res, next) => {
    const data = await SendTimer.find({})
    res.send(data)
  },

  /**
   * 
   */
  update: async (req, res, next) => {
    // const sendTimerId = req.params;
    const {
      body,
      query: {
        _id
      },
    } = req;
    const sendTimer = await SendTimer.findById({
      _id
    });
    if (!compareDate(sendTimer.timerStart))
      return res.status(403).json(JsonResponse('Time start less date time!', null))

    if (!sendTimer) return res.status(403).json(JsonResponse('Send timer is not found!', null))
    const updateSendTimer = await SendTimer.findByIdAndUpdate({
      _id
    }, {
      body
    });
    updateSendTimer._tagIdList.length = 0;
    updateSendTimer._tagIdList.push(body.userId);
    updateSendTimer.timerDelay.valueTimer = convertTimer(body.type, body.value)
    updateSendTimer.timerDelay.typeTimer = body.type;
    await updateSendTimer.save();
    schedule.cancelJob(nameJob);
    // setupCron(api, body)
    res.status(201).json(JsonResponse('Update item content send timer successfully!', updateSendTimer))
  }
}
