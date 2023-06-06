import React from 'react';
import { LockOutlined, UserOutlined, DingtalkOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, message } from 'antd';
import './login.less';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../../service/index.jsx';
import { SetToken } from '../../utils/token.jsx';
const { Header, Content, Footer } = Layout;
import { FooterInfo, Logo } from '../../utils/resource.jsx';

const Login = () => {
  const navigate = useNavigate();

  // 登录请求
  const loginHandler = async (values) => {
    const res = await LoginAPI(values);
    // 如果登录成功
    if (res.code === 200) {
      // 设置 Token
      SetToken(res.data.token, res.data.expire);
      // 输出登录成功
      message.success('登录成功！');
      navigate('/dashboard');
    } else {
      message.error(res.message);
    }
  };
  return (
    <div>
      <div className="bg"></div>
      <Layout className="login-main">
        <Header className="login-header">
          <img src={Logo} alt="" className="logo" />
          <span className="title">CHANG`E</span>
        </Header>
        <Content className="login-content">
          <div className="login-box">
            <div className="login-welcome">Sign in</div>
            <div className="login-slogan">Hi，欢迎回来 👏</div>
            <Button className="login-type-btn" block>
              <DingtalkOutlined /> 使用钉钉登录
            </Button>
            <p className="login-line">
              <span>或者使用用户名密码登录</span>
            </p>
            <Form
              name="login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={loginHandler}>
              <Form.Item
                name="account"
                rules={[
                  {
                    required: true,
                    message: '请输入您的用户名!',
                  },
                ]}>
                <Input autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名 / 手机号 / Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入您的密码!',
                  },
                ]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="用户密码" />
              </Form.Item>

              {/*<Form.Item>*/}
              {/*  <Space direction="horizontal">*/}
              {/*    <Input*/}
              {/*      prefix={<MailOutlined className="site-form-item-icon" />}*/}
              {/*      placeholder="输入验证码"*/}
              {/*      style={{*/}
              {/*        width: 'calc(330px - 108px)',*/}
              {/*      }}*/}
              {/*    />*/}
              {/*    <Button*/}
              {/*      type="primary"*/}
              {/*      style={{ width: 100, letterSpacing: 1 }}*/}
              {/*    >*/}
              {/*      获取验证码*/}
              {/*    </Button>*/}
              {/*  </Space>*/}
              {/*</Form.Item>*/}

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  忘记密码？
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              没有账号？
              <a href="">
                直接钉钉扫码自动创建 <DingtalkOutlined />
              </a>
            </div>
          </div>
        </Content>
        <Footer className="login-footer">{FooterInfo}</Footer>
      </Layout>
    </div>
  );
};

export default Login;