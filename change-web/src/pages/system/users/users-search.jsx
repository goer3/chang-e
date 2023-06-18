import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { Option } = Select;
import { useSnapshot } from 'valtio';
import { UsersStates } from '../../../store/users';
import { GetCitiesDataByProvinceId } from '../../common/data';

//////////////////////////////////////////////////////////////////
// 搜索栏定义
//////////////////////////////////////////////////////////////////
const SearchFields = [
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

//////////////////////////////////////////////////////////////////
// 生成搜索数据格式
//////////////////////////////////////////////////////////////////
const GetSearchFields = () => {
  // 全局状态
  const { addUserFormOpen, provinces, roles, departments } = useSnapshot(UsersStates);

  // 联动城市数据
  const [searchOfficeCities, setSearchOfficeCities] = useState([]);
  const [searchNativeCities, setSearchNativeCities] = useState([]);

  // 默认显示的搜索框数量
  let num = 7;

  // 是否展开更多搜索框
  const [expand, setExpand] = useState(false);

  // 如果用户展开了更多搜索，则为定义的搜索列表长度
  if (expand) {
    num = SearchFields.length;
  }

  // 用于存储传递给表单的数据
  const children = [];

  // 遍历生成搜索框数据
  for (let i = 0; i < num; i++) {
    // 每项数据和唯一的 Key
    let item = SearchFields[i];
    let key = 'search-' + i;

    // 输入提示信息，Placeholder
    let tp = '通过输入' + item.label + '进行搜索';
    let sp = '通过选择' + item.label + '进行搜索';

    // 生成搜索框，并保存起来
    children.push(
      <Col span={6} key={key}>
        <Form.Item name={item.name} label={item.label} colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          {/*判断搜索类型，特殊字段特殊处理，使用三元表达式*/}
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
              {roles.map((item) => (
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
              {departments.map((item) => (
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
                GetCitiesDataByProvinceId(id).then((val) => setSearchOfficeCities(val));
              }}>
              {provinces.map((item) => (
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
                GetCitiesDataByProvinceId(id).then((val) => setSearchNativeCities(val));
              }}>
              {provinces.map((item) => (
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

  // 搜索按钮
  children.push(
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
          setExpand(!expand);
        }}>
        {expand ? <UpOutlined /> : <DownOutlined />}
        {expand ? ' 收起选项' : ' 更多选项'}
      </a>
    </Col>
  );

  return children;
};

// 用户搜索组件
export const UserManagementSearchForm = () => {
  const [form] = Form.useForm();

  // 搜索处理函数
  const SearchUsersHandle = (values) => {
    console.log('搜索数据: ', values);
  };

  return (
    <>
      <Form form={form} name="users-search" onFinish={SearchUsersHandle}>
        <Row gutter={24}>{GetSearchFields()}</Row>
      </Form>
    </>
  );
};
