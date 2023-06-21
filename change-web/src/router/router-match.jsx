////////////////////////////////////////////////////////////
// 匹配路由规则
////////////////////////////////////////////////////////////
export const MatchRouter = (path, prefix, routers) => {
  // 递归判断路由是否在路由列表中
  for (let item of routers) {
    let rpath = item.path;

    // 说明是子菜单，则需要拼接
    if (prefix !== '' && prefix !== '/') {
      rpath = prefix + '/' + rpath;
    }

    // 第一级菜单，需要加上 / 开头
    if (!rpath.startsWith('/')) {
      rpath = '/' + rpath;
    }

    if (path === rpath) {
      return item;
    }

    if (item.children) {
      prefix = rpath;
      MatchRouter(path, prefix, item.children);
      prefix = '';
    }
  }
  return {};
};
