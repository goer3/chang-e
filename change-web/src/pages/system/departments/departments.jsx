import React from 'react';
import { Alert } from 'antd';
import { CloseTipsHandle } from '../../../common/tips.jsx';
import DepartmentsManagementTips from './departments-tips';

////////////////////////////////////////////////////////////
// 部门管理
////////////////////////////////////////////////////////////
const DepartmentsManagement = () => {
  return (
    <>
      {/*提示信息*/}
      <div id="id-tips" className="admin-header-alert">
        <Alert description={<DepartmentsManagementTips />} type="info" showIcon closable onClose={CloseTipsHandle} />
      </div>
    </>
  );
};

export default DepartmentsManagement;
