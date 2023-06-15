import { Space, Col, Row, Button, Dropdown } from 'antd';
import { DownloadOutlined, DownOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';

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
    </>
  );
};
