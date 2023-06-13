import React, { useEffect, useState } from 'react';
import { Table, Avatar, Badge, Space, Descriptions, Tag, Form, Col, Input, Select, Row, Button, Dropdown, Alert } from 'antd';

const { Option } = Select;
import { DownloadOutlined, DownOutlined, UploadOutlined, UpOutlined, UserAddOutlined } from '@ant-design/icons';
import { UserListAPI } from '../../service';

const SystemUsers = () => {
  // 获取用户列表
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 异步请求用户列表
  useEffect(() => {
    // 获取用户列表
    async function GetUserList() {
      const res = await UserListAPI();
      if (res.code === 200) {
        // 获取用户
        setUserList(res.data.list);
        setIsLoading(false);
      }
    }

    GetUserList();
  }, []);

  // 是否展开其它搜索字段
  const [otherSearchExpand, setOtherSearchExpand] = useState(false);
  // 表单
  const [form] = Form.useForm();

  const searchUsersHandle = (values) => {
    console.log('数据: ', values);
  };

  // 获取搜索框
  const getSearchFields = () => {
    // 默认显示的搜索框数量
    let displaySearchNumber = 7;
    if (otherSearchExpand) {
      displaySearchNumber = searchFields.length;
    }

    // 表单
    const children = [];
    // 遍历生成搜索框数据
    for (let i = 0; i < displaySearchNumber; i++) {
      let item = searchFields[i];
      let key = 'search-' + i;

      // placeholder
      let textPlaceholder = '请输入' + item.label;
      let selectPlaceholder = '请选择' + item.label;

      // 生成搜索框
      children.push(
        <Col span={6} key={key}>
          <Form.Item name={item.name} label={item.label} colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            {item.type === 'text' ? (
              <Input placeholder={textPlaceholder} />
            ) : item.name === 'gender' ? (
              <Select initialvalues="1" placeholder={selectPlaceholder}>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
                <Option value="3">未知</Option>
              </Select>
            ) : item.name === 'active' ? (
              <Select initialvalues="1" placeholder={selectPlaceholder}>
                <Option value="0">未激活</Option>
                <Option value="1">已激活</Option>
              </Select>
            ) : item.name === 'unlocked' ? (
              <Select initialvalues="1" placeholder={selectPlaceholder}>
                <Option value="0">已锁定</Option>
                <Option value="1">未锁定</Option>
              </Select>
            ) : (
              <Input placeholder={textPlaceholder} />
            )}
          </Form.Item>
        </Col>
      );
    }

    // 搜索按钮
    children.push(
      <Col
        span={6}
        style={{
          textAlign: 'right',
        }}
        key="searchSubmit"
        className="admin-submit-info">
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
            setOtherSearchExpand(!otherSearchExpand);
          }}>
          {otherSearchExpand ? <UpOutlined /> : <DownOutlined />}
          {otherSearchExpand ? ' 收起选项' : ' 更多选项'}
        </a>
      </Col>
    );

    return children;
  };

  // 表格列定义
  const userListColumns = [
    Table.EXPAND_COLUMN,
    Table.SELECTION_COLUMN,
    {
      title: '用户',
      dataIndex: 'avatar',
      width: '60px',
      align: 'center',
      render: (text) => <Avatar src={text} size={18} />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: '60px',
      render: (gender) =>
        gender === 1 ? <Tag color="blue">男</Tag> : gender === 2 ? <Tag color="magenta">女</Tag> : <Tag color="green">未知</Tag>,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '工号',
      dataIndex: 'job_number',
    },
    {
      title: '部门',
      dataIndex: ['system_department', 'name'],
    },
    {
      title: '职位',
      dataIndex: 'job_name',
    },
    {
      title: '角色',
      // dataIndex: ['system_role', 'name'],
      render: (record) =>
        record.system_role.keyword === 'Administrator' ? (
          <Tag color="red">
            {record.system_role.name} / {record.system_role.keyword}
          </Tag>
        ) : (
          <Tag className="admin-gray-tag">
            {record.system_role.name} / {record.system_role.keyword}
          </Tag>
        ),
    },
    {
      title: '激活',
      dataIndex: 'active',
      align: 'center',
      render: (active) => (active === 1 ? <Badge status="success" /> : <Badge status="error" />),
    },
    {
      title: '锁定',
      dataIndex: 'unlocked',
      align: 'center',
      render: (unlocked) => (unlocked === 1 ? <Badge status="success" /> : <Badge status="error" />),
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <a>修改</a>
          <a>禁用</a>
          <a>锁定</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div id="id-alertMessage" className="admin-header-alert">
        <Alert description={<AlertMessage />} type="info" showIcon closable onClose={closeAlertMessage} />
      </div>

      <div className="admin-search">
        <Form form={form} name="users_search" onFinish={searchUsersHandle}>
          <Row gutter={24}>{getSearchFields()}</Row>
        </Form>
      </div>
      <div className="admin-layout-content">
        <Row style={{ marginBottom: '10px' }}>
          <Col span={12}>
            <Button type="primary" icon={<UserAddOutlined />} className="admin-ant-btn">
              新建用户
            </Button>
            <Button icon={<UploadOutlined />} className="admin-ant-btn">
              导入用户
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button icon={<DownloadOutlined />} className="admin-ant-btn">
              下载模板
            </Button>

            <Dropdown menu={multiUserHandleProps}>
              <Button danger className="admin-ant-btn admin-ant-btn-last">
                <Space>
                  <DownOutlined />
                  批量操作
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
        {/*数据*/}
        {isLoading ? (
          <div>正在加载中...</div>
        ) : userList.length === 0 ? (
          <div>暂无数据</div>
        ) : (
          <>
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="admin-list-expand-content">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="用户账户">{record.username}</Descriptions.Item>
                      <Descriptions.Item label="用户籍贯">
                        {record.native_province.name} - {record.native_city.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="办公城市">{record.office_city.name}</Descriptions.Item>
                      <Descriptions.Item label="办公地点">{record.work_address}</Descriptions.Item>
                      <Descriptions.Item label="入职时间">{record.entry_time}</Descriptions.Item>
                      <Descriptions.Item label="用户生日">{record.birthday}</Descriptions.Item>
                      <Descriptions.Item label="创建时间">{record.created_at}</Descriptions.Item>
                      <Descriptions.Item label="最后登录">{record.last_login}</Descriptions.Item>
                    </Descriptions>
                  </div>
                ),
                // rowExpandable: (record) => record.username !== 'Not Expandable',
              }}
              columns={userListColumns}
              dataSource={userList}
              bordered
              rowKey="id"
              size="small"
            />
          </>
        )}
      </div>
    </>
  );
};

