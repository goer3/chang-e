import React from 'react';
import { Alert } from 'antd';
import { CloseTipsHandle } from '../../../common/tips.jsx';
import UserManagementTips from './users-tips.jsx';
import UserManagementSearch from './users-search.jsx';

////////////////////////////////////////////////////////////
// 用户管理
////////////////////////////////////////////////////////////
const UsersManagement = () => {
  return (
    <>
      {/*提示信息*/}
      <div id="id-tips" className="admin-header-alert">
        <Alert description={<UserManagementTips />} type="info" showIcon closable onClose={CloseTipsHandle} />
      </div>

      {/*搜索*/}
      <div className="admin-search">
        <UserManagementSearch />
      </div>

      {/*/!*用户列表*!/*/}
      {/*<div className="admin-layout-content">*/}
      {/*  <UserManagementList />*/}
      {/*</div>*/}
    </>
  );
};

export default UsersManagement;
