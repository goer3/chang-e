import { proxy } from 'valtio';

// Users 状态管理
export const UsersStates = proxy({
  addUserFormOpen: false, // 是否显示添加用户表单
  importUserOpen: false, // 导入用户
});
