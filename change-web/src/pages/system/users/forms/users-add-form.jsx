import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd';
import { useSnapshot } from 'valtio';
import { UserStates } from '../../../../store/store-users.jsx';
import { RegionStates } from '../../../../store/store-regions.jsx';
import { DepartmentStates } from '../../../../store/store-departments.jsx';
import { RoleStates } from '../../../../store/store-roles.jsx';
import { GetCityListByProvinceIdHandle } from '../../../../common/gets.jsx';
import { ValidatePhone } from '../../../../utils/validator.jsx';
import { CreateUserAPI } from '../../../../common/request-api.jsx';
const { Option } = Select;

////////////////////////////////////////////////////////////
// 创建用户方法
////////////////////////////////////////////////////////////
const createUserHandle = (values) => {
  // console.log('创建用户数据: ', values);
  // 对传输的数据进行处理
  values.entry_time = values.entry_time.format('YYYY-MM-DD HH:mm:ss');
  values.birthday = values.birthday.format('YYYY-MM-DD HH:mm:ss');

  // 请求接口创建数据
  const res = CreateUserAPI(values);
  res.then((v) => {
    if (v.code !== 200) {
      message.error(v.message);
    } else {
      const s = '用户' + values.name + '创建成功';
      message.success(s);
      location.reload();
    }
  });
};

////////////////////////////////////////////////////////////
// 添加用户表单
////////////////////////////////////////////////////////////
const UsersManagementAddForm = () => {
  const [form] = Form.useForm();

  // 全局状态
  const { UserAddModelOpen } = useSnapshot(UserStates);
  const { Provinces } = useSnapshot(RegionStates);
  const { Departments } = useSnapshot(DepartmentStates);
  const { Roles } = useSnapshot(RoleStates);

  // 联动城市数据
  const [officeCities, setOfficeCities] = useState([]);
  const [nativeCities, setNativeCities] = useState([]);

  return (
    <Modal
      title="创建用户"
      open={UserAddModelOpen}
      // onOk={() => {}}
      onCancel={() => {
        UserStates.UserAddModelOpen = false;
      }}
      maskClosable={false}
      footer={null}
      width={650}>
      <Form form={form} name="user-add" onFinish={createUserHandle} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="用户姓名"
              rules={[
                {
                  required: true,
                  message: '请输入用户姓名!',
                },
                {
                  max: 20,
                  min: 2,
                  message: '用户姓名长度不合法!',
                },
              ]}>
              <Input placeholder="请输入用户姓名" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="gender"
              label="用户性别"
              rules={[
                {
                  required: true,
                  message: '请选择用户性别!',
                },
              ]}>
              <Select placeholder="请选择用户性别">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
                <Option value="3">未知</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="mobile"
              label="手机号码"
              rules={[
                {
                  required: true,
                  message: '请输入用户手机号!',
                },
                { validator: ValidatePhone },
              ]}>
              <Input placeholder="请输入用户手机号" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="email"
              label="邮箱地址"
              rules={[
                {
                  type: 'email',
                  message: '请输入合法邮箱地址!',
                },
                {
                  required: true,
                  message: '请输入用户邮箱!',
                },
              ]}>
              <Input placeholder="请输入用户邮箱" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="birthday"
              label="出生日期"
              rules={[
                {
                  required: true,
                  message: '请选择用户生日!',
                },
              ]}>
              <DatePicker placeholder="请选择用户生日" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="entry_time"
              label="入职日期"
              rules={[
                {
                  required: true,
                  message: '请选择用户入职时间!',
                },
              ]}>
              <DatePicker placeholder="请选择用户入职时间" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="job_number"
              label="用户工号"
              rules={[
                {
                  required: true,
                  message: '请输入用户工号!',
                },
              ]}>
              <Input placeholder="请输入用户工号" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="job_name"
              label="岗位名称"
              rules={[
                {
                  required: true,
                  message: '请输入用户岗位名称!',
                },
              ]}>
              <Input placeholder="请输入用户岗位名称" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="system_department_id"
              label="所属部门"
              rules={[
                {
                  required: true,
                  message: '请选择用户所属部门!',
                },
              ]}>
              <Select
                placeholder="请选择用户所属部门"
                showSearch={true}
                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
                {Departments.map((item) => (
                  <Select.Option key={item.id} label={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="office_province_id"
              label="工作省份"
              rules={[
                {
                  required: true,
                  message: '请选择用户工作省份!',
                },
              ]}>
              <Select
                placeholder="请选择用户工作省份"
                showSearch={true}
                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                onChange={(id) => {
                  GetCityListByProvinceIdHandle(id).then((val) => setOfficeCities(val));
                }}>
                {Provinces.map((item) => (
                  <Select.Option key={item.id} label={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="office_city_id"
              label="工作城市"
              rules={[
                {
                  required: true,
                  message: '请选择用户工作城市!',
                },
              ]}>
              <Select
                placeholder="请先选择用户工作省份"
                showSearch={true}
                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
                {officeCities.map((item) => (
                  <Select.Option key={item.id} label={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="office_address"
              label="工作地址"
              rules={[
                {
                  required: true,
                  message: '请输入用户工作地址!',
                },
              ]}>
              <Input placeholder="请输入用户工作地址" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="native_province_id"
              label="籍贯省份"
              rules={[
                {
                  required: true,
                  message: '请选择用户籍贯省份!',
                },
              ]}>
              <Select
                placeholder="请选择用户籍贯省份"
                showSearch={true}
                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                onChange={(id) => {
                  GetCityListByProvinceIdHandle(id).then((val) => setNativeCities(val));
                }}>
                {Provinces.map((item) => (
                  <Select.Option key={item.id} label={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="native_city_id"
              label="籍贯城市"
              rules={[
                {
                  required: true,
                  message: '请选择用户籍贯城市!',
                },
              ]}>
              <Select
                placeholder="请先选择用户籍贯省份"
                showSearch={true}
                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
                {nativeCities.map((item) => (
                  <Select.Option key={item.id} label={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="leader"
              label="部门领导"
              rules={[
                {
                  required: true,
                  message: '请选择用户是否是领导!',
                },
              ]}>
              <Select placeholder="请选择用户是否是领导">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="system_role_id"
              label="隶属角色"
              rules={[
                {
                  required: true,
                  message: '请选择用户角色!',
                },
              ]}>
              <Select
                placeholder="请选择用户角色"
                showSearch={true}
                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}>
                {Roles.map((item) => (
                  <Select.Option key={item.id} label={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className="admin-ant-btn" type="primary" htmlType="submit" block>
            创建用户
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UsersManagementAddForm;
