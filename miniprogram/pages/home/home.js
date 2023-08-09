// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiper: [{
                id: 1,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/one.png'
            },
            {
                id: 2,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/two.png'
            },
            {
                id: 3,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/three.png'
            },
            {
                id: 4,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/four.png'
            },
            {
                id: 5,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/five.png'
            }
        ],
        nav: [{
                id: 1,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/tuijian.png',
                text: '推荐'
            },
            {
                id: 2,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/fabu.png',
                text: '发布'
            },
            {
                id: 3,
                url: 'cloud://cloud1-8gnx9gwh27bc98b9.636c-cloud1-8gnx9gwh27bc98b9-1312308472/images/like .png',
                text: '收藏'
            }
        ],
        goodsinformation: [],
        text: [],
        value: '',
        option1: [{
            text: '全部小区',
            value: 0
        }],
        option2: [{
                text: '全部商品',
                value: 'a'
            }

        ],
        value1: 0,
        value2: 'a',
        isgoods: true,


    },
    goSearch(value) {
        if (value.currentTarget.dataset.info) {
            wx.navigateTo({
                url: '/packageA/pages/course/course?ids=' + value.currentTarget.dataset.info + ''
            })
        }

    },

    changeHome(value) {
        var currentarr = this.data.option1.filter((item) => {
            return item.value == value.detail
        })
        console.log(currentarr[0].text)
        var cloudname = 'homeForGetGoods'
        if (currentarr[0].text == "全部小区") {
            cloudname = 'getGoods'
        }
        wx.cloud.callFunction({
            // 云函数名称
            name: cloudname,
            // 传给云函数的
            data: {
                text: currentarr[0].text
            },
        }).then((res) => {
            console.log(res)
            if (cloudname == 'homeForGetGoods') {
                this.setData({
                    goodsinformation: res.result.list.data
                })
                return
            }
            this.setData({
                goodsinformation: res.result.data
            })
        })
    },
    changeCategory(value) {
        var currentarr = this.data.option2.filter((item) => {
            return item.value == value.detail
        })
        console.log(currentarr[0].text)
        var cloudname = 'homeForGetGoods'
        if (currentarr[0].text == "全部商品") {
            cloudname = 'getGoods'
        }
        wx.cloud.callFunction({
            // 云函数名称
            name: cloudname,
            // 传给云函数的
            data: {
                text: currentarr[0].text
            },
        }).then((res) => {
            console.log(res)
            if (cloudname == 'homeForGetGoods') {
                this.setData({
                    goodsinformation: res.result.Categorylist.data
                })
                return
            }
            this.setData({
                goodsinformation: res.result.data
            })
        })
    },
    onChange(e) {
        this.setData({
            value: e.detail,
        });
    },
    onSearch() {
        Toast('搜索' + this.data.value);
    },
    onClick() {
        Toast('搜索' + this.data.value);
    },

    navgitor(text) {
        console.log(text.currentTarget.dataset.info)
        if (text.currentTarget.dataset.info === '课程') {
            wx.navigateTo({
                url: '/packageA/pages/course/course',
            })
        } else if (text.currentTarget.dataset.info === '资讯') {
            wx.switchTab({
                url: '/pages/zixun/zixun',
            })
        } else {
            wx.navigateTo({
                url: '/packageA/pages/like/like',
            })
        }
    },
    filterAddress(data) {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'homeForGetGoods',
            // 传给云函数的
        }).then(res => {

            var uniqueArr= res.result.allAdress.list[0].categories
           
            for (var index in uniqueArr) {
                var arr = this.data.option1
                arr.push({
                    text: uniqueArr[index],
                    value: arr.length
                })
            }
            console.log(arr)
            this.setData({
                option1: arr
            })
        })

    },
    filterCategory(data) {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'homeForGetGoods',
            // 传给云函数的
        }).then(res => {
            
            var uniqueArr= res.result.allCategory.list[0].categories
           
            for (var index in uniqueArr) {
                var arr = this.data.option2
                arr.push({
                    text: uniqueArr[index],
                    value: arr.length
                })
            }
            console.log(arr)
            this.setData({
                option2: arr
            })
        })

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getGoods',
            // 传给云函数的
        }).then(res => {

            this.setData({
                goodsinformation: res.result.data
            })
        })
        if (this.data.goodsinformation) {
            this.setData({
                isgoods: false
            })



        } else {
            this.setData({
                isgoods: true
            })
        }
        this.filterAddress()
        this.filterCategory()

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