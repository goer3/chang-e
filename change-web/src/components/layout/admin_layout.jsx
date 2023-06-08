// React
import React, { useEffect, useState } from 'react';

// ANTD
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, MoreOutlined } from '@ant-design/icons';

// 用户自定义
import { FooterInfo, Iconfont, Logo } from '../../utils/resource.jsx';
import './admin_layout.less';
import { Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CurrentUserInfoAPI, CurrentUserMenuTreeAPI } from '../../service/index.jsx';

// ANTD 模块
const { Header, Content, Footer, Sider } = Layout;

// Admin Layout 布局
const AdminLayout = () => {
  // 用于跳转连接
  const navigate = useNavigate();

  // 用于获取请求连接
  const { pathname } = useLocation();

  // 状态数据
  const [collapsed, setCollapsed] = useState(false); // 侧边菜单栏是否收缩状态
  const [userInfo, setUserInfo] = useState({}); // 当前用户信息
  const [menuItems, setMenuItems] = useState([]); // 菜单信息
  // 监听变化
  useEffect(() => {
    ///////////////////////////////////////
    // 请求后端获取用户信息
    ///////////////////////////////////////
    const res1 = CurrentUserInfoAPI();
    res1.then((v) => {
      if (v.code === 401) {
        sessionStorage.clear();
        message.error('用户登录信息失效，请重新登录');
        navigate('/login');
        return;
      }
      setUserInfo(v.data.user_info);
    });

    ///////////////////////////////////////
    // 获取菜单数据
    ///////////////////////////////////////
    // 请求后端接口获取菜单列表
    const res2 = CurrentUserMenuTreeAPI();
    res2.then((v) => {
      if (v.code === 200) {
        // 生成 Menu 组件的 items 菜单数据，这里只写了两级
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
        setMenuItems(menuData);
      }
    });
  }, []);

  // 其他状态数据
  const [openKeys, setOpenKeys] = useState([]); // 展开菜单
  const [selectKeys, setSelectKeys] = useState([]); // 选中
  const [breadcrumbs, setBreadcrumbs] = useState([]); // 面包屑信息
  useEffect(() => {
    if (menuItems.length > 0) {
      // 菜单权限判断
      if (!MenuPermissionCheck(pathname, menuItems)) {
        message.error('权限不足');
        navigate('/403');
      }

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
          setBreadcrumbs(findDeepPath(pathname, menuItems));
      }

      // 修改默认打开菜单
      setOpenKeys(findKeyList(pathname, menuItems));

      // 修改默认选中菜单
      setSelectKeys(findKeyList(pathname, menuItems));
    }
  }, [pathname, menuItems]);

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
          defaultSelectedKeys="['/dashboard']"
          openKeys={openKeys}
          selectedKeys={selectKeys}
          mode="inline"
          items={menuItems}
          style={{ letterSpacing: 2 }}
          // 设置 openKeys 导致子菜单无法展开问题
          onOpenChange={(key) => {
            // 解决 404 等页码第一次点击折叠菜单不展开问题
            setOpenKeys([key[key.length - 1]]);
          }}
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
                <Avatar size={25} src={userInfo.avatar} style={{ top: -2 }} />
                <span className="admin-avatar-name">{userInfo.name}</span>
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
          <Outlet context={[userInfo, setUserInfo]} />
        </Content>
        <Footer className="admin-footer">{FooterInfo}</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 退出登录
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const logoutHandle = () => {
  sessionStorage.clear();
  message.success('退出登录成功');
  location.reload();
};

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
    label: <a onClick={logoutHandle}>注销</a>,
    key: '/logout',
  },
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 解决刷新页面依然显示当前页问题
// 注意，该方法有个前提，外层目录的 key 必须是内层目录的子集
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 生成面包屑菜单列表
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 判断用户是否拥有菜单权限
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const MenuPermissionCheck = (path, menus) => {
  let permisson = false;
  let errUrlList = ['/403', '/404']; // 错误页面不需要验证
  // 白名单
  if (errUrlList.includes(path)) {
    return true;
  } else {
    // 传入菜单列表，判断当前请求的菜单是否在菜单列表中
    const findInfo = (menuList) => {
      menuList.forEach((item) => {
        if (item.key === path) {
          permisson = true;
        }
        if (item.children) {
          // 递归继续查找
          findInfo(item.children);
        }
      });
    };
    // 调用函数
    findInfo(menus);
  }

  return permisson;
};
