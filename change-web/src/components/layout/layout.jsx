import { useEffect } from 'react';
import { Layout, message } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import { GetCurrentUserInfoAPI, GetCurrentUserMenuTreeAPI } from '../../common/request-api.jsx';
import { UserStates } from '../../store/users.jsx';
import { MenuStates } from '../../store/menus.jsx';
import { Iconfont } from '../../config/resource.jsx';
import AdminLayoutSider from './sider.jsx';
import '/src/assets/css/admin.less';
import '/src/assets/css/theme.less';

// Admin Layout 布局
const AdminLayout = () => {
  // 路由方法
  const navigate = useNavigate(); // 用于跳转连接

  useEffect(() => {
    // 获取当前用户信息
    const GetCurrentUserInfo = async () => {
      const res = await GetCurrentUserInfoAPI();
      if (res.code === 401) {
        sessionStorage.clear();
        message.error('用户登录信息失效，请重新登录');
        navigate('/login');
      } else {
        UserStates.CurrentUserInfo = res.data.info;
      }
    };
    GetCurrentUserInfo();
  }, []);

  // 根据当前用户获取菜单列表
  useEffect(() => {
    // 获取当前用户信息
    const GetCurrentMenuTree = async () => {
      const res = await GetCurrentUserMenuTreeAPI();
      if (res.code !== 200) {
        message.error('获取当前用户菜单失败');
      } else {
        // 处理返回的数据，生成 Menu 组件的 items 菜单数据，这里只写了两级
        let menuData;
        menuData = res.data.tree.map((menu1) => {
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
    };
    GetCurrentMenuTree();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/*侧边菜单*/}
      <AdminLayoutSider />
      <Outlet />
    </Layout>
  );
};

export default AdminLayout;
