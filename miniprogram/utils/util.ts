export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function getSetting(): Promise<WechatMiniprogram.GetSettingSuccessCallbackResult> {
  // 更改tsconfig.json文件中的target和lib为es6，才会有Promise的自动补全提示
  return new Promise((resolve, reject) => {
    wx.getSetting({
      // success: res => resolve(res), // 也可以使用以下简洁写法
      success: resolve,
      // fail: err => reject(err), // 也可以使用以下简洁写法
      fail: reject
    })
  })
}

export function getUserInfo(): Promise<WechatMiniprogram.GetUserInfoSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}