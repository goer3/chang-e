import React from 'react';
import { Button, Col, Dropdown, Row, Space } from 'antd';
import { DownloadOutlined, DownOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { UserStates } from '../../../store/store-users.jsx';
import UsersManagementAddForm from './forms/users-add-form.jsx';
import UsersManagementImportForm from './forms/users-import-form.jsx';

////////////////////////////////////////////////////////////
// 用户批量操作下拉菜单
////////////////////////////////////////////////////////////
// 菜单
const userMultiHandleItems = [
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

// 执行方法
const userMultiHandle = (e) => {
  console.log('数据：', e);
};

// 对象
const userMultiHandleProps = {
  items: userMultiHandleItems,
  onClick: userMultiHandle,
};

////////////////////////////////////////////////////////////
// 用户按钮组
////////////////////////////////////////////////////////////
const UserManagementBtnGroup = () => {
  return (
    <>
      {/* 按钮组定义 */}
      <Row style={{ marginBottom: '10px' }}>
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => {
              UserStates.UserAddModelOpen = true;
            }}
            icon={<UserAddOutlined />}
            className="admin-ant-btn">
            新建用户
          </Button>
          <Button
            onClick={() => {
              UserStates.UserImportModelOpen = true;
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

          <Dropdown menu={userMultiHandleProps}>
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
      <UsersManagementAddForm />

      {/*/!* 导入用户 *!/*/}
      <UsersManagementImportForm />
    </>
  );
};

export default UserManagementBtnGroup;
