import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

// 权限拒绝 403
const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-error-info">
      <img src="/src/assets/images/403.svg" alt="" />
      <div className="admin-error-title">403</div>
      <div className="admin-error-desc">您所访问的资源权限不足！</div>
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

export default Forbidden;
