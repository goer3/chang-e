import React from 'react';
import { Alert } from 'antd';
import { CloseTipsHandle } from '../../../common/tips.jsx';
import RolesManagementTips from './roles-tips';
import UserManagementSearch from '../users/users-search.jsx';

////////////////////////////////////////////////////////////
// 角色管理
////////////////////////////////////////////////////////////
const RolesManagement = () => {
  return (
    <>
      {/*提示信息*/}
      <div id="id-tips" className="admin-header-alert">
        <Alert description={<RolesManagementTips />} type="info" showIcon closable onClose={CloseTipsHandle} />
      </div>

      {/*搜索*/}
      <div className="admin-search"></div>

      {/*主体*/}
      <div className="admin-layout-content"></div>
    </>
  );
};

export default RolesManagement;
