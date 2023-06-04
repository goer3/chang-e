// React
import React, { useState } from 'react';

// ANTD
import { Avatar, Dropdown, Layout } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
} from '@ant-design/icons';

// 用户自定义
import { DefaultAvatar, Logo } from '../../utils/image.jsx';
import './admin_layout.less';
import { Outlet, useNavigate } from 'react-router';

// ANTD 模块
const { Header, Content, Footer, Sider } = Layout;

// Admin Layout 布局
const AdminLayout = () => {
  // 保存侧边菜单栏是否收缩状态
  const [collapsed, setCollapsed] = useState(false);
  // 用于跳转连接
  const navigate = useNavigate();
  // // 用于获取请求连接
  // const { pathname } = useLocation();
  // const openKeys = findOpenKey(pathname);
  // // 监听 pathname 变化，如果变化就需要更新面包屑
  // const [breadcrumbs, setBreadcrumbs] = useState([]);
  // useEffect(() => {
  //   // 如果有变化，就是更新面包屑
  //   setBreadcrumbs(findDeepPath(pathname));
  // }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/*左边区域*/}
      <Sider
        id="admin-layout-left"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth="60">
        {/*logo 栏*/}
        <div className="admin-logo">
          <img src={Logo} alt="" style={{ width: collapsed ? 30 : 25 }} />
          <span className="admin-logo-title">CHANG`E</span>
        </div>

        {/*侧边菜单栏*/}
        {/*<Menus*/}
        {/*  theme="dark"*/}
        {/*  defaultOpenKeys={openKeys}*/}
        {/*  defaultSelectedKeys={openKeys}*/}
        {/*  mode="inline"*/}
        {/*  items={menuItems}*/}
        {/*  style={{ letterSpacing: 2 }}*/}
        {/*  // 菜单点击事件，能够返回对应的 Key*/}
        {/*  // 文档中提示可获取到 item, key, keyPath, domEvent*/}
        {/*  onClick={({ key }) => {*/}
        {/*    // 跳转到 key 定义的 url*/}
        {/*    navigate(key);*/}
        {/*  }}*/}
        {/*/>*/}
      </Sider>

      {/*右边区域*/}
      <Layout
        className="admin-layout-right"
        style={{
          marginLeft: collapsed ? 60 : 200,
          transitionDuration: '0.2s', // 解决菜单收起展开动画不同步问题
        }}>
        {/*顶部菜单栏*/}
        <Header className="admin-background" style={{ zIndex: 5 }}>
          {/*折叠按钮*/}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'admin-trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          {/*头像信息*/}
          <div style={{ float: 'right' }}>
            <Dropdown
              menu={{ items }}
              overlayStyle={{
                padding: 15,
              }}>
              <a
                className="admin-header-dropdown"
                onClick={(e) => e.preventDefault()}>
                <Avatar size={25} src={DefaultAvatar} style={{ top: -2 }} />
                <span className="admin-avatar-name">吴彦祖</span>
                <MoreOutlined className="admin-avatar-more" />
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content>
          {/*面包屑*/}
          {/*<Breadcrumb className="admin-breadcrumb">*/}
          {/*  {breadcrumbs.map((item) => (*/}
          {/*    <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>*/}
          {/*  ))}*/}
          {/*</Breadcrumb>*/}
          <Outlet />
        </Content>
        <Footer className="admin-footer">
          © 1993-2023 CHANG'E（嫦娥）一站式运维管理系统
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Header 下拉菜单，只能命名为 items，否则会报错：
// React.Children.only expected to receive a single React element child.
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const items = [
  {
    label: (
      <a target="_blank" href="/">
        个人中心
      </a>
    ),
    key: '/info',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <a target="_blank" href="/logout">
        注销
      </a>
    ),
    key: '/logout',
  },
];
