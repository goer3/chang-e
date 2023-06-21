import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { CloseTipsHandle } from '../../../common/tips.jsx';
import UserManagementTips from './users-tips.jsx';
import UserManagementSearch from './users-search.jsx';
import { RegionStates } from '../../../store/store-regions.jsx';
import { GetDepartmentListAPI, GetProvinceListAPI, GetRoleListAPI } from '../../../common/request-api.jsx';
import { RoleStates } from '../../../store/store-roles.jsx';
import { DepartmentStates } from '../../../store/store-departments.jsx';

////////////////////////////////////////////////////////////
// 用户管理
////////////////////////////////////////////////////////////
const UsersManagement = () => {
  // 获取省份数据
  useEffect(() => {
    // 先判断本地是否缓存身份信息
    let provinces = sessionStorage.getItem('provinces');
    if (provinces) {
      RegionStates.Provinces = JSON.parse(provinces);
      return;
    }

    // 缓存不存在，则请求后端接口获取
    const GetProvinceListHandle = async () => {
      const res = await GetProvinceListAPI();
      if (res.code !== 200) {
        message.error('获取省份信息失败');
        return;
      }

      // 存缓存和全局数据
      sessionStorage.setItem('provinces', JSON.stringify(res.data.list));
      RegionStates.Provinces = res.data.list;
    };
    GetProvinceListHandle();
  }, []);

  // 获取部门数据
  useEffect(() => {
    // 请求后端接口获取
    const GetDepartmentListHandle = async () => {
      const res = await GetDepartmentListAPI();
      if (res.code !== 200) {
        message.error('获取部门信息失败');
        return;
      }

      // 存全局数据
      DepartmentStates.Departments = res.data.list;
    };
    GetDepartmentListHandle();
  }, []);

  // 获取角色数据
  useEffect(() => {
    // 请求后端接口获取
    const GetRoleListHandle = async () => {
      const res = await GetRoleListAPI();
      if (res.code !== 200) {
        message.error('获取角色信息失败');
        return;
      }

      // 存全局数据
      RoleStates.Roles = res.data.list;
    };
    GetRoleListHandle();
  }, []);

  return (
    <>
      {/*提示信息*/}
      <div id="id-tips" className="admin-header-alert">
        <Alert description={<UserManagementTips />} type="info" showIcon closable onClose={CloseTipsHandle} />
      </div>

      {/*搜索*/}
      <div className="admin-search">
        <UserManagementSearch />
      </div>

      {/*/!*用户列表*!/*/}
      {/*<div className="admin-layout-content">*/}
      {/*  <UserManagementList />*/}
      {/*</div>*/}
    </>
  );
};

export default UsersManagement;
