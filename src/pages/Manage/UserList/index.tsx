import { PageContainer } from '@ant-design/pro-components';
import { App, Card, Col, Flex, Row, Space, Table, TableColumnsType, Tag } from 'antd';
import React, { useState } from 'react';
import { GetUserParmas, UserType } from './types';
import { SearchForm } from './SearchForm';
import { ColorButton } from '@/components';
import { useRequest } from '@umijs/max';
import { deleteUser, getUserList } from './services';
import { UserModal } from './UserModal';

const UserList: React.FC = () => {
  const { message } = App.useApp();
  const [query, setQuery] = useState<GetUserParmas>({});
  const [currentUserId, setCurrentUserId] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, loading, run: refresh } = useRequest(
    () => {
      return getUserList(query);
    },
    {
      refreshDeps: [query],
      formatResult: (result) => result,
      onSuccess: (data) => {
        if (data?.code === 200) {
          setSelectedRowKeys([]);
          return {
            total: data?.total ?? 0,
            rows: data?.rows ?? [],
          };
        }
        return {
          total: 0,
          rows: [],
        };
      },
    },
  );

  const deleteUserData = async (userIds: Array<string>) => {
    const deleteResult = await deleteUser(userIds.join(','));
    if (deleteResult.code === 200) {
      refresh();
      message.success('删除成功');
    } else {
      message.error(deleteResult?.msg || '删除失败');
    }
  };

  const columns: TableColumnsType<UserType> = [
    {
      title: '编号',
      dataIndex: 'userId',
      align: 'center',
      key: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center',
      key: 'userName',
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      align: 'center',
      key: 'nickName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === '0' ? 'green' : 'red'}>
          {record.status === '0' ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCurrentUserId(record?.userId ?? '');
            }}
          >
            修改
          </a>
          <a onClick={() => {
            deleteUserData([record?.userId ?? '']);
          }}>删除</a>
        </Space>
      ),
    },
  ];

  const handleChange = (pageIndex: number, pageSize: number) => {
    setQuery((oldValue) => ({
      ...oldValue,
      pageIndex,
      pageSize,
    }));
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSubmit = (values: any) => {
    setQuery((oldValue) => ({
      ...oldValue,
      ...values,
    }))
  };

  const handleClickTopEdit = () => {
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.error('请至少选择一条数据');
      return;
    }
    if (selectedRowKeys.length > 1) {
      message.error('一次只能修改一条数据');
      return;
    }
    setCurrentUserId((selectedRowKeys?.[0] ?? '').toString());
  }

  const handleClickDelete = () => {
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.error('请至少选择一条数据');
      return;
    }
    deleteUserData(selectedRowKeys as Array<string>);
  };

  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card bordered={false}>
            <SearchForm onSubmit={onSubmit} />
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered={false}>
            <Flex wrap="wrap" gap="small" style={{ marginBottom: 16 }}>
              <ColorButton color="#4892f7" onClick={() => setCurrentUserId('add')}>新增</ColorButton>
              <ColorButton color="#73d13d" onClick={handleClickTopEdit}>修改</ColorButton>
              <ColorButton color="#ff4d4f" onClick={handleClickDelete}>删除</ColorButton>
            </Flex>
            <Table
              rowKey="userId"
              columns={columns}
              dataSource={data?.rows ?? []}
              rowSelection={{
                selectedRowKeys,
                onChange: onSelectChange,
              }}
              loading={loading}
              pagination={{
                pageSize: query?.pageSize ?? 10,
                total: data?.total ?? 0,
                onChange: handleChange,
              }}
            />
          </Card>
        </Col>
      </Row>
      <UserModal currentUserId={currentUserId} afterSubmit={() => {
        setCurrentUserId('');
        refresh();
      }} />
    </PageContainer>
  );
};

export default UserList;
