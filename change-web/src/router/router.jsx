import React from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router';
import { MenuRouteRules } from './router-data.jsx';
import { GetToken } from '../utils/token.jsx';
import { MatchRouter } from './router-match.jsx';

////////////////////////////////////////////////////////////
// 获取路由列表
////////////////////////////////////////////////////////////
export const GetRouteList = () => {
  return useRoutes(MenuRouteRules);
};

////////////////////////////////////////////////////////////
// 路由拦截，登录状态判断
////////////////////////////////////////////////////////////
export const AuthRouter = ({ children }) => {
  // 获取 Token
  const token = GetToken();
  // 获取当前 URL
  const { pathname } = useLocation();
  // 判断请求的路由是不是在路由列表中，是否需要认证
  const r = MatchRouter(pathname, '', MenuRouteRules);
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
