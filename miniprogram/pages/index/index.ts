// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }

    // 调用updateMotto
    this.updateMotto();
  },
  getUserInfo(e: any) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  // 反面示例：频繁调用setData方法
  // 现象：会造成页面严重卡顿
  updateMotto() {
    let count = 0
    let shouldStop = false

    setTimeout(() => {
      shouldStop = true
    }, 10000); // 10秒之后变更shouldStop的值

    // 利用函数式编程消除全局变量的隐患
    let update = () => {
      count++
      if (!shouldStop) {
        this.setData({
          motto: `update count:${count}`
        }, () => {
          // 递归调用
          update()
        })
      }
    }

    update()
  }
})
