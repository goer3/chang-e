import React from 'react';
import { GET, POST } from '../utils/request.jsx';

// 登录请求
export const LoginAPI = (data) => POST('/login', data);
// 获取当前用户信息
export const CurrentUserInfoAPI = () => GET('/system/user/info');
// 获取当前用户菜单树
export const CurrentUserMenuTreeAPI = () => GET('/system/menu/tree');