export default SystemUsers;

////////////////////////////////////////////////////////////////////////////////////////////////
// 表格的列定义
////////////////////////////////////////////////////////////////////////////////////////////////

// 选中
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.username === 'change',
    username: record.username,
  }),
};

////////////////////////////////////////////////////////////////////////////////////////////////
// 搜索栏
////////////////////////////////////////////////////////////////////////////////////////////////
const searchFields = [
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
  { name: 'office_city', label: '办公城市', type: 'text' },
  { name: 'office_address', label: '办公地点', type: 'text' },
  { name: 'native_province_name', label: '籍贯省份', type: 'text' },
  { name: 'native_province_city', label: '籍贯城市', type: 'text' },
];

// 批量修改用户
const multiUserHandleItems = [
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

const multiUserHandle = (e) => {
  console.log('数据：', e);
};

const multiUserHandleProps = {
  items: multiUserHandleItems,
  onClick: multiUserHandle,
};

// 提示信息
const AlertMessage = () => {
  return (
    <>
      <span>用户管理相关事项说明：</span>
      <ol className="admin-page-header-list">
        <li>管理用户可以对用户进行：搜索查看，新增创建，编辑修改，禁用启用，锁定解锁，删除等操作。</li>
        <li>删除用户后用户在数据中库依然存在，默认删除属于软删除，想要找回可以联系管理员。</li>
      </ol>
    </>
  );
};

// 提示信息关闭样式修改
const closeAlertMessage = () => {
  document.getElementById('id-alertMessage').style.padding = 0;
};
