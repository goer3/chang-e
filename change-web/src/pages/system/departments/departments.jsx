import React from 'react';
import { Alert, Col, Row } from 'antd';
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

      {/*主体内容*/}
      <Row>
        <Col span={8}>
          <div className="admin-tree-box">111</div>
        </Col>
        <Col span={16}>
          <div className="admin-tree-box">222</div>
        </Col>
      </Row>
    </>
  );
};

export default DepartmentsManagement;
