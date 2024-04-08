import { ColorButton } from '@/components';
import { useRequest } from '@umijs/max';
import { App, Flex, Space, Switch, Table, TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { deleteTask, editTaskStatus, getTaskList } from './services';
import { TaskType } from './types';
import { TaskModal } from './TaskModal';

export const JobList: React.FC = () => {
  const { message, modal } = App.useApp();
  const [query, setQuery] = useState<API.PageParams>({});
  const [currentTaskId, setCurrentTaskId] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {
    data,
    loading,
    run: refresh,
  } = useRequest(
    () => {
      return getTaskList(query);
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

  const deleteTaskData = async (taskIds: Array<string>) => {
    const deleteResult = await deleteTask(taskIds.join(','));
    if (deleteResult.code === 200) {
      refresh();
      message.success('删除成功');
    } else {
      message.error(deleteResult?.msg || '删除失败');
    }
  };

  const handleSwitchStatus = async (checked: boolean, taskId: string) => {
    const confirmed = await modal.confirm({
      title: '提示!',
      content: '是否确认修改任务状态',
    });
    if (confirmed) {
      const changeResult = await editTaskStatus({
        jobId: taskId,
        status: checked ? '0' : '1',
      });
      if (changeResult.code === 200) {
        refresh();
        message.success('修改任务状态成功');
      } else {
        message.error(changeResult?.msg ?? '修改任务状态失败');
      }
    }
    
  };

  const columns: TableColumnsType<TaskType> = [
    {
      title: '任务编号',
      dataIndex: 'jobId',
      align: 'center',
      key: 'jobId',
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
    },
    {
      title: 'cron',
      dataIndex: 'cronExpression',
      align: 'center',
      key: 'cronExpression',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (_, record) => (
        <Switch checked={record.status === '0'} onClick={(checked: boolean) => {
          handleSwitchStatus(checked, record.jobId ?? '');
        }} />
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
              setCurrentTaskId(record?.jobId ?? '');
            }}
          >
            修改
          </a>
          <a
            onClick={() => {
              deleteTaskData([record?.jobId ?? '']);
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

  const handleClickTopEdit = () => {
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.error('请至少选择一条数据');
      return;
    }
    if (selectedRowKeys.length > 1) {
      message.error('一次只能修改一条数据');
      return;
    }
    setCurrentTaskId((selectedRowKeys?.[0] ?? '').toString());
  };

  const handleClickDelete = () => {
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.error('请至少选择一条数据');
      return;
    }
    deleteTaskData(selectedRowKeys as Array<string>);
  };
  return (
    <>
      <Flex wrap="wrap" gap="small" style={{ marginBottom: 16 }}>
        <ColorButton color="#4892f7" onClick={() => setCurrentTaskId('add')}>
          新增
        </ColorButton>
        <ColorButton color="#73d13d" onClick={handleClickTopEdit}>
          修改
        </ColorButton>
        <ColorButton color="#ff4d4f" onClick={handleClickDelete}>
          删除
        </ColorButton>
      </Flex>
      <Table
        rowKey="jobId"
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
      <TaskModal
        currentTaskId={currentTaskId}
        afterSubmit={() => {
          setCurrentTaskId('');
          refresh();
        }}
      />
    </>
  );
};
