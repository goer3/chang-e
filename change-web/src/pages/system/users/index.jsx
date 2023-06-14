import React from 'react';
import { Alert } from 'antd';
import { UserManagementAlertMessage } from './users-alert.jsx';
import { AlertMessageCloseHandle } from '../../common/alert-message.jsx';
import { UserManagementSearchForm } from './users-search.jsx';
import { UserManagementList } from './users-list.jsx';

// 用户管理
const UserManagement = () => {
  return (
    <>
      {/*提示信息*/}
      <div id="id-alert-message" className="admin-header-alert">
        <Alert description={<UserManagementAlertMessage />} type="info" showIcon closable onClose={AlertMessageCloseHandle} />
      </div>
      {/*搜索*/}
      <div className="admin-search">
        <UserManagementSearchForm />
      </div>

      {/*用户列表*/}
      <div className="admin-layout-content">
        <UserManagementList />
      </div>
    </>
  );
};

export default UserManagement;
