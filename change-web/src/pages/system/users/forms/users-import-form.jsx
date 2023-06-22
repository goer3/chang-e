import React from 'react';
import { Button, Form, Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UserStates } from '../../../../store/store-users.jsx';
import { useSnapshot } from 'valtio';
const { Dragger } = Upload;

////////////////////////////////////////////////////////////
// 添加用户表单
////////////////////////////////////////////////////////////
const UsersManagementImportForm = () => {
  const { UserImportModelOpen } = useSnapshot(UserStates);

  return (
    <Modal
      title="导入用户"
      open={UserImportModelOpen}
      // onOk={CreateUserHandle}
      onCancel={() => {
        UserStates.UserImportModelOpen = false;
      }}
      maskClosable={false}
      footer={null}
      width={400}>
      <Form name="user-import">
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
  );
};

export default UsersManagementImportForm;
