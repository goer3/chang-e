import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'antd';

const ServerError = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-error-info">
      <img src="/src/assets/images/403.svg" alt="" />
      <div className="admin-error-title">500</div>
      <div className="admin-error-desc">系统错误，请联系管理员！</div>
      <div className="admin-error-back">
        <Button
          type="primary"
          onClick={() => {
            navigate('/dashboard');
          }}>
          回到工作台
        </Button>
      </div>
    </div>
  );
};

export default ServerError;
