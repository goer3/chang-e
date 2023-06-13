import React from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import AdminLayout from '../components/layout/admin_layout';
import LazyLoad from './lazy.jsx';
import { GetToken } from '../utils/token.jsx';
import { MatchRouter } from '../utils/router.jsx';

// 路由数据配置
export let RouteRules = [
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
        path: '/dashboard',
        element: LazyLoad(React.lazy(() => import('/src/pages/dashboard.jsx'))),
      },
      // system 系统管理模块
      {
        path: 'system',
        children: [
          // 部门管理
          {
            path: 'departments',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/departments.jsx'))),
          },
          // 用户管理
          {
            path: 'users',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/users/index.jsx'))),
          },
          // 角色管理
          {
            path: 'roles',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/roles.jsx'))),
          },
          // 菜单管理
          {
            path: 'menus',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/menus.jsx'))),
          },
          // 接口管理
          {
            path: 'apis',
            element: LazyLoad(React.lazy(() => import('/src/pages/system/apis.jsx'))),
          },
        ],
      },
      // 关于我们
      {
        path: 'about',
        element: LazyLoad(React.lazy(() => import('/src/pages/about.jsx'))),
      },
      // 获取帮助
      {
        path: 'help',
        element: LazyLoad(React.lazy(() => import('/src/pages/help.jsx'))),
      },
      // 404 处理
      {
        path: '/404',
        element: LazyLoad(React.lazy(() => import('/src/pages/error/404.jsx'))),
      },
      // 403 处理
      {
        path: '/403',
        element: LazyLoad(React.lazy(() => import('/src/pages/error/403.jsx'))),
      },
      // 500 处理
      {
        path: '/500',
        element: LazyLoad(React.lazy(() => import('/src/pages/error/500.jsx'))),
      },
    ],
  },

  // 不需要登录就能访问的菜单
  // 用户登录
  {
    path: '/login',
    element: LazyLoad(React.lazy(() => import('/src/pages/public/login.jsx'))),
    unWantedAuth: true, // 添加不需要登录标志，用于跳过 Token 检测
  },
  { path: '*', element: <Navigate to="/404" /> },
];

// 路由拦截，登录状态判断
export const AuthRouter = ({ children }) => {
  // 获取 Token
  const token = GetToken();
  // 获取当前 URL
  const { pathname } = useLocation();
  // 判断请求的路由是不是在路由列表中，是否需要认证
  const r = MatchRouter(pathname, RouteRules);
  if (r.unWantedAuth) {
    return children;
  }
  // 判断 Token，不存在则返回登录页
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

// 获取路由
export const GetRoutes = () => {
  let routers;
  routers = useRoutes(RouteRules);
  return routers;
};

// 判断用户是否拥有菜单权限
export const MenuPermissionCheck = (path, menus) => {
  let permisson = false;
  let errUrlList = ['/403', '/404']; // 错误页面不需要验证
  // 白名单
  if (errUrlList.includes(path)) {
    return true;
  } else {
    // 传入菜单列表，判断当前请求的菜单是否在菜单列表中
    const findInfo = (menuList) => {
      menuList.forEach((item) => {
        if (item.key === path) {
          permisson = true;
        }
        if (item.children) {
          // 递归继续查找
          findInfo(item.children);
        }
      });
    };
    // 调用函数
    findInfo(menus);
  }

  return permisson;
};
