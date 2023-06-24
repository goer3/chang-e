import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { ValidatePhone } from '../../../../utils/validator.jsx';
import { GetCityListByProvinceIdHandle } from '../../../../common/gets.jsx';
import { useSnapshot } from 'valtio';
import { UserStates } from '../../../../store/store-users.jsx';
import { RegionStates } from '../../../../store/store-regions.jsx';
import { DepartmentStates } from '../../../../store/store-departments.jsx';
import { RoleStates } from '../../../../store/store-roles.jsx';
import Moment from 'moment';

const { Option } = Select;

////////////////////////////////////////////////////////////
// 编辑用户方法
////////////////////////////////////////////////////////////
const editUserHandle = (values) => {
  console.log('编辑用户数据: ', values);
};

////////////////////////////////////////////////////////////
// 用户修改表单
////////////////////////////////////////////////////////////
const UsersManagementEditForm = () => {
  const [form] = Form.useForm();

  // 是否显示用户编辑表单
  const { UserEditModelOpen, EditUserInfo } = useSnapshot(UserStates);
  const { Provinces } = useSnapshot(RegionStates);
  const { Departments } = useSnapshot(DepartmentStates);
  const { Roles } = useSnapshot(RoleStates);

  // 联动城市数据，先初始化
  const [officeCities, setOfficeCities] = useState([]);
  const [nativeCities, setNativeCities] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true); // 是否第一次载入数据，如果是就需要初始化联动数据

  // 判断数据，加入 EditUserInfo 判断的原因在于初始化的时候该值为空会报错
  if (EditUserInfo.office_province_id && firstLoad) {
    GetCityListByProvinceIdHandle(EditUserInfo.office_province_id).then((val) => setOfficeCities(val));
    GetCityListByProvinceIdHandle(EditUserInfo.native_province_id).then((val) => setNativeCities(val));
    setFirstLoad(false); // 避免被初始化数据覆盖
  }

  // 数据回填，注意几个问题：
  // 1. 如果是直接定义的选项，从后端获取的值需要转换成字符串，否则不会选中选项。
  // 2. 如果是动态的选项，则可以直接使用 id 回填。
  // 3. 联动数据需要初始化，但是由于 onChange 的原因，应该设置一个表示来避免初始化数据覆盖 onChange 数据。
  // 4. 日期需要转换成 Moment 对象
  useEffect(() => {
    if (EditUserInfo.office_province_id) {
      let initialValues = { ...EditUserInfo };
      // 修改生日
      initialValues.birthday = Moment(new Date(initialValues.birthday));
      // 修改入职时间
      initialValues.entry_time = Moment(new Date(initialValues.entry_time));
      // 修改性别
      initialValues.gender = String(initialValues.gender);
      // 修改是否领导
      initialValues.leader = String(initialValues.leader);
      form.setFieldsValue(initialValues);
    }
  }, [EditUserInfo]);

  return (
    <Modal
      title="编辑用户"
      open={UserEditModelOpen}
      onCancel={() => {
        UserStates.UserEditModelOpen = false;
        UserStates.EditUserInfo = {};
      }}
      maskClosable={false}
      footer={null}
      width={650}>
      <Form form={form} name="user-edit" onFinish={editUserHandle} layout="vertical">
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
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UsersManagementEditForm;
