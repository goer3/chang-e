import React, { useEffect, useState } from 'react';
import { PageHeader, Table, Avatar, Badge, Space, Descriptions } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
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

  return (
    <>
      <PageHeader className="admin-page-header">
        <div className="admin-page-header-info">
          <div className="admin-page-header-text">
            <QuestionCircleFilled className="tip-icon" />
            <span>可以在该页面对用户进行以下操作：</span>
            <ol className="admin-page-header-list">
              <li>添加用户（新建用户）</li>
              <li>编辑用户：修改用户信息，禁用 / 解禁用户，锁定 / 解锁用户</li>
              <li>删除用户：单个删除用户，批量删除用户（软删除）</li>
              <li>搜索用户：关键字搜索，状态筛选</li>
            </ol>
          </div>
        </div>
      </PageHeader>
      <div className="admin-layout-content">
        {isLoading ? (
          <div>正在加载中...</div>
        ) : userList.length === 0 ? (
          <div>暂无数据</div>
        ) : (
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                </Descriptions>
              ),
              // rowExpandable: (record) => record.username !== 'Not Expandable',
            }}
            columns={userListColumns}
            dataSource={userList}
            bordered
            rowKey="id"
            size="small"
          />
        )}
      </div>
    </>
  );
};

export default SystemUsers;

// 表格的列定义
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
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'name',
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
    dataIndex: ['system_role', 'name'],
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
        <a>修改 {record.username}</a>
        <a>禁用</a>
        <a>锁定</a>
      </Space>
    ),
  },
];

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
