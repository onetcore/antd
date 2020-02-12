import { Button, Col, Input, Popover, Progress, Row, Select, message, Form } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import { FormProps, FormInstance } from 'antd/lib/form';
import { StateType } from './model';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: <div className={styles.success}>userandregister.strength.strong</div>,
  pass: <div className={styles.warning}>userandregister.strength.medium</div>,
  poor: <div className={styles.error}>userandregister.strength.short</div>,
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
  prefix: string;
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
    help: '',
    prefix: '86',
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

  handleSubmit = async (values: UserRegisterParams) => {
    const { prefix } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'userAndregister/submit',
      payload: { ...values, prefix },
    });
  };

  checkConfirm = (rule: any, value: string, callback: (message?: string) => void) => {
    if (value && this.form.current && value !== this.form.current.getFieldValue('password')) {
      callback('userandregister.password.twice');
    } else {
      callback();
    }
  };

  checkPassword = (rule: any, value: string, callback: (message?: string) => void) => {
    const { visible, confirmDirty } = this.state;

    if (!value) {
      this.setState({
        help: 'userandregister.password.required',
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

  changePrefix = (value: string) => {
    this.setState({
      prefix: value,
    });
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
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>userandregister.register.register</h3>
        <Form ref={this.form} onFinish={this.handleSubmit}>
          <FormItem name="mail" rules={[
            {
              required: true,
              message: 'userandregister.email.required',
            },
            {
              type: 'email',
              message: 'userandregister.email.wrong-format',
            },
          ]}><Input size="large" placeholder="userandregister.email.placeholder" />
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
                placeholder="userandregister.password.placeholder"
              />
            </Popover>
          </FormItem>
          <FormItem name="confirm"
            rules={[
              {
                required: true,
                message: 'userandregister.confirm-password.required',
              },
              {
                validator: this.checkConfirm,
              },
            ]}><Input
              size="large"
              type="password"
              placeholder="userandregister.confirm-password.placeholder"
            />
          </FormItem>
          <FormItem name="mobile" rules={[
            {
              required: true,
              message: 'userandregister.phone-number.required',
            },
            {
              pattern: /^\d{11}$/,
              message: 'userandregister.phone-number.wrong-format',
            },
          ]}>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{
                  width: '20%',
                }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              <Input
                size="large"
                style={{
                  width: '80%',
                }}
                placeholder="userandregister.phone-number.placeholder"
              />
            </InputGroup>
          </FormItem>
          <FormItem name="captcha" rules={[
            {
              required: true,
              message: 'userandregister.verification-code.required',
            },
          ]}>
            <Row gutter={8}>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="userandregister.verification-code.placeholder"
                />
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : 'userandregister.register.get-verification-code'}
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
              userandregister.register.register
            </Button>
            <Link className={styles.login} to="/user/login">
              userandregister.register.sign-in
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
