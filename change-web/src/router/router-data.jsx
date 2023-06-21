import React from 'react';
import LazyLoad from './router-lazy.jsx';
import AdminLayout from '../components/layout/layout.jsx';
import { Navigate } from 'react-router';

////////////////////////////////////////////////////////////
// 路由数据配置
////////////////////////////////////////////////////////////
export const MenuRouteRules = [
  // 需要登录才能访问的菜单
  // 访问 / 默认跳转到 /dashboard
  { path: '/', element: <Navigate to="/dashboard" /> },
  // 后台访问入口
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      // Dashboard 工作台
      {
        path: 'dashboard',
        element: LazyLoad(React.lazy(() => import('/src/pages/public/dashboard/dashboard.jsx'))),
      },
      // system 系统管理模块
      {
        path: 'system',
        children: [
          // 部门管理
          {
            path: 'departments',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/departments/departments.jsx'))),
          },
          // 用户管理
          {
            path: 'users',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/users/users.jsx'))),
          },
          // 角色管理
          {
            path: 'roles',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/roles/roles.jsx'))),
          },
          // 菜单管理
          {
            path: 'menus',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/menus/menus.jsx'))),
          },
          // 接口管理
          {
            path: 'apis',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/apis/apis.jsx'))),
          },
        ],
      },
      // 关于我们
      {
        path: 'about',
        element: LazyLoad(React.lazy(() => import('/src/pages/about/about.jsx'))),
      },
      // 获取帮助
      {
        path: 'help',
        element: LazyLoad(React.lazy(() => import('/src/pages/help/help.jsx'))),
      },
      // 404 处理
      {
        path: '404',
        element: LazyLoad(React.lazy(() => import('/src/pages/error/404.jsx'))),
      },
      // 403 处理
      {
        path: '403',
        element: LazyLoad(React.lazy(() => import('/src/pages/error/403.jsx'))),
      },
      // 500 处理
      {
        path: '500',
        element: LazyLoad(React.lazy(() => import('/src/pages/error/500.jsx'))),
      },
    ],
  },

  // 不需要登录就能访问的菜单
  // 用户登录
  {
    path: '/login',
    element: LazyLoad(React.lazy(() => import('/src/pages/public/login/login.jsx'))),
    unWantedAuth: true, // 添加不需要登录标志，用于跳过 Token 检测
  },
  // 第一次登录需要重置密码
  {
    path: '/reset-password',
    element: LazyLoad(React.lazy(() => import('/src/pages/public/reset-password/reset-password.jsx'))),
    unWantedAuth: true,
  },
  { path: '*', element: <Navigate to="/404" /> },
];
