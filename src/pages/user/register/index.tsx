import React, { useState, useEffect, useCallback } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  message,
} from 'antd';
import { Link, router } from 'umi';
import styles from './style.less';
import { RegisterUserModel } from './model.d';
import { fakeRegister, getCaptcha } from './service';

const countDown = 60;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [timing, setTiming] = useState(false);
  const [count, setCount] = useState(countDown);

  const onFinish = async values => {
    const hide = message.loading('正在注册...');
    const result = await fakeRegister(values as RegisterUserModel);
    hide();
    if (result.status) {
      router.push({
        pathname: '/user/register-result',
        state: {
          account: values.userName,
          email: values.email,
        },
      });
      return true;
    }
    message.error(result.message);
    return false;
  };

  const onFinishFailed = ({ errorFields }) => {
    form.scrollToField(errorFields[0].name);
  };

  const onGetCaptcha = useCallback(async (mobile: string) => {
    const result = await getCaptcha(mobile);
    if (!result.status) {
      message.error(result.message);
      return;
    }
    message.success('获取验证码成功！');
    setTiming(true);
  }, []);

  useEffect(() => {
    let interval: number = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  const compare = (_, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(Error('密码和确认密码不匹配！'));
    }
    return Promise.resolve();
  };

  return (
    <div className={styles.main}>
      <h3>用户注册</h3>
      <Form
        form={form}
        name="register"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="userName"
          rules={[{
            required: true,
            message: '请输入用户名称',
            whitespace: true,
          },
          {
            pattern: /^[a-zA-Z][a-z0-9A-Z]{3,11}$/,
            message: '必须以英文字母开头，由字母和数字组成的4-12个字符串'
          }
          ]}
        >
          <Input placeholder="用户名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: 6,
              max: 16,
              message: '密码必须由6-16字符组成'
            }
          ]}
        >
          <Input.Password size="large" placeholder="由6-16字符组成的密码，区分大小写" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              validator: compare
            },
          ]}
        >
          <Input.Password size="large" placeholder="确认密码" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: '请输入正确的电子邮件',
            },
            {
              required: true,
              message: '请输入电子邮件',
            },
          ]}
        >
          <Input placeholder="电子邮件" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <Input placeholder="手机号码" />
        </Form.Item>

        <Form.Item shouldUpdate>
          {({ getFieldValue }) => (
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item name="captcha" rules={[
                  {
                    required: true,
                    message: '请输入验证码',
                  }]}>
                  <Input placeholder="验证码" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button
                  disabled={timing}
                  className={styles.getCaptcha}
                  size="large"
                  onClick={() => {
                    const value = getFieldValue('phoneNumber');
                    onGetCaptcha(value);
                  }}
                >
                  {timing ? `${count} 秒` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          )}
        </Form.Item>

        <Form.Item name="agreement" valuePropName="checked">
          <Checkbox onChange={e => setDisabled(!e.target.checked)}>
            我已经同意 <a href="">用户协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button className={styles.submit} disabled={disabled} type="primary" htmlType="submit">
            注册
        </Button>
          <Link className={styles.login} to="/user/login">
            使用已有账户登录
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;