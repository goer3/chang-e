import React from 'react';
import { Alert } from 'antd';
import { UserManagementAlertMessage } from './alert_message.jsx';
import { AlertMessageCloseHandle } from '../../common/alert_message.jsx';
import { UserManagementSearchForm } from './search.jsx';
import { UserManagementList } from './list.jsx';

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
      <UserManagementList />
    </>
  );
};

export default UserManagement;
