// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    date: "",

    show: false,
    result: ['a', 'b'],

    record: {
      "name": "《尿道下裂手术阴茎外观满意度随访调查问卷》",
      "questions": [{
          "id": '1',
          "title": "1.	是否认为自己的阴茎外观与他人不同(   )",
          "type": "radio",
          "require": true,
          "options": [{
              "key": "A",
              "value": "是",
              "checked": false
            },
            {
              "key": "B",
              "value": "不是"
            }
          ],
          "value":''
        },
        {
          "id": '2',
          "title": "2.	是否认为自己的阴茎外观与他人不同(   )",
          "type": "radio",
          "require": true,
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
          "require": true,
          "name": "1",
          "options": [{
              "key": "A",
              "value": "龟头小",
              "checked": false
            },
            {
              "key": "B",
              "value": "阴茎短小",
              "checked": false

            },
            {
              "key": "C",
              "value": "阴茎弯曲",
              "checked": false
            },
            {
              "key": "D",
              "value": "阴茎头形态异常",
              "checked": false
            },
            {
              "key": "E",
              "value": "阴茎短粗胖",
              "checked": false
            }
          ]
        }

      ]
    }


  },

  onChangeCheck(event) {
    this.setData({
      result: event.detail,
    });
  },

  onChange(event) {
    console.log(event.currentTarget.dataset.id +"选择"+event.detail.value)
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

    //根据id 查询问卷调查





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