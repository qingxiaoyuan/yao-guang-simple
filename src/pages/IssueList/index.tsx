import { PageContainer } from '@ant-design/pro-components';
import { Card, Flex, Radio, RadioChangeEvent, Table, TableColumnsType, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { useModel, useRequest } from '@umijs/max';
import { getIssueList } from './services';
import { IssueType } from './types';

const IssueList: React.FC = () => {
  const [issueList, setIssueList] = useState<Array<IssueType>>([]);
  const { initialState } = useModel('@@initialState');
  const allIssueList = useRef<Array<IssueType>>([]);
  
  const isToday = (givenDateString: string) => {
    if (!givenDateString) {
      return false;
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const givenDate = new Date(givenDateString);
    const givenToday = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate());
    if (today.getTime() === givenToday.getTime()) {
      return true;
    }
    return false;
  };

  const { loading } = useRequest(
    () => {
      return getIssueList();
    },
    {
      formatResult: (result) => result,
      onSuccess: (data: { data: Array<IssueType>; errCode: number }) => {
        if (data?.errCode === 200) {
          if (initialState?.currentUser?.admin) {
            allIssueList.current = data?.data ?? [];
          } else {
            // 非管理员只能看到自己的
            allIssueList.current = data?.data?.filter(item => item.userNo === initialState?.currentUser?.userName);
          }
          setIssueList(
            allIssueList.current.filter(
              (item) => (item.ayyyy && item.ayyyy > 84) && !isToday(item.feedbackTime ?? ''),
            ),
          );
        }
      },
    },
  );

  const handleChangeFilter = (e: RadioChangeEvent) => {
    if (e.target.value === 'error') {
      setIssueList(
        allIssueList.current?.filter(
          (item: any) => item.ayyyy && item.ayyyy > 84 && !isToday(item.feedbackTime ?? ''),
        ),
      );
    } else {
      setIssueList([...(allIssueList.current ?? [])]);
    }
  };

  const columns: TableColumnsType<IssueType> = [
    {
      title: '编号',
      dataIndex: 'billNo',
      align: 'center',
      key: 'billNo',
    },
    {
      title: '内容',
      dataIndex: 'content',
      align: 'center',
      width: 500,
      key: 'content',
    },
    {
      title: '处理人',
      dataIndex: 'currentUser',
      align: 'center',
      key: 'currentUser',
    },
    {
      title: '滞留时间',
      dataIndex: 'ayyyy',
      align: 'center',
      key: 'ayyyy',
    },
    {
      title: '备注时间',
      dataIndex: 'feedbackTime',
      align: 'center',
      key: 'feedbackTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (_, record) => {
        const isError = (record.ayyyy && record.ayyyy > 84) && !isToday(record.feedbackTime ?? '');
        return <Tag color={isError ? 'red' : 'green'}>{isError ? '超时未备注' : '正常'}</Tag>;
      },
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Flex wrap="wrap" gap="small" style={{ marginBottom: 16 }}>
          <Radio.Group
            optionType="button"
            defaultValue="error"
            options={[
              { label: '全部', value: 'all' },
              { label: '需要备注', value: 'error' },
            ]}
            onChange={handleChangeFilter}
          />
        </Flex>
        <Table
          rowKey="billNo"
          columns={columns}
          dataSource={issueList ?? []}
          loading={loading}
          pagination={{
            pageSize: 10,
            total: issueList.length ?? 0,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default IssueList;
