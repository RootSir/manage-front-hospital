import axios from 'axios'
import router from '@/router'
const service = axios.create({
  baseURL: '/fcm-wms', // url = base url + request url
  timeout: 30000, // request timeout
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, // request timeout
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
service.interceptors.request.use(function (config) { //请求拦截器

  if (localStorage.getItem('Authortokenasf')) {
    config.headers['x-admin-token'] = localStorage.getItem('Authortokenasf');
    // config.headers['x-token'] = 'b1c978ea797d4496a19f3362062f2820';
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


service.interceptors.response.use(function (response) {  //响应拦截器
  const data = response.data
  /**
   * code:0 表示成功；400表示出错
   */
  if (data.code == -1) {
    // Notify({ type: 'danger', message: '用户信息已过期!' })
    localStorage.clear()
    Toast.clear();
    router.replace({
      path: '/login', // 到登录页重新获取token
    })
  } else if (data.code == 0) {
    return Promise.resolve(data)
  } else {
    const err = {}
    err.code = response.data.code
    err.msg = response.data.msg
    if (data.msg != "运行时异常:请完善基本信息") {
    //   Notify({ type: 'danger', message: err.msg });
    }
    return response
  }



}, function (err) {
  // 返回状态码不为200时候的错误处理

  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        // Notify({ type: 'danger', message: err.message });
        break
      case 401:
        err.message = '未授权，请登录'
        // Notify({ type: 'danger', message: err.message });
        break
      case 403:
        err.message = '拒绝访问'
        Notify({ type: 'danger', message: err.message });
        break
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        // Notify({ type: 'danger', message: err.message });
        break
      case 408:
        err.message = '请求超时'
        // Notify({ type: 'danger', message: err.message });
        break
      case 500:
        err.message = '服务器内部错误'
        // Notify({ type: 'danger', message: err.message });
        break
      case 501:
        err.message = '服务未实现'
        // Notify({ type: 'danger', message: err.message });
        break
      case 502:
        err.message = '操作失败，请重试'
        // Notify({ type: 'danger', message: err.message });
        break
      case 503:
        err.message = '服务不可用'
        // Notify({ type: 'danger', message: err.message });
        break
      case 504:
        err.message = '网关超时'
        // Notify({ type: 'danger', message: err.message });
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        // Notify({ type: 'danger', message: err.message });
        break
      default:
    }
  }
  return Promise.reject(err);
});

export {
  service as axios
}