import React from 'react';

////////////////////////////////////////////////////////////
// 可供搜索的字段
////////////////////////////////////////////////////////////
const searchFields = [
  { name: 'username', label: '用户名', type: 'text' },
  { name: 'name', label: '姓名', type: 'text' },
  { name: 'mobile', label: '手机号', type: 'text' },
  { name: 'email', label: '邮箱', type: 'text' },
  { name: 'job_number', label: '工号', type: 'text' },
  { name: 'system_roles_id', label: '角色', type: 'select' },
  { name: 'job_name', label: '岗位名称', type: 'text' },
  { name: 'system_departments_id', label: '部门名称', type: 'select' },
  { name: 'native_province_id', label: '籍贯省份', type: 'select' },
  { name: 'native_city_id', label: '籍贯城市', type: 'select' },
  { name: 'active', label: '激活状态', type: 'select' },
  { name: 'unlocked', label: '锁定状态', type: 'select' },
  { name: 'gender', label: '性别', type: 'select' },
  { name: 'creator', label: '创建人', type: 'text' },
  { name: 'entry_time', label: '入职时间', type: 'select' },
  { name: 'birthday', label: '出生日期', type: 'select' },
  { name: 'office_province_id', label: '办公省份', type: 'select' },
  { name: 'office_city_id', label: '办公城市', type: 'select' },
  { name: 'office_address', label: '办公地点', type: 'text' },
];

////////////////////////////////////////////////////////////
// 生成搜索表单
////////////////////////////////////////////////////////////
const generateUserSearchForm = () => {};

////////////////////////////////////////////////////////////
// 用户搜索
////////////////////////////////////////////////////////////
const UserManagementSearch = () => {
  return <div>users-search</div>;
};

export default UserManagementSearch;
