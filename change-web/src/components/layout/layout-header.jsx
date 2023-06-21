import React from 'react';
import { Avatar, Dropdown, Layout, message } from 'antd';
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined, MoreOutlined } from '@ant-design/icons';
import { useSnapshot } from 'valtio';
import { LayoutStates } from '../../store/store-layout.jsx';
import { UserStates } from '../../store/store-users.jsx';

// 顶部导航
const AdminLayoutHeader = () => {
  const { CurrentUserInfo } = useSnapshot(UserStates); // 用户信息
  const { MenuSiderCollapsed } = useSnapshot(LayoutStates); // Layout 信息

  return (
    <Header className="admin-background" style={{ zIndex: 5 }}>
      {React.createElement(MenuSiderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'admin-trigger',
        onClick: () => (LayoutStates.MenuSiderCollapsed = !MenuSiderCollapsed),
      })}

      <div style={{ float: 'right' }}>
        <Dropdown
          menu={{ items }}
          overlayStyle={{
            padding: 15,
          }}>
          <a className="admin-header-dropdown" onClick={(e) => e.preventDefault()}>
            <Avatar size={25} src={CurrentUserInfo?.avatar} style={{ top: -2 }} />
            <span className="admin-avatar-name">{CurrentUserInfo?.name}</span>
            <MoreOutlined className="admin-avatar-more" />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminLayoutHeader;

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
