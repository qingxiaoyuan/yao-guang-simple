import { PageContainer } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Col, Form, Input, Row, Select, Flex, Radio, Button, Menu, App } from 'antd';
import Card from 'antd/es/card/Card';
import React from 'react';
import { UserType } from '../Manage/UserList/types';
import { editProfile, getProfile } from './services';

const PersonalInfo: React.FC = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { initialState } = useModel('@@initialState');

  const { run: refresh } = useRequest(
    () => {
      return getProfile();
    },
    {
      ready: !!initialState?.currentUser?.userId,
      refreshDeps: [initialState?.currentUser?.userId],
      formatResult: (result) => result,
      onSuccess: (res) => {
        if (res?.code === 200) {
          form.setFieldsValue({
            ...res.data,
          });
        }
        return {
          ...res.data,
        };
      },
    },
  );

  const handleSumbit = async (value: UserType) => {
    const editResult = await editProfile(value);
    if (editResult.code === 200) {
      message.success('修改成功');
      refresh();
    } else {
      message.error(editResult?.msg ?? '修改失败');
    }
  };

  return (
    <PageContainer>
      <Card>
        <Flex gap="large">
          <Menu
            style={{ width: 200 }}
            defaultSelectedKeys={['info']}
            mode="inline"
            items={[{
              label: '基础信息',
              key: 'info',
            }, {
              label: '其他设置',
              key: 'extral',
            }]}
          />
          <Form style={{ paddingTop: 12, maxWidth: 700 }} form={form} onFinish={handleSumbit} >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="userId" label="用户编码" labelCol={{ span: 6 }}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="userName"
                  label="用户名"
                  labelCol={{ span: 6 }}
                  required
                  rules={[{ required: true }]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nickName"
                  label="姓名"
                  labelCol={{ span: 6 }}
                  required
                  rules={[{ required: true }]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label="邮箱" labelCol={{ span: 6 }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phonenumber" label="手机号" labelCol={{ span: 6 }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="sex" label="性别" labelCol={{ span: 6 }}>
                  <Select placeholder="请选择">
                    <Select.Option value="0">男</Select.Option>
                    <Select.Option value="1">女</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="skipDailyReminder" label="日报提醒" labelCol={{ span: 6 }}>
                  <Radio.Group>
                    <Radio.Button value="0">开启</Radio.Button>
                    <Radio.Button value="1">关闭</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="skipIssueReminder" label="问题单提醒" labelCol={{ span: 6 }}>
                  <Radio.Group>
                    <Radio.Button value="0">开启</Radio.Button>
                    <Radio.Button value="1">关闭</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item wrapperCol={{ offset: 3 }}>
                  <Button type="primary" htmlType="submit">
                    修改信息
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Flex>
      </Card>
    </PageContainer>
  );
};

export default PersonalInfo;
