// node域名
var host = 'localhost'
// node端口
var port = 8888
// 摄像头账号
var account = 'admin'
// 摄像头密码
var password = 'hik12345'
// 摄像头ip
var ipLists = [
  '192.168.1.41',
  '192.168.1.42',
  '192.168.1.43',
  '192.168.1.44'
]
module.exports = {
  host,
  port,
  account,
  password,
  ipLists
}
// node环境下才需要导出
if (typeof window === 'undefined') {
  module.exports = {
    host,
    port,
    account,
    password,
    ipLists
  }
}
