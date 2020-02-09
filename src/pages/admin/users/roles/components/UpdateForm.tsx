import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import ColorPicer from '@/components/ColorPicker';
import { RoleModel } from '../types';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: RoleModel) => void;
  onSubmit: (values: RoleModel) => void;
  updateModalVisible: boolean;
  values: Partial<RoleModel>;
}
const FormItem = Form.Item;
const { Option } = Select;

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();

  const { updateModalVisible, onSubmit: handleUpdate, onCancel, values } = props;
  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as RoleModel;
    form.resetFields();
    handleUpdate({ ...fieldsValue, id: Number(values.id) });
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
          <ColorPicer value={values.color} placeholder="请选择" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="角色图标"
          name="iconUrl"
        >
          <Select>
            <Option value="1">一级</Option>
            <Option value="2">二级</Option>
            <Option value="3">三级</Option>
            <Option value="4">四级</Option>
            <Option value="5">五级</Option>
            <Option value="6">六级</Option>
            <Option value="7">七级</Option>
            <Option value="8">八级</Option>
            <Option value="9">九级</Option>
            <Option value="10">十级</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
