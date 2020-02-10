import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { RoleModel } from './model.d';
import { query, update, create, remove } from './service';
import styles from './index.less';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: RoleModel) => {
  const hide = message.loading('正在添加');
  const response = await create(fields);
  hide();
  if (response.status) {
    message.success('添加成功');
    return true;
  }
  message.error(response.message);
  return false;
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: RoleModel) => {
  const hide = message.loading('正在更新角色');
  const response = await update(fields);
  if (response.status) {
    hide();
    message.success('更新成功');
    return true;
  }
  message.error(response.message);
  return false;
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: RoleModel[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  const response = await remove(selectedRows.map(row => row.id));
  if (response.status) {
    hide();
    message.success('删除成功，即将刷新');
    return true;
  }
  message.error(response.message);
  return false;
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<RoleModel>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '颜色',
      dataIndex: 'color',
      render: (_, record) => (
        record.color ?
          <span className={styles.block} style={{ backgroundColor: record.color }}></span>
          : null
      ),
    },
    {
      title: '图标',
      dataIndex: 'iconUrl',
      render: (_, record) => (
        record.iconUrl ?
          <span className={styles.icon} style={{ borderColor: record.color, color: record.color }}>{record.iconUrl}</span>
          : null
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, _1, action) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              if (await handleRemove([record])) {
                action.reload();
              }
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<RoleModel>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={selectedRowKeys => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        request={() => query()}
        columns={columns}
        rowSelection={{}}
        pagination={false}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
