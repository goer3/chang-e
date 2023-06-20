import React, { useEffect } from 'react';
import { Layout, Menu, message } from 'antd';
const { Sider } = Layout;
import { BBLogo } from '../../config/resource.jsx';
import { useSnapshot } from 'valtio';
import { LayoutStates } from '../../store/layout.jsx';
import { MenuStates } from '../../store/menus.jsx';
import { useLocation, useNavigate } from 'react-router';
import { MenuPermissionCheck } from '../../common/permission.jsx';

// 侧边菜单栏
const AdminLayoutSider = () => {
  // 路由方法
  const navigate = useNavigate(); // 用于跳转连接
  const { pathname } = useLocation(); // 用于获取请求连接

  // 全局状态数据
  const { CurrentUserMenuTree } = useSnapshot(MenuStates); // 菜单信息
  const { MenuSiderCollapsed, MenuOpenSelectKeys } = useSnapshot(LayoutStates); // Layout 信息

  useEffect(() => {
    if (CurrentUserMenuTree.length > 0) {
      // 菜单权限判断
      if (!MenuPermissionCheck(pathname, CurrentUserMenuTree)) {
        message.error('权限不足');
        navigate('/403');
      }

      // 修改默认打开和选中菜单
      LayoutStates.MenuOpenSelectKeys = findKeyList(pathname, CurrentUserMenuTree);
    }
  }, [pathname, CurrentUserMenuTree]);

  return (
    <Sider
      id="admin-layout-left"
      collapsible
      collapsed={MenuSiderCollapsed}
      onCollapse={() => (LayoutStates.MenuSiderCollapsed = !MenuSiderCollapsed)}
      collapsedWidth="60">
      <div className="admin-logo">
        <img src={BBLogo} style={{ height: MenuSiderCollapsed ? 30 : 25, userSelect: 'none' }} alt="" />
      </div>

      <Menu
        theme="dark"
        defaultSelectedKeys="['/dashboard']"
        openKeys={MenuOpenSelectKeys}
        selectedKeys={MenuOpenSelectKeys}
        mode="inline"
        items={CurrentUserMenuTree}
        style={{ letterSpacing: 2 }}
        // 设置 openKeys 导致子菜单无法展开问题
        onOpenChange={(key) => {
          // 解决 404 等页码第一次点击折叠菜单不展开问题
          LayoutStates.MenuOpenSelectKeys = [key[key.length - 1]];
        }}
        // 菜单点击事件，能够返回对应的 Key
        // 文档中提示可获取到 item, key, keyPath, domEvent
        onClick={({ key }) => {
          // 跳转到 key 定义的 url
          navigate(key);
        }}
      />
    </Sider>
  );
};

export default AdminLayoutSider;

////////////////////////////////////////////////////////////
// 获取菜单列表
////////////////////////////////////////////////////////////
const findKeyList = (key, menus) => {
  // 当前请求的菜单列表，可能是一级菜单，也可能是二级甚至多级
  const result = [];
  // 传入菜单列表，判断当前请求的菜单是否在菜单列表中
  const findInfo = (menuList) => {
    menuList.forEach((item) => {
      // 生成一级菜单列表
      if (key.includes(item.key)) {
        result.push(item.key);
        if (item.children) {
          // 递归继续查找
          findInfo(item.children);
        }
      }
    });
  };

  // 调用函数
  findInfo(menus);
  return result;
};
