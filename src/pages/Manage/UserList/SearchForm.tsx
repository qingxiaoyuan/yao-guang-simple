import React from 'react';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';

interface SearchFormProps {
  onSubmit?: (values: any) => void;
}

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { onSubmit } = props;

  const [form] = Form.useForm();

  return (
    <Form form={form} name="advanced_search" onFinish={onSubmit}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item key={'userId'} name="userId" label="编号">
            <Input placeholder='请输入编号' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item key={'userName'} name="userName" label="用户名">
            <Input placeholder='请输入用户名' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item key={'status'} name="status" label="状态">
            <Select placeholder="请选择">
              <Select.Option value="0">正常</Select.Option>
              <Select.Option value="1">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}></Col>
      </Row>
      <div style={{ textAlign: 'right' }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            清空
          </Button>
        </Space>
      </div>
    </Form>
  );
};
