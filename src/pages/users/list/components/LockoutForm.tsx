import React from 'react';
import { Form, Modal, DatePicker, Alert } from 'antd';
import moment from 'moment';
import { LockoutUserModel } from '../model.d';

export interface FormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: LockoutUserModel) => void;
  onCancel: () => void;
  values: LockoutUserModel
}

const LockoutForm: React.FC<FormProps> = props => {
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleLockout, onCancel, values } = props;
  const okHandle = async () => {
    const fields = (await form.validateFields()) as LockoutUserModel;
    handleLockout({ ...fields, ids: values.ids });
  };

  const disabledDate = current => current && current < moment().add(-1, 'd').endOf('day');

  return (
    <Modal
      {...formLayout}
      destroyOnClose
      title="锁定用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{ lockoutEnd: moment().add(1, 'h') }}
      >
        <Alert style={{ marginBottom: '25px' }} type="warning" showIcon message="锁定用户到达时间后将自动解锁" />
        <Form.Item
          name="lockoutEnd"
          label="截至日期"
        >
          <DatePicker disabledDate={disabledDate} showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LockoutForm;