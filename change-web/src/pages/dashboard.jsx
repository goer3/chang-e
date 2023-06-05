import React from 'react';
import { Avatar, Divider, PageHeader, Statistic } from 'antd';
import { DefaultAvatar } from '../utils/image.jsx';

const Dashboard = () => {
  return (
    <>
      {/*主体头部*/}
      <PageHeader className="admin-page-header">
        {/*内容*/}
        <div className="admin-page-header-info">
          <div className="admin-page-header-left">
            <div className="admin-page-header-avatar">
              <Avatar src={DefaultAvatar} size={60} />
            </div>
            <div className="admin-page-header-desc">
              <div className="admin-page-header-welcome">晚上好，吴彦祖，别卷了，要好好休息哦 ~</div>
              <div className="admin-page-header-job">前端工程师 | 蚂蚁金服 - 某某某事业群 - REACT平台</div>
            </div>
          </div>
          <div className="admin-page-header-right">
            <Statistic title="项目数量" value={1024} />
            <Divider type="vertical" />
            <Statistic title="任务数量" value={6553} />
            <Divider type="vertical" />
            <Statistic title="活跃天数" value={1258} />
          </div>
        </div>
      </PageHeader>

      {/*主体内容*/}
      <div className="admin-layout-content">Dashboard</div>
    </>
  );
};

export default Dashboard;
