import React from 'react';
import { Form, Input, Modal } from 'antd';
import { RoleModel } from '../data';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: RoleModel) => void;
  onSubmit: (values: RoleModel) => void;
  updateModalVisible: boolean;
  values: Partial<RoleModel>;
}
const FormItem = Form.Item;

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();

  const { updateModalVisible, onSubmit: handleUpdate, onCancel, values } = props;
  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as RoleModel;
    form.resetFields();
    handleUpdate(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="更新用户角色"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}
        initialValues={values}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="颜色"
          name="color"
          rules={[{ pattern: /#[a-f0-9A-F]{3,8}/, message: '请输入颜色值' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="角色图标"
          name="iconUrl"
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
