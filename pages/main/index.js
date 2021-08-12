// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    hideBtnLogin: true
  },
  onLoad() {
    this.getUser()
  },
  getUser() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        const token = res.data
        wx.request({
          url:  getApp().globalData.host + '/api/user',
          method: 'GET',
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': 'Bearer ' + token
          },
          success: (res) =>{
            console.log(res.data)
            this.setData({
              username: res.data.username
            })
          }
        })
      }
    })
  },
  scan() {
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })
  },
  logout() {
    wx.removeStorage({
      key: 'token',
    })
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})