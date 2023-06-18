import React, { useEffect, useState } from 'react';
import { Space, Col, Row, Button, Modal, Dropdown, DatePicker } from 'antd';
import { DownloadOutlined, DownOutlined, UploadOutlined, UserAddOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, Input, Select, message, Upload } from 'antd';
const { Option } = Select;
const { Dragger } = Upload;
import { useSnapshot } from 'valtio';
import { UsersStates } from '../../../store/users';
import { ValidatePhone } from '../../common/validate';
import { GetCitiesDataByProvinceId, GetProvinceData } from '../../common/data';

//////////////////////////////////////////////////////////////////
// 用户批量操作
//////////////////////////////////////////////////////////////////
const UserMultiHandleItems = [
  {
    label: '锁定选中用户',
    key: '1',
  },
  {
    label: '解锁选中用户',
    key: '2',
  },
  {
    label: '激活选中用户',
    key: '3',
  },
  {
    label: '删除选中用户',
    key: '4',
  },
];

const UserMultiHandle = (e) => {
  console.log('数据：', e);
};

const UserMultiHandleProps = {
  items: UserMultiHandleItems,
  onClick: UserMultiHandle,
};

// 按钮组
export const UserManagementBtnGroup = () => {
  return (
    <>
      {/* 按钮组定义 */}
      <Row style={{ marginBottom: '10px' }}>
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => {
              UsersStates.addUserFormOpen = true;
            }}
            icon={<UserAddOutlined />}
            className="admin-ant-btn">
            新建用户
          </Button>
          <Button
            onClick={() => {
              UsersStates.importUserOpen = true;
            }}
            icon={<UploadOutlined />}
            className="admin-ant-btn">
            导入用户
          </Button>
        </Col>
        <Col span={12} className="align-right">
          <Button icon={<DownloadOutlined />} className="admin-ant-btn">
            下载模板
          </Button>

          <Dropdown menu={UserMultiHandleProps}>
            <Button danger className="admin-ant-btn admin-ant-btn-last">
              <Space>
                <DownOutlined />
                批量操作
              </Space>
            </Button>
          </Dropdown>
        </Col>
      </Row>

      {/* 新建用户 */}
      <AddUserForm />

      {/* 导入用户 */}
      <ImportUserByFile />
    </>
  );
};

// 添加用户表单
const AddUserForm = () => {
  // 全局状态
  const { addUserFormOpen, provinces, roles } = useSnapshot(UsersStates);

  // 联动城市数据
  const [officeCities, setOfficeCities] = useState([]);
  const [nativeCities, setNativeCities] = useState([]);

  // 添加用户表单
  const [form] = Form.useForm();

  const CreateUserHandle = (values) => {
    console.log(': ', values);
  };

  return (
    <>
      <Modal
        title="创建用户"
        open={addUserFormOpen}
        onOk={CreateUserHandle}
        onCancel={() => {
          UsersStates.addUserFormOpen = false;
        }}
        maskClosable={false}
        footer={null}
        width={650}>
        <Form form={form} name="user_add" onFinish={CreateUserHandle} layout="vertical">
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
                name="phone"
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
                  <Option value="1" label="是">
                    是
                  </Option>
                  <Option value="0" label="否">
                    否
                  </Option>
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
                    GetCitiesDataByProvinceId(id).then((val) => setOfficeCities(val));
                  }}>
                  {provinces.map((item) => (
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
                    GetCitiesDataByProvinceId(id).then((val) => setNativeCities(val));
                  }}>
                  {provinces.map((item) => (
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
                  <Option value="1" label="是">
                    是
                  </Option>
                  <Option value="0" label="否">
                    否
                  </Option>
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
    </>
  );
};

// 导入用户
const ImportUserByFile = () => {
  // 全局状态
  const { importUserOpen } = useSnapshot(UsersStates);
  return (
    <>
      <Modal
        title="导入用户"
        open={importUserOpen}
        // onOk={CreateUserHandle}
        onCancel={() => {
          UsersStates.importUserOpen = false;
        }}
        maskClosable={false}
        footer={null}
        width={400}>
        <Form>
          <Form.Item name="files" valuePropName="fileList">
            <Dragger multiple={false}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或者拖拽文件到这里进行上传导入</p>
            </Dragger>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="admin-ant-btn" block>
              导入用户
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
