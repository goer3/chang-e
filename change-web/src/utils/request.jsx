import axios from 'axios';
import { GetToken } from './token.jsx';

// 创建实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + '/api/v1/', // 服务端地址
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在请求头中加入 Token（后端使用的是 Authorization）
    config.headers.Authorization = 'Bearer ' + GetToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// get 方法
export const GET = (url, params) => instance.get(url, params).then((res) => res.data);

// post 方法
export const POST = (url, data) => instance.post(url, data).then((res) => res.data);

// put 方法
export const PUT = (url, data) => instance.put(url, data).then((res) => res.data);

// patch 方法
export const PATCH = (url, data) => instance.patch(url, data).then((res) => res.data);

// delete 方法
export const DELETE = (url) => instance.delete(url).then((res) => res.data);
