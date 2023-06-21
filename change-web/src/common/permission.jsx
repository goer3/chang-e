////////////////////////////////////////////////////////////
// 判断用户是否拥有菜单权限
////////////////////////////////////////////////////////////
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
