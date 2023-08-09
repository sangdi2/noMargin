// pages/course/course.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseinformation: [],
        isgoods: true,
        keyWord: "",
        searchedGoods: []
    },
    query(keyWord) {
        console.log("即将查询goods列表")
        var attribute = 'title'

        console.log(keyWord)
        const reg = new RegExp(keyWord) // 创建正则表达式

        const arr = []
        var list = this.data.courseinformation
        console.log(list)
        for (let i = 0; i < list.length; i++) {

            if (reg.test(list[i][attribute])) {

                arr.push(list[i])

            }

        }
        console.log(arr)
        this.setData({
            searchedGoods: arr
        })
        console.log("查询完了")
    },
    getGoods(keyword) {
          console.log("即将获取goods列表",keyword)
        wx.cloud.callFunction({
            // 云函数名称
            name: 'homeForGetGoods',
            data:{
                keyword:keyword
            }
            // 传给云函数的
        }).then(res => {
                console.log(res)
                this.setData({
                    searchedGoods: res.result.titleList.data
                })

                console.log("渲染goods列表完成")

        })
        if (this.data.searchedGoods.length==0) {
            
            this.setData({
                isgoods: true
            })



        }else{
            this.setData({
                isgoods: false
            })
        }
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            keyWord: options.ids
        })
        this.getGoods(options.ids)
       
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