// 手机号校验
export const ValidatePhone = (rule, value) => {
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(value)) {
    return Promise.reject('请输入正确的手机号!');
  }
  return Promise.resolve();
};
