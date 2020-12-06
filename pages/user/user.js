const {
  formatTime
} = require("../../utils/util");
const {
  formatDate
} = require("../../utils/util");
const {
  failToIndex
} = require("../../utils/util");
// pages/user/user.js

const app = getApp()

Page({
  options: {
    styleIsolation: 'shared',
  },
  
  data: {
    date: '10/14',
    show: false,
  },

  toNews: function () {
    wx.navigateTo({
      url: '/pages/news/news',
    })
  },

  toQuestion: function (event) {
    wx.navigateTo({
      url: '/pages/question/question?id=' + event.currentTarget.dataset.id,
    })
  },


  onDisplay() {
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['w2bcn5AT_EPBvZFX_O94AV2JTkgG5Xbz4xjf2eR3Y-0'],
      success (res) {
        console.log("订阅消息 成功 "+res);
        that.setData({
            show: true
          });
       },
      fail :(res) =>{ 
        console.log("订阅消息 失败 "+res);
        console.log(res);
      },
      complete:(errMsg)=>{
        console.log("订阅消息 完成 "+errMsg);
      }
    });
   
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return formatDate(date);
  },
  onConfirm(event) {
    var that = this;
    var changeDate = this.formatDate(event.detail);
    console.log(changeDate)

    var url = app.globalData.baseUrl + "/api/user/updateOperationDate"

    wx.request({
      url: url,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        "operationDate": changeDate,
        "openid": wx.getStorageSync('openid')
      },
      success(res) {
        that.setData({
          'user.operationDate': res.data.operationDate,
          'user.reviewDate': res.data.reviewDate
        })
      }


    })


    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },


  /**
   * 页面的初始数据
   */
  data: {
    'flag': false,
    'user': {
      "username": "",
      "phone": "",
      "operationDate": "2020-10-10",
      "reviewDate": "2020-11-10"
    },
    'questionDtoList': [{
      'id': 1,
      'title': '《关系与大大 大大双大苏打阿萨大厦大苏打阿斯顿》'
    },{
      'id': 2,
      'title': '《关系与大大 大大双大苏打阿萨大厦大苏打阿斯顿》'
    }
  
  ],
    'informationDtoList': {
      'id': 1,
      'title': ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.baseUrl + "/api/user/userPage"

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openId: wx.getStorageSync('openid')
      },
      success(res) {
        console.log(res.data);
        that.setData({
          user: res.data.user,
          questionDtoList: res.data.questionDtoList,
          informationDtoList: res.data.informationDtoList,
          flag: res.data.flag
        })
      },
      fail() {
        console.log('请求失败，跳转到首页')
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})