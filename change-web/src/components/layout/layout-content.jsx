import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useSnapshot } from 'valtio';
import { MenuStates } from '../../store/menus.jsx';
const { Content } = Layout;

////////////////////////////////////////////////////////////
// 主体区域
////////////////////////////////////////////////////////////
const AdminLayoutContent = () => {
  // 全局状态
  const { CurrentUserMenuTree } = useSnapshot(MenuStates); // 菜单信息

  // 局部状态
  const [breadcrumbs, setBreadcrumbs] = useState([]); // 面包屑信息

  // 路由方法
  const { pathname } = useLocation(); // 用于获取请求连接

  // 面包屑
  useEffect(() => {
    if (CurrentUserMenuTree.length > 0) {
      // 修改面包屑
      switch (pathname) {
        case '/404':
          setBreadcrumbs([
            { label: '首页', key: '/dashboard' },
            { label: '404', key: '/404' },
          ]);
          break;
        case '/403':
          setBreadcrumbs([
            { label: '首页', key: '/dashboard' },
            { label: '403', key: '/403' },
          ]);
          break;
        default:
          setBreadcrumbs(findDeepPath(pathname, CurrentUserMenuTree));
      }
    }
  }, [pathname, CurrentUserMenuTree]);

  return (
    <>
      <Content>
        {/*面包屑*/}
        <Breadcrumb className="admin-breadcrumb">
          {breadcrumbs.map((item) => (
            <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        {/*代替接收 Children 传递*/}
        <Outlet />
      </Content>
    </>
  );
};

export default AdminLayoutContent;

////////////////////////////////////////////////////////////
// 生成面包屑菜单列表
////////////////////////////////////////////////////////////
const findDeepPath = (key, menus) => {
  // 将嵌套的多菜单变成一级菜单
  const result = [];
  const findInfo = (menuList) => {
    menuList.forEach((item) => {
      // 解构数据成 info 和 children 两个部分
      const { children, ...info } = item;
      result.push(info);
      // 如果有子菜单，继续递归处理
      if (children) {
        findInfo(children);
      }
    });
  };

  // 调用函数
  findInfo(menus);

  // 根据当前访问的页面，生成需要显示的面包屑菜单
  const breadList = result.filter((item) => key.includes(item.key));
  if (breadList.length > 0) {
    // 生成指定格式数据
    return [{ label: '首页', key: '/dashboard' }, ...breadList];
  }
  // 否则返回空
  return [];
};
