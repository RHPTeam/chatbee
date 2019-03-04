const SendTimer = require('../models/SendTimer.model')
const CronJob = require('cron').CronJob;
module.exports = {
  /**
   * 
   */
  create: (req, res, next) => {
    const {
      body
    } = req;
    const sendTimer = new SendTimer(body);

    sendTimer._tagIdList.push(body.userId);
    // console.log(body);
    // type 1: giay, 2: phut, 3: gio
    switch (body.type) {
      case 1:
        sendTimer.timerDelay.valueTimer = body.value;
        break;
      case 2:
        sendTimer.timerDelay.valueTimer = body.value * 60;
        break;
      case 3:
        sendTimer.timerDelay.valueTimer = body.value * 60 * 60;
        break;
      default:
        sendTimer.timerDelay.valueTimer = body.value;
        return
    }
    sendTimer.timerDelay.typeTimer = body.type;
    sendTimer.save();

    //set time cronjob
    const job = new CronJob('* * * * * *', async function () {
      console.log('Every second:');
    }, null, true, 'Asia/Ho_Chi_Minh');
    job.start();
    res.send('ss')
  },

  /**
   * 
   */
  index: async (req, res, next) => {
    const data = await SendTimer.find({});
    res.send(data)
  }
}