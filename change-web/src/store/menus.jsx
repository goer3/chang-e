import { proxy } from 'valtio';

// 菜单相关状态
export const MenuStates = proxy({
  CurrentUserMenuTree: [], // 当前用户菜单树
});
