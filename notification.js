/**
 * 系统消息通知
 * @param title{String} 消息标题
 * @param message {String} 消息内容
 * @param url 点击消息是，跳转地址
 */
export default function notification ({ title, message, url }) {
  const notice = new Notification(title, {
    body: message,
    // icon: "我的掘金头像",
    data: {
      url: url
    }
  });

// 点击回调
  notice.onclick = () => {
    window.open(notice.data.url); // 当用户点击通知时，在浏览器打开百度网站
  }
  // 消息授权
  Notification.requestPermission(prem =>
      prem === "granted" // 同意
      // prem == "denied" // 拒绝
  )
  let permission = Notification.permission;

  if(permission === "granted") {
    // 已同意，开始发送通知
  } else if(permission === "denied") {
    // 不同意，发不了咯
  } else {
    // 其他状态，可以重新发送授权提示
    Notification.requestPermission();
  }
}
