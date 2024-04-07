import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  QRCode,
  Radio,
  RadioChangeEvent,
  Select,
  SelectProps,
  Tooltip,
  notification,
} from 'antd';
import React, { useRef, useState } from 'react';
import { AppInfoType, ProductType } from './types.d';
import styles from './index.less';
import { ExportOutlined, QrcodeOutlined, RedoOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { getEsn, getUcode } from './service';

const VirtuallApp: React.FC = () => {
  const [productType, setProductType] = useState<ProductType>();
  const [appUrl, setAppUrl] = useState('');
  const [ucodeOptions, setUcodeOptions] = useState<SelectProps['options']>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [form] = Form.useForm();

  const { loading, run: getUcodeOptions } = useRequest(
    (esn: string) => {
      return getUcode({ esn });
    },
    {
      manual: true,
      formatResult: (result) => result,
      onSuccess: (data: { ucode: string; uname: string }[]) => {
        setUcodeOptions(
          data.map((item) => ({
            label: `(${item.ucode ?? ''})${item.uname}`,
            value: item.ucode,
          })),
        );
      },
    },
  );

  const { run: getEsnCode } = useRequest(
    (code: string) => {
      return getEsn({ code });
    },
    {
      manual: true,
      formatResult: (result) => result,
    },
  );

  const handleProductType = (value: RadioChangeEvent) => {
    setProductType(value.target.value);
  };

  const handleGetUcodeList = (open: boolean) => {
    if (open) {
      const code = form.getFieldValue('code');
      if (!code) {
        notification.error({
          message: '获取帐套失败',
          description: '需要先填写企业号/帐套号',
        });
        return;
      }
      if (productType === ProductType.ENTERPRISE) {
        getUcodeOptions(code);
      } else {
        // 先通过帐套获取企业号
        getEsnCode(code).then((res) => {
          console.log(res);
          if (res.errorCode === 200 && res.data) {
            getUcodeOptions(res.data.account);
          } else {
            notification.error({
              message: '获取帐套失败',
              description: '通过帐套号获取企业号失败',
            });
          }
        });
      }
    }
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
    console.log(iframeRef.current);
    if (appUrl && iframeRef.current) {
      iframeRef.current.src = '';
      setTimeout(() => {
        if (appUrl && iframeRef.current) {
          iframeRef.current.src = appUrl;
        }
      });
    }
  };

  const handleExport = () => {
    window.open(appUrl, '_blank');
  };

  return (
    <PageContainer>
      <Flex gap="middle">
        <Card style={{ minWidth: 400 }} title="登录信息">
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSubmit}
          >
            <Form.Item label="账号类型" name="type" required rules={[{ required: true }]}>
              <Radio.Group onChange={handleProductType}>
                <Radio.Button value={ProductType.ENTERPRISE}>企业号</Radio.Button>
                <Radio.Button value={ProductType.CUSTOM}>帐套号</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={productType === ProductType.ENTERPRISE ? '企业号' : '客户号'}
              name="code"
              required
              rules={[{ required: true }, { type: 'string', min: 6 }]}
            >
              <Input disabled={!productType} />
            </Form.Item>
            <Form.Item label="帐套号" name="ucode" required rules={[{ required: true }]}>
              <Select
                disabled={!productType}
                loading={loading}
                onDropdownVisibleChange={handleGetUcodeList}
                options={ucodeOptions}
              ></Select>
            </Form.Item>
            <Form.Item label="账号" name="userName" required rules={[{ required: true }]}>
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
        {appUrl && (
          <Card className={styles.appCard}>
            <Flex className={styles.appTop} justify="space-between" align="center">
              <div>YaoGuang</div>
              <div>12:00</div>
              <div className={styles.battery} />
            </Flex>
            <iframe
              ref={iframeRef}
              id="extralPage"
              src={appUrl}
              style={{ border: 'none', width: 375, height: 667 }}
            />
            <div className={styles.appBottom}>
              <Tooltip title="刷新">
                <RedoOutlined onClick={handleRefresh} />
              </Tooltip>
              <Tooltip title={<QRCode value={appUrl} />} color="#ffffff">
                <QrcodeOutlined onClick={() => {}} />
              </Tooltip>
              <Tooltip title="外部页面打开">
                <ExportOutlined onClick={handleExport} />
              </Tooltip>
            </div>
          </Card>
        )}
      </Flex>
    </PageContainer>
  );
};

export default VirtuallApp;
