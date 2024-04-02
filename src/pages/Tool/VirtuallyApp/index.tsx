import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Flex, Form, Input, Radio, RadioChangeEvent, Select, Tooltip } from 'antd';
import React, { useState } from 'react';
import { AppInfoType, ProductType } from './types.d';
import styles from './index.less';
import { ExportOutlined, QrcodeOutlined, RedoOutlined } from '@ant-design/icons';

const VirtuallApp: React.FC = () => {
  const [productType, setProductType] = useState<ProductType>();
  const [appUrl, setAppUrl] = useState('');

  const handleProductType = (value: RadioChangeEvent) => {
    setProductType(value.target.value);
  };

  const handleSubmit = (value: AppInfoType) => {
    setAppUrl(
      `http://appserver.netcall.cc/EnterpriseInfoService/wechat/pages/5.1.50/React/?platform=h5&enterpriseNo=${
        value.code ?? ''
      }&accountNo=${value.ucode ?? ''}&platForm=h5&platform=h5&userName=${
        value.userName ?? ''
      }&productVersion=${value.version ?? ''}#/work-tab`,
    );
  };

  const handleRefresh = () => {
  };

  return (
    <PageContainer>
      <Flex gap="middle">
        <Card style={{ minWidth: 400 }} title="登录信息">
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit}>
            <Form.Item label="账号类型" name="type">
              <Radio.Group onChange={handleProductType}>
                <Radio.Button value={ProductType.ENTERPRISE}>企业号</Radio.Button>
                <Radio.Button value={ProductType.CUSTOM}>帐套号</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={productType === ProductType.ENTERPRISE ? '企业号' : '客户号'}
              name="code"
            >
              <Input disabled={!productType} />
            </Form.Item>
            <Form.Item label="帐套号" name="ucode">
              <Select disabled={!productType}>
                <Select.Option value="0001" name="layout">
                  0001
                </Select.Option>
                <Select.Option value="0002" name="layout">
                  0002
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="账号" name="userName">
              <Input disabled={!productType} />
            </Form.Item>
            <Form.Item label="版本" name="version">
              <Input disabled={!productType} placeholder="非必填,格式为类似(5.1.50P1)" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Button type="primary" htmlType="submit">
                生成
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {(
          <Card className={styles.appCard}>
            <Flex className={styles.appTop} justify="space-between" align="center">
              <div>YaoGuang</div>
              <div>12:00</div>
              <div className={styles.battery}/>
            </Flex>
            <iframe id="extralPage" src={appUrl} style={{ border: 'none', width: 375, height: 667 }} />
            <div className={styles.appBottom}>
              <Tooltip title="刷新">
                <RedoOutlined onClick={handleRefresh} />
              </Tooltip>
              <Tooltip title="二维码查看">
                <QrcodeOutlined />
              </Tooltip>
              <Tooltip title="外部页面打开">
                <ExportOutlined />
              </Tooltip>
            </div>
          </Card>
        )}
      </Flex>
    </PageContainer>
  );
};

export default VirtuallApp;
