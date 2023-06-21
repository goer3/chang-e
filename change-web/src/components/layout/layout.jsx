import React, { useEffect } from 'react';
import { Layout, message } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import '/src/assets/css/admin.less';
import '/src/assets/css/theme.less';
import { GetCurrentUserInfoAPI, GetCurrentUserMenuTreeAPI } from '../../common/request-api.jsx';
import { FooterText, Iconfont } from '../../config/resource.jsx';
import AdminLayoutSider from './layout-sider.jsx';
import AdminLayoutHeader from './layout-header.jsx';
import { useSnapshot } from 'valtio';
import { LayoutStates } from '../../store/store-layout.jsx';
import { UserStates } from '../../store/store-users.jsx';
import { MenuStates } from '../../store/store-menus.jsx';
import AdminLayoutContent from './layout-content.jsx';

const { Footer } = Layout;

////////////////////////////////////////////////////////////
// Admin Layout 布局
////////////////////////////////////////////////////////////
const AdminLayout = () => {
  // 路由方法
  const navigate = useNavigate(); // 用于跳转连接

  // 全局状态
  const { MenuSiderCollapsed } = useSnapshot(LayoutStates); // Layout 信息

  // 获取当前用户信息
  useEffect(() => {
    const res = GetCurrentUserInfoAPI();
    res.then((v) => {
      if (v.code === 401) {
        sessionStorage.clear();
        message.error('用户登录信息失效，请重新登录');
        navigate('/login');
      } else {
        UserStates.CurrentUserInfo = v.data.user_info;
      }
    });
  }, []);

  // 根据当前用户获取菜单列表
  useEffect(() => {
    // 获取当前用户信息
    const res = GetCurrentUserMenuTreeAPI();
    res.then((v) => {
      if (v.code !== 200) {
        message.error('获取当前用户菜单失败');
      } else {
        // 处理返回的数据，生成 Menu 组件的 items 菜单数据，这里只写了两级
        let menuData;
        menuData = v.data.tree.map((menu1) => {
          return {
            key: menu1.path,
            label: menu1.name,
            icon: <Iconfont icon={menu1.icon}></Iconfont>,
            children:
              menu1.children &&
              menu1.children.map((menu2) => {
                return {
                  key: menu2.path,
                  label: menu2.name,
                };
              }),
          };
        });
        MenuStates.CurrentUserMenuTree = menuData;
      }
    });
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/*侧边菜单*/}
      <AdminLayoutSider />
      <Layout
        className="admin-layout-right"
        style={{
          marginLeft: MenuSiderCollapsed ? 60 : 200,
          transitionDuration: '0.2s', // 解决菜单收起展开动画不同步问题
        }}>
        {/*顶部导航栏*/}
        <AdminLayoutHeader />
        {/*内容主体区域*/}
        <AdminLayoutContent />
        {/*底部信息*/}
        <Footer className="admin-footer">
          <FooterText />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
