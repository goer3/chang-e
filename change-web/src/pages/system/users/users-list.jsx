import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Descriptions, Space, Table, Tag } from 'antd';
import { GetUserListAPI } from '../../../common/request-api.jsx';
import { DefaultPageSize } from '../../../config/config.jsx';

////////////////////////////////////////////////////////////
// 用户表格定义
////////////////////////////////////////////////////////////
const userListColumns = [
  Table.EXPAND_COLUMN, // 展开
  Table.SELECTION_COLUMN, // 选择
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

////////////////////////////////////////////////////////////
// 选中用户
////////////////////////////////////////////////////////////
const userListRowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.username === 'change',
    username: record.username,
  }),
};

////////////////////////////////////////////////////////////
// 用户列表
////////////////////////////////////////////////////////////
const UserManagementList = () => {
  // 局部状态
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 数据总量
  const [totalCount, setTotalCount] = useState(0);

  // 请求数据
  const [requestParams, setRequestParams] = useState({
    // 分页数据
    no_pagination: false, // 是否不分页
    page_number: 1, // 默认页码
    page_size: DefaultPageSize, // 每页显示数量
    // 搜索数据
  });

  // 请求用户列表
  useEffect(() => {
    // 获取用户列表，使用异步会导致短暂的 Warning 提示
    const GetUserListHandle = async () => {
      const res = await GetUserListAPI({ params: requestParams });
      if (res.code === 200) {
        setUserList(res.data.list);
        setIsLoading(false);
        // 设置分页信息
        setTotalCount(res.data.page_info.total_count);
      }
    };
    GetUserListHandle();
  }, [requestParams]);

  return (
    <>
      {/*数据*/}
      {isLoading ? (
        <div>正在加载中...</div>
      ) : userList.length === 0 ? (
        <div>暂无数据</div>
      ) : (
        <Table
          rowSelection={{
            type: 'checkbox',
            ...userListRowSelection,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div className="admin-list-expand-content">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="用户账户">{record.username}</Descriptions.Item>
                  <Descriptions.Item label="用户籍贯">
                    {record.native_province.name} - {record.native_city.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="办公地点">
                    {record.office_province.name} - {record.office_city.name} - {record.office_address}
                  </Descriptions.Item>
                  <Descriptions.Item label="管理人员">
                    {record.leader === 1 ? <span style={{ color: '#cf1322' }}>是</span> : '否'}
                  </Descriptions.Item>
                  <Descriptions.Item label="入职时间">{record.entry_time}</Descriptions.Item>
                  <Descriptions.Item label="用户生日">{record.birthday}</Descriptions.Item>
                  <Descriptions.Item label="创建时间">{record.created_at}</Descriptions.Item>
                  <Descriptions.Item label="最后登录">{record.last_login}</Descriptions.Item>
                </Descriptions>
              </div>
            ),
            // 设置展开条件
            // rowExpandable: (record) => record.system_role.keyword !== 'Administrator',
          }}
          columns={userListColumns} // 列
          dataSource={userList} // 用户数据
          bordered
          rowKey="id"
          size="small"
          pagination={{
            total: totalCount,
            showTotal: () => '总共 ' + totalCount + ' 条数据',
            defaultCurrent: requestParams.page_number,
            defaultPageSize: requestParams.page_size,
            showSizeChanger: true,
            hideOnSinglePage: true,
            onChange: (page, pageSize) => {
              setRequestParams({
                page_number: page,
                page_size: pageSize,
              });
              // 重置为空，用于解决切换页面显示数量由大变小偶尔出现报错的问题。
              // 原因在于：由于异步请求还未完成，导致列表溢出的问题，虽然该问题会在请求完成后自己解决，但是控制台会提示：
              // Warning: [antd: Table] `dataSource` length is less than `pagination.total` but large than `pagination.pageSize`.
              // Please make sure your config correct data with async mode.
              setUserList([]);
            },
          }}
        />
      )}
    </>
  );
};

export default UserManagementList;
