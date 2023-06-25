import React from 'react';

////////////////////////////////////////////////////////////
// 用户 Header 提示信息
////////////////////////////////////////////////////////////
const UserManagementTips = () => {
  return (
    <>
      <span>用户管理相关事项说明：</span>
      <ol className="admin-page-header-list">
        <li>管理用户可以对用户进行：搜索查看，新增创建，编辑修改，禁用启用，锁定解锁，删除等操作。</li>
        <li>删除用户后，用户在数据库中依然存在，默认删除属于软删除，想要找回可以联系管理员。</li>
      </ol>
    </>
  );
};

export default UserManagementTips;
