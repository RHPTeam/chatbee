const MessageProcess = require('./message.process')
const CronJob = require('cron').CronJob
const GLOBAL = require( "../helpers/database/variables.global" )

const Friend = require('../models/Friends.model')
let job = null

// Setup wait time delay
const waitTime = time => {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(true);
    }, time);
  });
};

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
        let date = new Date(dataItem.timeSetting.dateMonth)
        let dataRes = {
          second: 0,
          minute: parseFloat(dataItem.timeSetting.hour.split(':')[1]),
          hour: parseFloat(dataItem.timeSetting.hour.split(':')[0]),
          date: date.getDate(),
          month: date.getMonth()
        }
        switch (dataItem.timeSetting.repeat.typeRepeat) {
          case "Không":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} ${dataRes.date} ${dataRes.month} *`, async function () {
              for ( let d =0 ; d <  dataItem._friends.length; d ++ ) {
                const foundFriend = await Friend.findById(dataItem._friends[d])
                for (let i = 0; i< dataItem.content.length;i++){
                  message = {
                    senderID: foundFriend.userID
                  }
                  // using again  function handle message sequence in block to send message broadcast
                  result = await MessageProcess.handMessageInBlock(message, dataItem.content[i], account, api)
                  resolve (result)
                }
                await waitTime(Math.floor(Math.random()*16+30)*1000) // random from 30-45 second for per send message
              }
            },
            true, /* Start the job right now */
            'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Hằng ngày":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * *`, async function () {
              for ( let d =0 ; d <  dataItem._friends.length; d ++ ) {
                const foundFriend = await Friend.findById(dataItem._friends[d])
                for (let i = 0; i< dataItem.content.length;i++){
                  message = {
                    senderID: foundFriend.userID
                  }
                  // using again  function handle message sequence in block to send message broadcast
                  result = await MessageProcess.handMessageInBlock(message, dataItem.content[i], account, api)
                  resolve (result)
                }
                await waitTime(Math.floor(Math.random()*16+30)*1000) // random from 30-45 second for per send message
              }
            },
            true, /* Start the job right now */
            'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Cuối tuần":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * 0,6`, async function () {
              for ( let d =0 ; d <  dataItem._friends.length; d ++ ) {
                const foundFriend = await Friend.findById(dataItem._friends[d])
                for (let i = 0; i< dataItem.content.length;i++){
                  message = {
                    senderID: foundFriend.userID
                  }
                  // using again  function handle message sequence in block to send message broadcast
                  result = await MessageProcess.handMessageInBlock(message, dataItem.content[i], account, api)
                  resolve (result)
                }
                await waitTime(Math.floor(Math.random()*16+30)*1000) // random from 30-45 second for per send message
              }
            },
            true, /* Start the job right now */
            'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Hằng tháng":
            job  = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} ${dataRes.date} * *`, async function () {
              for ( let d =0 ; d <  dataItem._friends.length; d ++ ) {
                const foundFriend = await Friend.findById(dataItem._friends[d])
                for (let i = 0; i< dataItem.content.length;i++){
                  message = {
                    senderID: foundFriend.userID
                  }
                  // using again  function handle message sequence in block to send message broadcast
                  result = await MessageProcess.handMessageInBlock(message, dataItem.content[i], account, api)
                  resolve (result)
                }
                await waitTime(Math.floor(Math.random()*16+30)*1000) // random from 30-45 second for per send message
              }
            },
            true, /* Start the job right now */
            'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Ngày làm việc":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * 1,2,3,4,5`, async function () {
              for ( let d =0 ; d <  dataItem._friends.length; d ++ ) {
                const foundFriend = await Friend.findById(dataItem._friends[d])
                for (let i = 0; i< dataItem.content.length;i++){
                  message = {
                    senderID: foundFriend.userID
                  }
                  // using again  function handle message sequence in block to send message broadcast
                  result = await MessageProcess.handMessageInBlock(message, dataItem.content[i], account, api)
                  resolve (result)
                }
                await waitTime(Math.floor(Math.random()*16+30)*1000) // random from 30-45 second for per send message
              }
            },
            true, /* Start the job right now */
            'Asia/Ho_Chi_Minh' /* Time zone of this job. */
            )
            break
          case "Tùy chỉnh":
            job = new CronJob(`${dataRes.second} ${dataRes.minute} ${dataRes.hour} * * ${dataRes.day}`, async function () {
              for ( let d =0 ; d <  dataItem._friends.length; d ++ ) {
                const foundFriend = await Friend.findById(dataItem._friends[d])
                for (let i = 0; i< dataItem.content.length;i++){
                  message = {
                    senderID: foundFriend.userID
                  }
                  // using again  function handle message sequence in block to send message broadcast
                  result = await MessageProcess.handMessageInBlock(message, dataItem.content[i], account, api)
                  resolve (result)
                }
                await waitTime(Math.floor(Math.random()*16+30)*1000) // random from 30-45 second for per send message
              }
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
