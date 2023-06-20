import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

// 页面不存在 404
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-error-info">
      <img src="/src/assets/images/404.svg" alt="" />
      <div className="admin-error-title">404</div>
      <div className="admin-error-desc">您所访问的资源不存在！</div>
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

export default PageNotFound;
