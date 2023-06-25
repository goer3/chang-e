import React from 'react';

const RolesManagementTips = () => {
  return (
    <>
      <span>角色管理相关事项说明：</span>
      <ol className="admin-page-header-list">
        <li>管理用户可以对角色进行：新增创建，编辑修改，权限分配，删除等操作。</li>
        <li>删除角色后，角色在数据库中依然存在，默认删除属于软删除，想要找回可以联系管理员。</li>
      </ol>
    </>
  );
};

export default RolesManagementTips;
