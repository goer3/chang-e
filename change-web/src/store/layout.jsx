import { proxy } from 'valtio';

// Layout 相关状态
export const LayoutStates = proxy({
  MenuSiderCollapsed: false, // 是否收起侧边菜单栏
  MenuOpenSelectKeys: [], // 默认展开和选中的菜单
});
