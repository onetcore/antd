import React from 'react';
import { Form, Input, Modal } from 'antd';
import { CreateUserModel } from '../model.d';

const FormItem = Form.Item;
const { Password } = Input;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: CreateUserModel) => void;
  onCancel: () => void;
  values?: CreateUserModel;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as CreateUserModel;
    handleAdd(fieldsValue);
  };

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  const compare = (_, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('密码和确认密码不匹配！');
    } else {
      callback();
    }
  };

  return (
    <Modal
      destroyOnClose
      title="添加用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form {...formLayout} form={form}>
        <FormItem
          label="用户名称"
          name="userName"
          rules={[{
            required: true,
            pattern: /^[a-z][a-z0-9]{4,11}$/i,
            message: '请输入英文开头，由数字和英文字母组成的5-12个字符！'
          }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="真实姓名"
          name="realName"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入6-16个字符！', min: 6, max: 16 }]}
        >
          <Password placeholder="请输入" />
        </FormItem>
        <FormItem
          label="确认密码"
          name="confirm"
          rules={[{ required: true, validator: compare }]}
        >
          <Password placeholder="请输入" />
        </FormItem>
        <FormItem
          label="电话号码"
          name="phoneNumber"
          rules={[{ len: 11, message: '请输入正确的手机号码' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="电子邮件"
          name="email"
          rules={[{ type: 'email', message: '请输入正确的电子邮件地址' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
