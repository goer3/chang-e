import React from 'react';

const MenusManagementTips = () => {
  return (
    <>
      <span>菜单管理相关事项说明：</span>
      <ol className="admin-page-header-list">
        <li>管理用户可以对菜单进行：新增创建，编辑修改，删除等操作。</li>
        <li>删除菜单后菜单在数据中库依然存在，默认删除属于软删除，想要找回可以联系管理员。</li>
      </ol>
    </>
  );
};

export default MenusManagementTips;
