import { GET, POST } from './request.jsx';

////////////////////////////////////////////////////////////
// 公共接口
////////////////////////////////////////////////////////////
// 登录接口
export const LoginAPI = (data) => POST('/login', data);

////////////////////////////////////////////////////////////
// 地区
////////////////////////////////////////////////////////////
// 获取省份数据接口
export const GetProvinceListAPI = () => GET('/system/regions/list');
// 根据省份获取城市数据接口
export const GetCityListByProvinceIdAPI = (id) => GET('/system/regions/list/' + id);

////////////////////////////////////////////////////////////
// 部门
////////////////////////////////////////////////////////////
// 获取部门数据
export const GetDepartmentListAPI = () => GET('/system/department/list');

////////////////////////////////////////////////////////////
// 用户
////////////////////////////////////////////////////////////
// 当前用户信息接口
export const GetCurrentUserInfoAPI = () => GET('/system/user/info');
// 获取用户列表
export const GetUserListAPI = (params) => GET('/system/user/list', params);
// 创建用户
export const CreateUserAPI = (data) => POST('/system/user/create', data);

////////////////////////////////////////////////////////////
// 角色
////////////////////////////////////////////////////////////
// 获取角色数据接口
export const GetRoleListAPI = () => GET('/system/role/list');

////////////////////////////////////////////////////////////
// 菜单
////////////////////////////////////////////////////////////
// 当前用户的菜单列表接口
export const GetCurrentUserMenuTreeAPI = () => GET('/system/menu/tree');
