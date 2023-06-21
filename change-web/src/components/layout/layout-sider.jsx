import React, { useEffect } from 'react';
import { Layout, Menu, message } from 'antd';
import { BBLogo } from '../../config/resource.jsx';
import { useSnapshot } from 'valtio';
import { LayoutStates } from '../../store/layout.jsx';
import { MenuStates } from '../../store/menus.jsx';
import { useLocation, useNavigate } from 'react-router';
import { MenuPermissionCheck } from '../../common/permission.jsx';

const { Sider } = Layout;

// 侧边菜单栏
const AdminLayoutSider = () => {
  // 路由方法
  const navigate = useNavigate(); // 用于跳转连接
  const { pathname } = useLocation(); // 用于获取请求连接

  // 全局状态数据
  const { CurrentUserMenuTree } = useSnapshot(MenuStates); // 菜单信息
  const { MenuSiderCollapsed, MenuOpenKeys, MenuSelectKeys } = useSnapshot(LayoutStates); // Layout 信息

  useEffect(() => {
    if (CurrentUserMenuTree.length > 0) {
      // 菜单权限判断
      if (!MenuPermissionCheck(pathname, CurrentUserMenuTree)) {
        message.error('权限不足');
        navigate('/403');
      }

      // 修改默认打开和选中菜单
      let keys = findKeyList(pathname, CurrentUserMenuTree);
      LayoutStates.MenuSelectKeys = keys;

      // 解决收起菜单会弹出子菜单的问题
      if (MenuSiderCollapsed) {
        LayoutStates.MenuOpenKeys = [];
      } else {
        LayoutStates.MenuOpenKeys = keys;
      }
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
        openKeys={MenuOpenKeys}
        selectedKeys={MenuSelectKeys}
        mode="inline"
        items={CurrentUserMenuTree}
        style={{ letterSpacing: 2 }}
        onOpenChange={(key) => {
          // 解决 404 等页码第一次点击折叠菜单不展开和收起菜单栏不选中问题
          // LayoutStates.MenuOpenKeys = [key[key.length - 1]];
          LayoutStates.MenuOpenKeys = key;
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
