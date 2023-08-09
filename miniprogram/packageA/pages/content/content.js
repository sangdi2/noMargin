// pages/content/content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:0,
       getver:{},
       
    },
  mkdirr(){
      wx.request({
        url: 'http://localhost:8089/app/getcontent/?id='+this.data.id+'',
        method:'GET',
        success:(res)=>{
            console.log(res.data.data)
            this.setData({
                getver:res.data.data[0]
            })
        }
      })
  },
  changefalse(){
    wx.request({
        url: 'http://localhost:8089/app/changefalse/?id='+this.data.id+'',
        method:'GET',
        success:(res)=>{
            console.log(res)
            // this.setData({
            //     getver:res.data.data[0]
            // })
            this.mkdirr()
        }
      })
  },
  changetrue(){
    wx.request({
        url: 'http://localhost:8089/app/changetrue/?id='+this.data.id+'',
        method:'GET',
        success:(res)=>{
            console.log(res)
            // this.setData({
            //     getver:res.data.data[0]
            // })
            this.mkdirr()
        }
      })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function (options) {
        console.log(options)
        this.setData({
            id:parseInt(options.ids)
        })
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
        this.mkdirr()
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