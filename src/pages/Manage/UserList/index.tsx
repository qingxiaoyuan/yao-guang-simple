import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Flex, Row, Space, Table, TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { UserType } from './types';
import { SearchForm } from './SearchForm';
import { ColorButton } from '@/components';

const UserList: React.FC = () => {
  const [userList] = useState<Array<UserType>>([{ code: '1', name: '用户1' }]);

  const columns: TableColumnsType<UserType> = [
    {
      title: '编号',
      dataIndex: 'code',
      align: 'center',
      key: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'userId',
      align: 'center',
      key: 'userId',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
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
          <a>修改 {record.name}</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const onSubmit = (values: any) => {
    console.log('Received values of form: ', values);
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
              <ColorButton color='#4892f7'>新增</ColorButton>
              <ColorButton color='#73d13d'>修改</ColorButton>
              <ColorButton color='#ff4d4f'>删除</ColorButton>
            </Flex>
            <Table rowKey="code" columns={columns} dataSource={userList} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserList;
