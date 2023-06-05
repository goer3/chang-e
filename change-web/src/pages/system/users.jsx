import React from 'react';
import { PageHeader } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';

const SystemUsers = () => {
  return (
    <>
      <PageHeader className="admin-page-header">
        <div className="admin-page-header-info">
          <div className="admin-page-header-text">
            <QuestionCircleFilled className="tip-icon" />
            <span>可以在该页面对用户进行以下操作：</span>
            <ol className="admin-page-header-list">
              <li>添加用户（新建用户）</li>
              <li>编辑用户：修改用户信息，禁用 / 解禁用户，锁定 / 解锁用户</li>
              <li>删除用户：单个删除用户，批量删除用户（软删除）</li>
              <li>搜索用户：关键字搜索，状态筛选</li>
            </ol>
          </div>
        </div>
      </PageHeader>
      <div className="admin-layout-content">User</div>
    </>
  );
};

export default SystemUsers;
