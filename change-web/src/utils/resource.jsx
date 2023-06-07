import React from 'react';
import logo from '/src/assets/images/logo-x.png';
import avatar from '/src/assets/images/avatar.png';

//引入所有图标
import * as Icons from '@ant-design/icons';

// 这里传入的props是一个对象，里面有 icon 属性，值是 antd 图标的名字
export const Iconfont = (props) => {
  const { icon } = props;
  return React.createElement(Icons[icon]);
};

// Footer
export let FooterInfo = "Copyright © 1993-2023 CHANG'E（嫦娥）, All Rights Reserved. Version:1.0.1";
// Logo
export let Logo = logo;
// 默认头像
export let DefaultAvatar = avatar;
