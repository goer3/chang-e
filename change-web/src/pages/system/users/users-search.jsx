import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { Option } = Select;

//////////////////////////////////////////////////////////////////
// 搜索栏定义
//////////////////////////////////////////////////////////////////
const SearchFields = [
  { name: 'username', label: '用户名', type: 'text' },
  { name: 'name', label: '姓名', type: 'text' },
  { name: 'mobile', label: '手机号', type: 'text' },
  { name: 'email', label: '邮箱', type: 'text' },
  { name: 'job_number', label: '工号', type: 'text' },
  { name: 'system_roles_name', label: '角色', type: 'select' },
  { name: 'job_name', label: '岗位名称', type: 'text' },
  { name: 'system_departments_name', label: '部门名称', type: 'select' },
  { name: 'active', label: '激活状态', type: 'select' },
  { name: 'unlocked', label: '锁定状态', type: 'select' },
  { name: 'gender', label: '性别', type: 'select' },
  { name: 'office_province', label: '办公省份', type: 'select' },
  { name: 'office_city', label: '办公城市', type: 'select' },
  { name: 'office_address', label: '办公地点', type: 'text' },
  { name: 'native_province_name', label: '籍贯省份', type: 'select' },
  { name: 'native_province_city', label: '籍贯城市', type: 'select' },
  { name: 'creator', label: '创建人', type: 'text' },
  { name: 'entry_time', label: '入职时间', type: 'select' },
  { name: 'birthday', label: '出生日期', type: 'select' },
];

//////////////////////////////////////////////////////////////////
// 生成搜索数据格式
//////////////////////////////////////////////////////////////////
const GetSearchFields = () => {
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
    let tp = '请输入' + item.label;
    let sp = '请选择' + item.label;

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
