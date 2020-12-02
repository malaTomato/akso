// pages/question/question.js
const app = getApp()
Page({
  options: {
    styleIsolation: 'shared',
  },
  /**
   * 页面的初始数据
   */

  data: {
    date: "",

    show: false,
    result: ['a', 'b'],

    record: {
      "name": "《尿道下裂手术阴茎外观满意度随访调查问卷》",
      "id": 1,
      "questions": [{
          "id": '1',
          "title": "1.	是否认为自己的阴茎外观与他人不同(   )",
          "type": "radio",
          "options": [{
              "key": "A",
              "value": "是"
            },
            {
              "key": "B",
              "value": "不是"
            }
          ]
        },
        {
          "id": '2',
          "title": "2.	是否认为自己的阴茎外观与他人不同(   )",
          "type": "radio",
          "options": [{
              "key": "A",
              "value": "是"
            },
            {
              "key": "B",
              "value": "不是"
            }
          ]
        },

        {
          "id": '3',
          "title": "3.不满意的主要原因(   )",
          "type": "checkbox",
          "options": [{
              "key": "A",
              "value": "龟头小"
            },
            {
              "key": "B",
              "value": "阴茎短小"

            },
            {
              "key": "C",
              "value": "阴茎弯曲"
            },
            {
              "key": "D",
              "value": "阴茎头形态异常"
            },
            {
              "key": "E",
              "value": "阴茎短粗胖"
            }
          ]
        }

      ]
    },
    result: {
      "1": "A"
    }


  },

  onChangeCheck(event) {
    this.setData({
      result: event.detail,
    });
  },

  onChange(event) {
    console.log(event.currentTarget.dataset.id + "选择" + event.detail.value)
    var id = event.currentTarget.dataset.id;
    var arr = this.data.result;
    arr[id] = event.detail.value;

    console.log(arr)
  },

  submit() {
    var arr = this.data.result;
    console.log(arr);
    var url = app.globalData.baseUrl + "/api/record/commit";
    //请求保存数据
    wx.request({
      url: url,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        "id": this.data.record.id,
        "records": arr,
        "openid": wx.getStorageSync('openid')
      },
      success(res) {
        
        console.log("保存成功,返回首页");




        wx.navigateTo({
          url: '/pages/user/user',
        })
      }
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
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this;
    //根据id 查询问卷调查

    wx.request({
      url: 'https://akso.design/akso/akso/api/question/getQuestion',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: options.id
      },
      success(res) {
        console.log(res.data);
        that.setData({
          record: res.data,

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