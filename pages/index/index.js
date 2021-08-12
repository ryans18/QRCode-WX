// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    password: '',
    disable: true
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    console.log(wx.getAccountInfoSync().miniProgram.envVersion)
    wx.showToast({
      title: wx.getAccountInfoSync().miniProgram.envVersion,
      icon: 'success',
      duration: 2000
    })
    wx.getStorage({
      key: 'token',
      success: (res) => {
        if (res.data !== '') {
          wx.navigateTo({
            url: '/pages/main/index',
          })
        }
      }
    })
  },
  bindUsername(e) {
    this.setData({
      username: e.detail.value
    })
    this.vaildUser()
  },
  bindPassword(e) {
    this.setData({
      password: e.detail.value
    })
    this.vaildUser()
  },
  vaildUser() {
    if (this.data.username !== '' && this.data.password !== '') {
      this.setData({
        disable: false
      })
    }
  },
  login() {
    console.log('username: ' , this.data.username)
    console.log('password: ' , this.data.password)
    console.log('host: ', app.globalData.host)
    wx.request({
      url: app.globalData.host + '/api/authenticate', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        wx.setStorage({
          key: "token",
          data: res.data.id_token
        })
        wx.navigateTo({url: '/pages/main/index'})
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
