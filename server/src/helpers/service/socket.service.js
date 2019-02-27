const { getUserInfoById } = require('./chatFacebookApi.service')
module.exports = {
  sendMessage: async (api, data) => {
    const userInfo = getUserInfoById(api, data.sender.id)
    console.log(userInfo)
  }
}