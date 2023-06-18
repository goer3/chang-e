import React from 'react';
import { GET, POST } from '../utils/request.jsx';

// 登录请求
export const LoginAPI = (data) => POST('/login', data);
// 获取当前用户信息
export const CurrentUserInfoAPI = () => GET('/system/user/info');
// 获取用户列表
export const UserListAPI = () => GET('/system/user/list');
// 获取当前用户菜单树
export const CurrentUserMenuTreeAPI = () => GET('/system/menu/tree');
// 获取省份数据
export const ProvinceListAPI = () => GET('/system/regions/list');
// 获取城市数据
export const CitiesListAPI = (id) => GET('/system/regions/list/' + id);
// 获取角色数据
export const RoleListAPI = () => GET('/system/role/list');
// 获取部门数据
export const DepartmentListAPI = () => GET('/system/department/list');
