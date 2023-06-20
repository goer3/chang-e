import { proxy } from 'valtio';

// 用户相关状态
export const UserStates = proxy({
  ResetPasswordToken: '', // 重置密码 Token
  CurrentUserInfo: {}, // 当前用户信息
});
