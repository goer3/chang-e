// 获取 Token
export const GetToken = () => {
  // 获取 Token 过期时间，判断是否过期
  let expire = sessionStorage.getItem('expire');
  if (expire) {
    let date = new Date().getTime();
    let timestamp = Date.parse(expire);
    if (date < timestamp) {
      // 如果当前时间小于过期时间，则表示 Token 没过期，此时再获取 Token
      return sessionStorage.getItem('token');
    }
  }
  // 过期或者 Token 不存在，都清空数据
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('expire');
  return null;
};

// 设置 Token 和 Token 过期时间
export const SetToken = (token, expire) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('expire', expire);
};
