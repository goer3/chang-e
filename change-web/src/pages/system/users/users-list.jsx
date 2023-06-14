import React, { useEffect, useState } from 'react';
import { Table, Space, Descriptions, Col, Row, Button, Dropdown, Avatar, Badge, Tag } from 'antd';
import { DownloadOutlined, DownOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { UserListAPI } from '../../../service';

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

//////////////////////////////////////////////////////////////////
// 表格列定义
//////////////////////////////////////////////////////////////////
const UserListColumns = [
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
      record.system_role?.keyword === 'Administrator' ? (
        <Tag color="red">
          {record.system_role?.name} / {record.system_role?.keyword}
        </Tag>
      ) : (
        <Tag className="admin-gray-tag">
          {record.system_role?.name} / {record.system_role?.keyword}
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

//////////////////////////////////////////////////////////////////
// 选中用户行
//////////////////////////////////////////////////////////////////
const UserListRowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.username === 'change',
    username: record.username,
  }),
};

// 用户列表
export const UserManagementList = () => {
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

  return (
    <>
      {/* 按钮组 */}
      <Row style={{ marginBottom: '10px' }}>
        <Col span={12}>
          <Button type="primary" icon={<UserAddOutlined />} className="admin-ant-btn">
            新建用户
          </Button>
          <Button icon={<UploadOutlined />} className="admin-ant-btn">
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
              ...UserListRowSelection,
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
            columns={UserListColumns}
            dataSource={userList}
            bordered
            rowKey="id"
            size="small"
          />
        </>
      )}
    </>
  );
};
