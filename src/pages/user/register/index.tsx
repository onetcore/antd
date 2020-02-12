import { Button, Col, Input, Popover, Progress, Row, message, Form } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import { FormProps, FormInstance } from 'antd/lib/form';
import { StateType } from './model';
import styles from './style.less';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};
const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
interface RegisterProps extends FormProps {
  dispatch: Dispatch<any>;
  userAndregister: StateType;
  submitting: boolean;
}
interface RegisterState {
  count: number;
  confirmDirty: boolean;
  visible: boolean;
  help: string;
}
export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  prefix: string;
}

class Register extends Component<RegisterProps, RegisterState> {
  form = React.createRef<FormInstance>();

  state: RegisterState = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: ''
  };

  interval: number | undefined = undefined;

  componentDidUpdate() {
    const { userAndregister } = this.props;
    const account = this.form.current && this.form.current.getFieldValue('mail');

    if (userAndregister.status === 'ok') {
      message.success('注册成功！');
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({
      count,
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count,
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    if (this.form.current) {
      const value = this.form.current.getFieldValue('password');

      if (value && value.length > 9) {
        return 'ok';
      }

      if (value && value.length > 5) {
        return 'pass';
      }
    }

    return 'poor';
  };

  handleSubmit = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userAndregister/submit',
      payload: values,
    });
  };

  checkConfirm = (rule: any, value: string, callback: (message?: string) => void) => {
    if (value && this.form.current && value !== this.form.current.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule: any, value: string, callback: (message?: string) => void) => {
    const { visible, confirmDirty } = this.state;

    if (!value) {
      this.setState({
        help: '密码必须填写',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });

      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }

      if (value.length < 6) {
        callback('error');
      } else {
        if (value && confirmDirty && this.form.current) {
          this.form.current.validateFields(['confirm']);
        }

        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const value = this.form.current && this.form.current.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { submitting } = this.props;
    const { count, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>用户注册</h3>
        <Form ref={this.form} onFinish={this.handleSubmit}>
          <FormItem name="mail" rules={[
            {
              required: true,
              message: '电子邮件必须填写',
            },
            {
              type: 'email',
              message: '请输入正确的电子邮件地址',
            },
          ]}><Input size="large" placeholder="电子邮件" />
          </FormItem>
          <FormItem name="password" help={help} rules={[
            {
              validator: this.checkPassword,
            },
          ]}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode as HTMLElement;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    userandregister.strength.msg
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            ><Input
                size="large"
                type="password"
                placeholder="密码"
              />
            </Popover>
          </FormItem>
          <FormItem name="confirm"
            rules={[
              {
                required: true,
                message: '确认密码必须填写',
              },
              {
                validator: this.checkConfirm,
              },
            ]}><Input
              size="large"
              type="password"
              placeholder="确认密码"
            />
          </FormItem>
          <FormItem name="mobile" rules={[
            {
              required: true,
              message: '手机号码必须填写',
            },
            {
              pattern: /^\d{11}$/,
              message: '请输入正确的手机号码',
            },
          ]}>
              <Input
                size="large"
                placeholder="手机号码"
              />
          </FormItem>
          <FormItem name="captcha" rules={[
            {
              required: true,
              message: '验证码必须填写',
            },
          ]}>
            <Row gutter={8}>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="验证码"
                />
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(
  ({
    userAndregister,
    loading,
  }: {
    userAndregister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndregister,
    submitting: loading.effects['userAndregister/submit'],
  }),
)(Register);
