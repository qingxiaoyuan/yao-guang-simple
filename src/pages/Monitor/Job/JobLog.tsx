import { ColorButton } from '@/components';
import { useRequest } from '@umijs/max';
import { App, Button, Flex, Space, Table, TableColumnsType, Tag } from 'antd';
import React, { useState } from 'react';
import { deleteAllLog, deleteTaskLog, getTaskLogList } from './services';
import { TaskLogType } from './types';
import { JobGroupConstant, JobLogStatus } from './constant';

export const JobLog: React.FC = () => {
  const { message, modal } = App.useApp();
  const [query, setQuery] = useState<API.PageParams>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {
    data,
    loading,
    run: refresh,
  } = useRequest(
    () => {
      return getTaskLogList(query);
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

  const deleteTaskLogData = async (taskIds: Array<string>) => {
    const deleteResult = await deleteTaskLog(taskIds.join(','));
    if (deleteResult.code === 200) {
      refresh();
      message.success('删除成功');
    } else {
      message.error(deleteResult?.msg || '删除失败');
    }
  };


  const columns: TableColumnsType<TaskLogType> = [
    {
      title: '日志编号',
      dataIndex: 'jobLogId',
      align: 'center',
      key: 'jobLogId',
    },
    {
      title: '任务名',
      dataIndex: 'jobName',
      align: 'center',
      key: 'jobName',
    },
    {
      title: '任务组',
      dataIndex: 'jobGroup',
      align: 'center',
      key: 'jobGroup',
      render: (_, record) => JobGroupConstant?.[(record.jobGroup || 'DEFAULT')],
    },
    {
      title: '日志信息',
      dataIndex: 'jobMessage',
      align: 'center',
      key: 'jobMessage',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === '0' ? 'green' : 'red'}>
          {JobLogStatus?.[record.status ?? '1']}
        </Tag>
      ),
    },
    {
      title: '执行时间',
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
              deleteTaskLogData([record?.jobLogId ?? '']);
            }}
          >
            删除
          </a>
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

  const handleClickAllLog = async () => {
    const confirmed = await modal.confirm({
      title: '提示!',
      content: '是否确认删除全部记录',
    });
    if (confirmed) {
      const changeResult = await deleteAllLog();
      if (changeResult.code === 200) {
        refresh();
        message.success('已删除全部记录');
      } else {
        message.error(changeResult?.msg ?? '删除记录失败');
      }
    }
  };

  const handleClickDelete = () => {
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.error('请至少选择一条数据');
      return;
    }
    deleteTaskLogData(selectedRowKeys as Array<string>);
  };
  
  return (
    <>
      <Flex wrap="wrap" gap="small" style={{ marginBottom: 16 }}>
        <ColorButton color="#4892f7" onClick={() => refresh()}>
          刷新
        </ColorButton>
        <ColorButton color="#ff4d4f" onClick={handleClickDelete}>
          删除
        </ColorButton>
        <Button danger onClick={handleClickAllLog}>
          清空全部记录
        </Button>
      </Flex>
      <Table
        rowKey="jobLogId"
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
    </>
  );
};
