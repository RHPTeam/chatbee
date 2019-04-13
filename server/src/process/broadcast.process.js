const MessageProcess = require('./message.process')
const CronJob = require('cron').CronJob

const Friend = require('../models/Friends.model')
let job = null

module.exports = {
  /**
   * Handle Auto Send Message Schedule Broadcast
   * @param dataItem
   * @param account
   * @param api
   * @returns {Promise<*>}
   */
  handleMessageScheduleBroadcast: async (dataItem, account, api) => {
    return new Promise(async (resolve, reject) => {
      let result = null
      let message = null
      if (dataItem.status === true) {
        // data hour date month respond
        let dataRes = {
          second: 0,
          minute: parseFloat(dataItem.timeSetting.hour.split(':')[1]),
          hour: parseFloat(dataItem.timeSetting.hour.split(':')[0]),
          date: parseFloat(dataItem.timeSetting.dateMonth.split('-')[2]),
          month: parseFloat(dataItem.timeSetting.dateMonth.split('-')[1]) - 1,
          day: dataItem.timeSetting.repeat.valueRepeat
        }
        switch (dataItem.timeSetting.repeat.typeRepeat) {
          case "Không":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} ${dataRes.date} ${dataRes.month} *`, function () {
                dataItem._friends.forEach(async friend => {
                  const foundFriend = await Friend.findById(friend)

                  dataItem.content.forEach(async val => {
                    message = {
                      senderID: foundFriend.userID
                    }
                    // using again  function handle message sequence in block to send message broadcast
                    result = await MessageProcess.handMessageInBlock(message, val, account, api)
                    resolve (result)
                  })
                })
              },
              true, /* Start the job right now */
              'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Hằng ngày":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * *`, function () {
                dataItem._friends.forEach(async friend => {
                  const foundFriend = await Friend.findById(friend)
                  dataItem.content.forEach(async val => {
                    message = {
                      senderID: foundFriend.userID
                    }
                    // using again  function handle message sequence in block to send message broadcast
                    result = await  MessageProcess.handMessageInBlock(message,val, account, api)
                    resolve (result)
                  })
                })
              },
              true, /* Start the job right now */
              'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Cuối tuần":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * 0,6`, function () {
                dataItem._friends.forEach(async friend => {
                  const foundFriend = await Friend.findById(friend)
                  dataItem.content.forEach(async val => {
                    message = {
                      senderID: foundFriend.userID
                    }
                    // using again  function handle message sequence in block to send message broadcast
                    result = await  MessageProcess.handMessageInBlock(message,val, account, api)
                    resolve (result)
                  })
                })
              },
              true, /* Start the job right now */
              'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Hằng tháng":
            job  = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} ${dataRes.date} * *`, function () {
                dataItem._friends.forEach(async friend => {
                  const foundFriend = await Friend.findById(friend)
                  dataItem.content.forEach(async val => {
                    message = {
                      senderID: foundFriend.userID
                    }
                    // using again  function handle message sequence in block to send message broadcast
                    result = await  MessageProcess.handMessageInBlock(message,val, account, api)
                    resolve (result)
                  })
                })
              },
              true, /* Start the job right now */
              'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Ngày làm việc":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * 1,2,3,4,5`, function () {
                dataItem._friends.forEach(async friend => {
                  const foundFriend = await Friend.findById(friend)
                  dataItem.content.forEach(async val => {
                    message = {
                      senderID: foundFriend.userID
                    }
                    // using again  function handle message sequence in block to send message broadcast
                    result = await  MessageProcess.handMessageInBlock(message,val, account, api)
                    resolve (result)
                  })
                })
              },
              true, /* Start the job right now */
              'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Tùy chỉnh":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * ${dataRes.day}`, function () {
                dataItem._friends.forEach(async friend => {
                  const foundFriend = await Friend.findById(friend)
                  dataItem.content.forEach(async val => {
                    message = {
                      senderID: foundFriend.userID
                    }
                    // using again  function handle message sequence in block to send message broadcast
                    result = await  MessageProcess.handMessageInBlock(message,val, account, api)
                    resolve (result)
                  })
                })
              },
              true, /* Start the job right now */
              'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
        }
      }
      resolve(dataItem)
    })
  },
  handleStopMessageScheduleBroadcast: async (dataItem, account, api) => {
    return new Promise(async (resolve, reject) => {
      job.stop()
      resolve(dataItem)
    })
  }
}