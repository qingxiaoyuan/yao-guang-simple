import { PageContainer } from '@ant-design/pro-components';
import {  Card, Col, Row, Space, Table, TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { UserType } from './type';
import { SearchForm } from './SearchForm';

const UserList: React.FC = () => {
  const [userList] = useState<Array<UserType>>([{ code: '1', name: '用户1' }]);

  const columns: TableColumnsType<UserType> = [
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
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
            <Table rowKey="code" columns={columns} dataSource={userList} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserList;
