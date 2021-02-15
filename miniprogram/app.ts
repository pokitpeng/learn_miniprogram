import { getSetting, getUserInfo } from "./utils/util"

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         },
    //       })
    //     }
    //   },
    // })

    // 获取用户信息 Promise版
    getSetting().then((res: any) => {
      if (res.authSetting['scope.userInfo']) {
        return getUserInfo()
      }
      // 如果没有权限就返回一个undefined
      return undefined
    }).then((res: any) => {
      if (!res) { // res为undefined时, 直接返回
        return
      }
      // 此处res?.userInfo中的? 可以提高容错性，res为undefined时，拿到的userInfo为undefined，否则会出错挂掉
      this.globalData.userInfo = res.userInfo
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
    })
  },
})