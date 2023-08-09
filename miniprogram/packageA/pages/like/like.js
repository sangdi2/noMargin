// pages/like/like.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
         like:[]
    },
getlike(){
   wx.request({
     url: 'http://localhost:8089/app/getlike',
     method:'GET',
     success:(res)=>{
         console.log(res.data)
         this.setData({
             like:res.data.data
         })
     }
   })
},
gocontent(id){
    wx.navigateTo({
      url: '/packageA/pages/content/content?ids='+id.currentTarget.dataset.info+''
    })
},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
         this.getlike()
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