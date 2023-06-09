import { proxy } from 'valtio';

////////////////////////////////////////////////////////////
// 用户相关状态
////////////////////////////////////////////////////////////
export const UserStates = proxy({
  ResetPasswordToken: '', // 重置密码 Token
  CurrentUserInfo: {}, // 当前用户信息
  EditUserInfo: {}, // 编辑用户信息

  UserSearchExpand: false, // 是否展开所有搜素
  UserSearchParams: {}, // 用户搜索参数

  UserAddModelOpen: false, // 添加用户表单是否展示
  UserImportModelOpen: false, // 导入用户表单是否展示
  UserEditModelOpen: false, // 修改用户表单是否展示
});
