import { PageContainer } from '@ant-design/pro-components';
import { Card, Tabs } from 'antd';
import React from 'react';
import { JobList } from './JobList';

const Job: React.FC = () => {
  return (
    <PageContainer>
      <Card bordered={false}>
        <Tabs
          type="card"
          items={[
            {
              label: '任务列表',
              key: 'list',
              children: <JobList />,
            },
            {
              label: '任务日志',
              key: 'log',
              children: '日志',
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default Job;
