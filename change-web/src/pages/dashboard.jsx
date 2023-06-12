import React from 'react';
import { Avatar, Divider, PageHeader, Statistic } from 'antd';
import { useOutletContext } from 'react-router';

const Dashboard = () => {
  // 接收父传递的参数
  const [userInfo, setUserInfo] = useOutletContext();
  // 问候语
  let hello = generateHelloWord(userInfo.name);

  return (
    <>
      {/*主体头部*/}
      <PageHeader className="admin-page-header">
        {/*内容*/}
        <div className="admin-page-header-info">
          <div className="admin-page-header-left">
            <div className="admin-page-header-avatar">
              <Avatar src={userInfo.avatar} size={60} />
            </div>
            <div className="admin-page-header-desc">
              <div className="admin-page-header-welcome">{hello}</div>
              <div className="admin-page-header-job">
                {userInfo.job_name} | {userInfo.system_department?.name}
              </div>
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

// 生成问候语
function generateHelloWord(name) {
  let hour = new Date().getHours();
  let hello;
  if (hour > 22) {
    hello = '夜深了，' + name + '，别卷了，要好好休息哦 ~';
  } else if (hour > 18) {
    hello = '晚上好，' + name + '，适当加班，然后回家吧 ~';
  } else if (hour > 14) {
    hello = '下午好，' + name + '，如果困了，来杯咖啡提神吧 ~';
  } else if (hour > 11) {
    hello = '中午好，' + name + '，好好吃饭，好好休息，中午不睡下午崩溃哦 ~';
  } else if (hour > 6) {
    hello = '早上好，' + name + '，新的一天，也要元气满满哦 ~';
  } else if (hour > 3) {
    hello = 'OH MY GOD，' + name + '，也太早了吧，你是还没睡吗 ~';
  } else {
    hello = '打扰了，' + name + '，这个时候不是应该睡觉吗 ~';
  }
  return hello;
}
