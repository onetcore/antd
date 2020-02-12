import { Button, Card, Select, Form, message, Checkbox, Input } from 'antd';
import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SettingsModel } from './model.d';
import { update, query } from './service';

const FormItem = Form.Item;
const { Option } = Select;
const handleUpdate = async (values: SettingsModel) => {
  const hide = message.loading('正在更新');
  const result = await update(values);
  hide();
  if (result.status) {
    message.success('已经成功更新');
    return true;
  }
  message.error(result.message);
  return false;
}

interface SettingsProps {
  settings: SettingsModel;
  submitting?: boolean;
}

const Settings: React.FC<SettingsProps> = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    query().then(result => {
      if (result.status) {
        form.setFieldsValue({...result.data});
      }
      else
        message.error('载入配置错误');
    })
    return () => {
      form.resetFields();
    };
  }, []);

  const handleSubmit = async () => {
    const fieldValues = (await form.validateFields()) as SettingsModel;
    await handleUpdate(fieldValues);
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Form
          {...formItemLayout}
          form={form}
          style={{
            marginTop: 8,
          }}
          onFinish={handleSubmit}
        >
          <FormItem valuePropName="checked" label="是否需要电子邮件确认" name="requiredEmailConfirmed">
            <Checkbox />
          </FormItem>
          <FormItem valuePropName="checked" label="是否需要电话号码确认" name="requiredPhoneNumberConfirmed">
            <Checkbox />
          </FormItem>
          <FormItem valuePropName="checked" label="开启二次验证" name="requiredTwoFactorEnabled">
            <Checkbox />
          </FormItem>
          <FormItem valuePropName="checked" label="开启注册" name="registrable">
            <Checkbox />
          </FormItem>
          <FormItem valuePropName="checked" label="使用验证码" name="validCode">
            <Checkbox />
          </FormItem>
          <FormItem label="登录页面的背景地址" name="loginBg">
            <Input />
          </FormItem>
          <FormItem label="登录转向" name="loginDirection">
            <Select>
              <Option value={0}>首页</Option>
              <Option value={1}>用户中心</Option>
              <Option value={2}>后台管理</Option>
            </Select>
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
              </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
}

export default Settings;