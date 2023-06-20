import React from 'react';
import logo from '/src/assets/image/logo-x.png';
import blackLogo from '/src/assets/image/logo-title-black.png';
import whiteLogo from '/src/assets/image/logo-title-white.png';
import blueLogo from '/src/assets/image/logo-title-blue.png';
import bbLogo from '/src/assets/image/logo-title-bb.png';

//引入所有图标
import * as Icons from '@ant-design/icons';

// 这里传入的props是一个对象，里面有 icon 属性，值是 antd 图标的名字
export const Iconfont = (props) => {
  const { icon } = props;
  return React.createElement(Icons[icon]);
};

// Footer
export const FooterText = () => {
  return <div>Copyright © 1993-2023 CHANG'E（嫦娥）, All Rights Reserved. Version 1.0</div>;
};

// Logo
export let Logo = logo;
export let BlackLogo = blackLogo;
export let WhiteLogo = whiteLogo;
export let BlueLogo = blueLogo;
export let BBLogo = bbLogo;
