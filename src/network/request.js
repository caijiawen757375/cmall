import axios from "axios";

export function request(config) {
  //1.创建axios实例
const instance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/m5',
  timeout: 5000
})

  //2.axios拦截器
  //2.1 拦截请求
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    console.log(error);
  })
  //2.2 拦截响应
  instance.interceptors.response.use(result => {
    return result
  }, error => {
    console.log(error);
  })

  //3.发送网络请求，返回promise
  return instance(config)

}
