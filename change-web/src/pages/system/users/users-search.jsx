import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSnapshot } from 'valtio';
import { RegionStates } from '../../../store/store-regions.jsx';
import { DepartmentStates } from '../../../store/store-departments.jsx';
import { RoleStates } from '../../../store/store-roles.jsx';
import { GetCityListByProvinceIdAPI } from '../../../common/request-api.jsx';
import { UserStates } from '../../../store/store-users.jsx';

const { Option } = Select;

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
// 获取城市数据
////////////////////////////////////////////////////////////
const getCityListByProvinceIdHandle = (id) => {
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

////////////////////////////////////////////////////////////
// 生成搜索表单
////////////////////////////////////////////////////////////
const generateUserSearchForm = () => {
  // 全局状态信息
  const { Provinces } = useSnapshot(RegionStates); // 地区信息
  const { Departments } = useSnapshot(DepartmentStates); // 部门信息
  const { Roles } = useSnapshot(RoleStates); // 角色信息
  const { UserSearchExpand } = useSnapshot(UserStates); // 用户信息

  // 联动城市数据
  const [searchOfficeCities, setSearchOfficeCities] = useState([]);
  const [searchNativeCities, setSearchNativeCities] = useState([]);

  // 是否展开更多搜索框
  const [expand, setExpand] = useState(false);

  // 默认显示的搜索框数量
  let count = 7;

  // 如果用户展开了更多搜索，则为定义的搜索列表长度
  if (UserSearchExpand) {
    count = searchFields.length;
  }

  // 用于存储传递给表单的数据
  const children = [];

  // 遍历生成搜索框数据
  for (let i = 0; i < count; i++) {
    // 每项数据和唯一的 Key
    let item = searchFields[i];
    let key = 'search-' + i;

    // 输入提示信息，Placeholder
    let tp = '通过输入' + item.label + '进行搜索';
    let sp = '通过选择' + item.label + '进行搜索';

    // 生成搜索框，并保存起来
    children.push(
      <Col span={6} key={key}>
        <Form.Item name={item.name} label={item.label} colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          {/* Select 数据需要根据实际选择 */}
          {item.name === 'gender' ? (
            // 性别
            <Select initialvalues="1" placeholder={sp}>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
              <Option value="3">未知</Option>
            </Select>
          ) : item.name === 'active' ? (
            // 激活
            <Select initialvalues="1" placeholder={sp}>
              <Option value="0">未激活</Option>
              <Option value="1">已激活</Option>
            </Select>
          ) : item.name === 'unlocked' ? (
            // 锁定
            <Select initialvalues="1" placeholder={sp}>
              <Option value="0">已锁定</Option>
              <Option value="1">未锁定</Option>
            </Select>
          ) : item.name === 'system_roles_id' ? (
            // 角色
            <Select
              placeholder={sp}
              showSearch={true}
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
              {Roles.map((item) => (
                <Select.Option key={item.id} label={item.name} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : item.name === 'system_departments_id' ? (
            // 部门
            <Select
              placeholder={sp}
              showSearch={true}
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
              {Departments.map((item) => (
                <Select.Option key={item.id} label={item.name} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : item.name === 'office_province_id' ? (
            // 办公省份
            <Select
              placeholder={sp}
              showSearch={true}
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
              onChange={(id) => {
                getCityListByProvinceIdHandle(id).then((val) => setSearchOfficeCities(val));
              }}>
              {Provinces.map((item) => (
                <Select.Option key={item.id} label={item.name} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : item.name === 'office_city_id' ? (
            // 办公城市
            <Select
              placeholder={sp}
              showSearch={true}
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
              {searchOfficeCities.map((item) => (
                <Select.Option key={item.id} label={item.name} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : item.name === 'native_province_id' ? (
            // 籍贯省份
            <Select
              placeholder={sp}
              showSearch={true}
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
              onChange={(id) => {
                getCityListByProvinceIdHandle(id).then((val) => setSearchNativeCities(val));
              }}>
              {Provinces.map((item) => (
                <Select.Option key={item.id} label={item.name} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : item.name === 'native_city_id' ? (
            // 籍贯城市
            <Select
              placeholder={sp}
              showSearch={true}
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
              {searchNativeCities.map((item) => (
                <Select.Option key={item.id} label={item.name} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            // 默认
            <Input placeholder={tp} />
          )}
        </Form.Item>
      </Col>
    );
  }

  return children;
};

////////////////////////////////////////////////////////////
// 用户搜索
////////////////////////////////////////////////////////////
const UserManagementSearch = () => {
  const [form] = Form.useForm();

  // 全局状态
  const { UserSearchExpand } = useSnapshot(UserStates); // 用户信息

  // 搜索处理函数
  const searchUserListHandle = (values) => {
    console.log('搜索数据: ', values);
  };

  return (
    <Form form={form} name="users-search" onFinish={searchUserListHandle}>
      <Row gutter={24}>
        {/*搜索框*/}
        {generateUserSearchForm()}
        {/*搜索按钮*/}
        <Col span={6} key="search-submit" className="admin-submit-info align-right">
          <Button type="primary" htmlType="submit" className="admin-ant-btn">
            搜索用户
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
            className="admin-ant-btn">
            清空条件
          </Button>
          <a
            onClick={() => {
              UserStates.UserSearchExpand = !UserSearchExpand;
            }}>
            {UserSearchExpand ? <UpOutlined /> : <DownOutlined />}
            {UserSearchExpand ? ' 收起选项' : ' 更多选项'}
          </a>
        </Col>
      </Row>
    </Form>
  );
};

export default UserManagementSearch;
