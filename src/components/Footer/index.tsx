import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Yao Guang',
          title: 'Yao Guang',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'QingXiaoYuan',
          title: 'QingXiaoYuan',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
