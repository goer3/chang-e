import React from 'react';

// 匹配路由规则
export const MatchRouter = (path, routers) => {
  // 递归判断路由是否在路由列表中
  for (let item of routers) {
    if (path === item.path) {
      return item;
    }
    if (item.children) {
      MatchRouter(path, item.children);
    }
  }
  return {};
};
