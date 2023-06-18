import React from 'react';
import { Alert } from 'antd';
import { AlertMessageCloseHandle } from '../../common/alert-message.jsx';
import { UserManagementAlertMessage } from './users-alert.jsx';
import { UserManagementSearchForm } from './users-search.jsx';
import { UserManagementList } from './users-list.jsx';
import { UsersStates } from '../../../store/users.jsx';
import { GetAllDepartmentData, GetAllRoleData, GetProvinceData } from '../../common/data.jsx';

// 用户管理
const UserManagement = () => {
  // 保存省份列表
  UsersStates.provinces = GetProvinceData();
  // 保存角色列表
  UsersStates.roles = GetAllRoleData();
  // 保存部门列表
  UsersStates.departments = GetAllDepartmentData();

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
