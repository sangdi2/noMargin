// pages/video/video.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:0,
        course:{},
        tuijiancourse:[]
    },
    searchid(){
        
        wx.request({
          url: 'http://localhost:8089/api/getvideo/?id='+this.data.id+'',
          method:'GET',
          header: {
            'content-type': 'application/json'
          },
          success:(res)=>{
              console.log(res.data.data[0])
              this.setData({
                  course:res.data.data[0]
              })
          }
        })
    },
    tuijian(){
        wx.request({
            url: 'http://localhost:8089/api/tuijiancourse/?id='+this.data.id+'',
            method:'GET',
            header: {
              'content-type': 'application/json'
            },
            success:(res)=>{
                console.log(res.data.data)
                this.setData({
                    tuijiancourse:res.data.data
                })
            }
          })
    },
    btn(id){
        console.log(id.currentTarget.dataset.info)
        wx.navigateTo({
          url: '/packageA/pages/video/video?ids='+id.currentTarget.dataset.info+''
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(parseInt(options.ids))
       this.setData({
           id:parseInt(options.ids)
       })
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.searchid()
        this.tuijian()
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