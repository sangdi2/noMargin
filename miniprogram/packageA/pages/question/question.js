// pages/question/question.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      getquestion:[],
      id:0,
      color:'black'
    },
    getquestion(){
       wx.request({
         url: 'http://localhost:8089/apo/getquestion',
         method:'GET',
         success:(res)=>{
             console.log(res.data)
             this.setData({
                 getquestion:res.data.data
             })
         }
       })
    },
    commpare(id){
       console.log(id.currentTarget.dataset.info)
       var ids=id.currentTarget.dataset.info.split(',')
       console.log(ids)
       this.setData({
           id:parseInt(ids[0])
       })
       wx.request({
         url: 'http://localhost:8089/apo/getanswer?id='+this.data.id+'',
         method:'GET',
         success:(res)=>{
             console.log(res.data.data[0].answer)
             console.log(ids[1])
             console.log(ids[2])
             if(ids[1]===res.data.data[0].answer){
                wx.showToast({
                  title: '答对啦',
                  icon:'success',
                  duration:2000
                })
               
             }else {
                wx.showToast({
                    title: '答错啦',
                    icon:'error',
                    duration:2000
                  })
             }
         }
       })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.getquestion()
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