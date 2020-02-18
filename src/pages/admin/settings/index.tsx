import { Button, Card, Select, Form, message, Checkbox, Input } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Dispatch, AnyAction } from 'redux';
import { SiteSettings } from '../../../../config/siteSettings';

const FormItem = Form.Item;
const { Option } = Select;
const {TextArea} = Input;

interface SettingsProps {
  dispatch: Dispatch<AnyAction>;
  settings: SiteSettings;
  submitting?: boolean;
}

const Settings: React.FC<SettingsProps> = props => {
  const [form] = Form.useForm();
  const { settings, submitting, dispatch } = props;

  const handleSubmit = async () => {
    const fieldValues = (await form.validateFields()) as SiteSettings;
    const hide = message.loading('正在更新');
    dispatch({
      type: 'settings/saveSettings',
      payload: fieldValues
    })
    hide();
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
          initialValues={settings}
        >
          <FormItem label="网站名称" name="title"
            rules={[{ required: true, message: '请输入网站名称' }]}
          >
            <Input />
          </FormItem>
          <FormItem label="网站简称" name="shortName"
            rules={[{ required: true, message: '请输入网站名称' }]}
          >
            <Input />
          </FormItem>
          <FormItem label="描述" name="description">
            <TextArea rows={3}/>
          </FormItem>
          <FormItem valuePropName="checked" label="是否需要电子邮件确认" name="requiredEmailConfirmed">
            <Checkbox />
          </FormItem>
          <FormItem valuePropName="checked" label="开启注册" name="registrable">
            <Checkbox />
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
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
              </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
}

export default connect(({ settings, loading }: ConnectState) => ({
  settings,
  submitting: loading.effects['settings/loadSettings']
}))(Settings);