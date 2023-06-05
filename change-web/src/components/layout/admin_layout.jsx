// React
import React, { useEffect, useState } from 'react';

// ANTD
import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

// 用户自定义
import { DefaultAvatar, Logo } from '../../utils/image.jsx';
import './admin_layout.less';
import { Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

// ANTD 模块
const { Header, Content, Footer, Sider } = Layout;

// Admin Layout 布局
const AdminLayout = () => {
  // 保存侧边菜单栏是否收缩状态
  const [collapsed, setCollapsed] = useState(false);
  // 用于跳转连接
  const navigate = useNavigate();
  // 用于获取请求连接
  const { pathname } = useLocation();
  // 默认展开的菜单
  const openKeys = findOpenKey(pathname);
  // 监听 pathname 变化，如果变化就需要更新面包屑
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    // 如果有变化，就是更新面包屑
    setBreadcrumbs(findDeepPath(pathname));
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/*左边区域*/}
      <Sider id="admin-layout-left" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} collapsedWidth="60">
        {/*logo 栏*/}
        <div className="admin-logo">
          <img src={Logo} alt="" style={{ width: collapsed ? 30 : 25 }} />
          <span className="admin-logo-title">CHANG`E</span>
        </div>

        {/*侧边菜单栏*/}
        <Menu
          theme="dark"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={openKeys}
          mode="inline"
          items={menuItems}
          style={{ letterSpacing: 2 }}
          // 菜单点击事件，能够返回对应的 Key
          // 文档中提示可获取到 item, key, keyPath, domEvent
          onClick={({ key }) => {
            // 跳转到 key 定义的 url
            navigate(key);
          }}
        />
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
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'admin-trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          {/*头像信息*/}
          <div style={{ float: 'right' }}>
            <Dropdown
              menu={{ items }}
              overlayStyle={{
                padding: 15,
              }}>
              <a className="admin-header-dropdown" onClick={(e) => e.preventDefault()}>
                <Avatar size={25} src={DefaultAvatar} style={{ top: -2 }} />
                <span className="admin-avatar-name">吴彦祖</span>
                <MoreOutlined className="admin-avatar-more" />
              </a>
            </Dropdown>
          </div>
        </Header>

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
        <Footer className="admin-footer">Copyright © 1993-2023 CHANG'E（嫦娥）, All Rights Reserved. Version:1.0.1</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 菜单数据
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const menuItems = [
  {
    key: '/dashboard',
    icon: <DesktopOutlined />,
    label: '工作台',
  },
  {
    key: '/system',
    icon: <SettingOutlined />,
    label: '系统设置',
    children: [
      {
        key: '/system/departments',
        label: '部门管理',
      },
      {
        key: '/system/users',
        label: '用户管理',
      },
      {
        key: '/system/roles',
        label: '角色管理',
      },
      {
        key: '/system/menus',
        label: '菜单管理',
      },
    ],
  },
  {
    key: '/info',
    icon: <UserOutlined />,
    label: '个人中心',
  },
  {
    key: '/help',
    icon: <QuestionCircleOutlined />,
    label: '获得帮助',
  },
  {
    key: '/about',
    icon: <FileOutlined />,
    label: '关于我们',
  },
];

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 解决刷新页面依然显示当前页问题
// 注意，该方法有个前提，外层目录的 key 必须是内层目录的子集
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const findOpenKey = (key) => {
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
  findInfo(menuItems);
  return result;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 生成面包屑菜单列表
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const findDeepPath = (key) => {
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
  findInfo(menuItems);

  // 根据当前访问的页面，生成需要显示的面包屑菜单
  const breadList = result.filter((item) => key.includes(item.key));
  if (breadList.length > 0) {
    // 生成指定格式数据
    return [{ label: '首页', key: '/dashboard' }, ...breadList];
  }
  // 否则返回空
  return [];
};
