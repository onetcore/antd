import React from 'react';
import { Form, Input, Modal, Alert } from 'antd';
import { UpdateUserModel } from '../model.d';
import styles from './UpdateForm.less';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: UpdateUserModel) => void;
  onSubmit: (values: UpdateUserModel) => void;
  updateModalVisible: boolean;
  values: UpdateUserModel;
}
const FormItem = Form.Item;
const { TextArea, Password } = Input;

export interface UpdateFormState {
  formVals: UpdateUserModel;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();

  const { updateModalVisible, onSubmit: handleUpdate, onCancel, values } = props;
  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as UpdateUserModel;
    handleUpdate({ ...fieldsValue, id: values.id, userName: values.userName });
  };
  return (
    <Modal
      {...formLayout}
      destroyOnClose
      title={`修改“${values.userName}”用户资料`}
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={values}
      >
        <Alert className={styles.alert} type="warning" showIcon message="如果没有修改密码，请留空！" />
        <FormItem
          name="realName"
          label="真实姓名"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="password" label="密码">
          <Password placeholder="请输入密码" />
        </FormItem>
        <FormItem name="confirm" label="确认密码">
          <Password placeholder="请输入确认密码" />
        </FormItem>
        <FormItem
          label="电话号码"
          name="phoneNumber"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="电子邮件"
          name="email"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="summary" label="描述">
          <TextArea rows={4} placeholder="请输入符" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
