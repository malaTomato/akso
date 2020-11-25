//index.js

const {
  formatDate
} = require("../../utils/util");
//获取应用实例
const app = getApp()

Page({



  data: {
    hideLogin: true,

    haveInfo: true,
    user: {
      "openId": wx.getStorageSync('openid'),
      "username": "",
      "phone": "",
      "operationDate": new Date(),
      "nickname": ""
    },
    hasUserInfo: false,
    show: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    operationDate: '',
  },


  login() {
    var that = this;
    console.log("开始登陆login")
    var loginUrl = app.globalData.baseUrl + "/api/user/getAuthUser";
    // 登录
    wx.login({
     
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        wx.request({
          url: loginUrl,
          data: {
            code: res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.registerFlag) {
              console.log("未注册过的用户")
              that.setData({
                hideLogin:false
              })
              
            } else {
              wx.navigateTo({
                url: '/pages/user/user',
              })

            }
            wx.setStorageSync('openid', res.data.openid);
          },
          fail(res){
            console.log("请求失败")
            that.setData({
              hideLogin:false
            })
          }

        })
      }
    })
  },

  bindGetUserInfo(e) {
    //用户点击允许授权
    if (e.detail.userInfo) {
      this.setData({
        haveInfo: false
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                //业务代码
                this.login()
              }
            })
          }
        }
      })
    }
  }
,




  onReady: function (options) {

  },

  


  onInput: function (event) {
    this.setData({
      currentDate: event.detail,
    });
  },


  changeUserName(event) {
    this.setData({
      "user.username": event.detail
    })
    console.log(this.data.user)
  },
  changePhone(event) {
    this.setData({
      "user.phone": event.detail
    })
    console.log(this.data.user)
  },


  //跳到用户界面
  toUser: function () {
    wx.navigateTo({
      url: '/pages/user/user',
    })
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
    console.log(this.data.user)
    //提交数据到后台进行注册
    var url = app.globalData.baseUrl + "/api/user/register"
    wx.request({
      url: url,
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
    this.setData({
      'user.operationDate': da
    });
  },

  onLoad: function () {

    //请求用户
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})