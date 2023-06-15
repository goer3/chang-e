import { proxy } from 'valtio';

// Admin Layout 状态管理
export const AdminLayoutStates = proxy({
  userInfo: {}, // 用户信息
  menuItems: [], // 菜单信息
});
