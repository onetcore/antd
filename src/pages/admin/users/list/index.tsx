import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/lib/table/interface';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { UserModel, CreateUserModel, UpdateUserModel, LockoutUserModel } from './model.d';
import { query, update, create, remove, find, unlock, lockout } from './service';
import LockoutForm from './components/LockoutForm';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: CreateUserModel) => {
  const hide = message.loading('正在添加');
  const result = await create(fields);
  hide();
  if (result.status) {
    message.success('添加成功');
    return true;
  }
  message.error(result.message);
  return false;
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: UpdateUserModel) => {
  const hide = message.loading('正在配置');
  const result = await update(fields);
  hide();
  if (result.status) {
    message.success('更新成功');
    return true;
  }
  message.error(result.message);
  return false;
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserModel[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  const result = await remove(selectedRows.map(row => row.id));
  hide();
  if (result.status) {
    message.success('删除成功，即将刷新');
    return true;
  }
  message.error(result.message);
  return false;
};

/**
 *  解锁用户
 * @param selectedRows
 */
const handleUnlock = async (selectedRows: UserModel[]) => {
  const hide = message.loading('正在解锁');
  if (!selectedRows) return true;
  const result = await unlock(selectedRows.map(row => row.id));
  hide();
  if (result.status) {
    message.success('解锁成功，即将刷新');
    return true;
  }
  message.error(result.message);
  return false;
};

/**
 *  锁定用户
 */
const handleLockout = async (model: LockoutUserModel) => {
  const hide = message.loading('正在锁定');
  const result = await lockout(model);
  hide();
  if (result.status) {
    message.success('锁定成功，即将刷新');
    return true;
  }
  message.error(result.message);
  return false;
};

const UserList: React.FC<{}> = () => {
  const [sb, setSb] = useState();
  const [so, setSo] = useState();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [lockoutModalVisible, handleLockoutModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<UserModel>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, d) => d.realName ? `${d.realName}(${d.userName})` : d.realName,
    },
    {
      title: '电子邮件',
      dataIndex: 'email',
    },
    {
      title: '电话号码',
      dataIndex: 'phoneNumber',
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginDate',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, _1, action) => (
        <>
          <a
            onClick={async () => {
              const result = await find(record.id);
              if (result.status) {
                handleUpdateModalVisible(true);
                setStepFormValues(result.data);
              }
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
            }}>删除</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<UserModel>
        headerTitle="查询用户"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorter = _sorter as SorterResult<UserModel>;
          if (sorter != null) {
            setSo(sorter.order);
            setSb(sorter.field);
          }
        }}
        params={{
          so,
          sb,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    switch (e.key) {
                      case 'remove':
                        if (await handleRemove(selectedRows)) { action.reload(); }
                        break;
                      case 'lockout':
                        handleLockoutModalVisible(true);
                        setStepFormValues({ ids: selectedRows.map(x => x.id) });
                        break;
                      default:
                        if (await handleUnlock(selectedRows)) { action.reload(); }
                        break;
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="lockout">锁定用户</Menu.Item>
                  <Menu.Item key="unlock">解锁用户</Menu.Item>
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
        request={params => query(params)}
        columns={columns}
        rowSelection={{}}
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
        values={stepFormValues as CreateUserModel}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <Fragment>
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
            values={stepFormValues as UpdateUserModel}
          />
          <LockoutForm
            onSubmit={async value => {
              const success = await handleLockout(value);
              if (success) {
                handleLockoutModalVisible(false);
                setStepFormValues({});
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleLockoutModalVisible(false);
              setStepFormValues({});
            }}
            modalVisible={lockoutModalVisible}
            values={stepFormValues as LockoutUserModel}
          />
        </Fragment>
      ) : null}
    </PageHeaderWrapper>
  );
};

export default UserList;
