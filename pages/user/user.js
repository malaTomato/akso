const { formatTime } = require("../../utils/util");
const { formatDate } = require("../../utils/util");
// pages/user/user.js
Page({

  data: {
    date: '10/14',
    show: false,
  },

  toNews: function () {
    wx.navigateTo({
      url: '/pages/news/news',
    })
  },

  toQuestion: function () {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  },


  onDisplay() {
    this.setData({
      show: true
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
    wx.request({
      url: 'https://akso.design/akso/akso/api/user/updateOperationDate',
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        "operationDate": changeDate,
        "openid": wx.getStorageSync('openid')
      },
      success(res) {
        that.setData({
          'user.operationDate':res.data.operationDate,
          'user.reviewDate' : res.data.reviewDate
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
    'flag':false,
    'user': {
      "username": "xxxxx",
      "phone": "1111",
      "operationDate": "2020-10-11",
      "reviewDate":"2020-11-11"
    },
    'questionDtoList': [{
      'id': 1,
      'title': '《xxxx》'
    }],
    'informationDtoList':{
      'id': 1,
      'title': '《xxxx》'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://akso.design/akso/akso/api/user/userPage',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        openId:wx.getStorageSync('openid')
      },
      success(res) {
        console.log(res.data);
        that.setData({
          user: res.data.user,
          questionDtoList: res.data.questionDtoList,
          informationDtoList: res.data.informationDtoList,
          flag: res.data.flag
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