import React from 'react';
import DashboardHeader from './dashboard-header.jsx';

const Dashboard = () => {
  return (
    <>
      {/*Header 信息*/}
      <DashboardHeader />

      {/*主体内容*/}
      <div className="admin-layout-content">Dashboard</div>
    </>
  );
};

export default Dashboard;
