import { GET, POST } from '../utils/request';

// 登录接口
export const LoginAPI = (data) => POST('/login', data);

// 当前用户信息接口
export const GetCurrentUserInfoAPI = () => GET('/system/user/info');
