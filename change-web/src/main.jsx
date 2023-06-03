import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.less';
import App from './App';
import './index.less';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      <Routes>
        {/*登录*/}
        <Route path="/login" element={<Login />} />
        {/*其它路由*/}
        <Route path="/*" element={<App />} />
      </Routes>
    </HashRouter>
  </ConfigProvider>
);
