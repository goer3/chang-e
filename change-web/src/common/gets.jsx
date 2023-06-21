import { GetCityListByProvinceIdAPI } from './request-api.jsx';

////////////////////////////////////////////////////////////
// 根据省份获取城市数据
////////////////////////////////////////////////////////////
export const GetCityListByProvinceIdHandle = (id) => {
  // 请求接口获取数据
  async function GetCityListHandle() {
    const res = await GetCityListByProvinceIdAPI(id);
    if (res.code !== 200) {
      message.error('获取城市信息失败');
      return null;
    }
    return res.data.list;
  }

  return GetCityListHandle();
};
