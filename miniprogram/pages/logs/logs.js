// logs.js


Page({
  data: {
    name: '',
  gender: [
    { name: '男', value: '0', checked: true },
    { name: '女', value: '1', checked: false }
  ],
  skills: [
    { name: '很少',  checked: false },
    { name: '偶尔',  checked: false },
    { name: '经常',  checked: false },
    
  ],
  skill: [
    { name: '出租车',  checked: false },
    { name: '公共汽车',  checked: false },
    { name: '私家车',  checked: false },
    
  ],
  skil: [
    { name: '严重',  checked: false },
    { name: '一般',  checked: false },
    { name: '很少',  checked: false },
    
  ],
  opinion: ''

  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
