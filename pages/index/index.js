//index.js

const {
  formatDate
} = require("../../utils/util");
//获取应用实例
const app = getApp()

Page({


  onInput: function (event) {
    this.setData({
      currentDate: event.detail,
    });
  },



  //跳到用户界面
  toUser: function () {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },


  data: {
    user: {
      "openId": wx.getStorageSync('openid'),
      "username": "xxxxx",
      "phone": "1111",
      "operationDate": new Date(),
    },
    hasUserInfo: false,
    show: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    operationDate: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tapName: function (event) {
    this.setData({
      show: true
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  submit() {
    //提交数据到后台进行注册
    wx.request({
      url: 'https://akso.design/akso/akso/api/user/register',
      data: this.data.user,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //跳转到固定的调查问卷中,id=1
        wx.navigateTo({
          url: '/pages/question/question?id=1',
        })
      }
    })



  },

  onInput(event) {
    var da = formatDate(new Date(event.detail));
    console.log(da);
    this.setData({
      'user.operationDate': da
    });
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})