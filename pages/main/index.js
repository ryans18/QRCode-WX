// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    hideBtnLogin: true,
    qrMsg: ''
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
      success: (res) => {
        console.log(res.result)
        this.setData({
          qrMsg: res.result,
          hideBtnLogin: false
        })
      }
    })
  },
  sendQRCodeMsg() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        const token = res.data
        const array = this.data.qrMsg.split('QR:')
        if (array.length > 1 && array[1] !== '') {
          wx.request({
            url: app.globalData.host + '/api/qr?msg=' + array[1],
            method: 'GET',
            header: {
              'Authorization': 'Bearer ' + token
            },
            success: (res) => {
              if(res.statusCode === 200 || res.statusCode === 201) {
      
              }
            }
          })
        }
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