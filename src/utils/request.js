import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 发送数据的前置处理
    if (store.getters.token) {
      // 每一个请求都会带上token
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * 通过自定义的状态码来判断请求的状态
   * 你也可以通过HTTP状态码来判断请求的状态
   */
  response => {
    const res = response.data
    // 如果自定义的状态码不是1000，就判断为错误
    if (res.code !== 1000) {
      Message({
        message: res.message || '错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 2002: token 非法; 2003: token 过期
      if (res.code === 2002 || res.code === 2003) {
        // 重新登录
        MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 重置token并重新登录
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
