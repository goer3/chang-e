import { message } from 'antd';
import { ProvinceListAPI, CitiesListAPI, RoleListAPI } from '../../service';

// 获取省份数据
export const GetProvinceData = () => {
  let provinces = sessionStorage.getItem('provinces');
  if (provinces) {
    return JSON.parse(provinces);
  }
  // 请求接口获取数据
  async function GetProvinceList() {
    const res = await ProvinceListAPI();
    if (res.code != 200) {
      message.error('获取省份信息失败');
      return null;
    }

    // 缓存
    sessionStorage.setItem('provinces', JSON.stringify(res.data.list));
    return res.data.list;
  }
  return GetProvinceList();
};

// 获取城市数据
export const GetCitiesDataByProvinceId = (id) => {
  // 请求接口获取数据
  async function GetCitiesList() {
    const res = await CitiesListAPI(id);
    if (res.code != 200) {
      message.error('获取城市信息失败');
      return null;
    }
    return res.data.list;
  }
  return GetCitiesList();
};

// 获取所有角色数据
export const GetAllRoleData = () => {
  // 请求接口获取数据
  async function GetRoleList() {
    const res = await RoleListAPI();
    if (res.code != 200) {
      message.error('获取角色信息失败');
      return null;
    }
    return res.data.list;
  }
  return GetRoleList();
};
