module.exports = {
  getUserInfoById: (api, userId) => {
    api.getUserInfo(userId, async (err, ret) => {
      await ret[userId]
    })
  }
}