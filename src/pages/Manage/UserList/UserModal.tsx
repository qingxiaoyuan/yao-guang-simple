import { App, Col, Form, Input, Modal, Radio, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { addUser, editUser, getUserDetail } from './services';

interface UserModalProps {
  currentUserId?: string;
  afterSubmit?: () => void;
}

export const UserModal: React.FC<UserModalProps> = (props) => {
  const { currentUserId, afterSubmit } = props;
  const { message } = App.useApp();
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUserId === 'add') {
      form.resetFields();
    }
    if (!!currentUserId && currentUserId !== 'add') {
      getUserDetail(currentUserId).then((res) => {
        if (res.code === 200 && res?.data) {
          form.setFieldsValue({
            ...res.data,
            roleIds: res.data?.roles?.[0]?.roleId?.toString(),
          });
        } else {
          message.info('获取用户信息失败');
          if (afterSubmit) {
            afterSubmit();
          }
        }
      });
    }
  }, [currentUserId]);

  const handleSumit = async () => {
    const validateResult = await form.validateFields();
    if (!validateResult) {
      return;
    }
    if (currentUserId === 'add') {
      // 新增提交
      const addResult = await addUser({
        ...validateResult,
        roleIds: validateResult?.roleIds ? [validateResult.roleIds] : [],
        password: '123456',
      });
      if (addResult.code === 200 && afterSubmit) {
        message.success('新增成功');
        afterSubmit();
      } else {
        message.error(addResult?.msg ?? '新增失败');
      }
    } else {
      const editResult = await editUser({
        ...validateResult,
        roleIds: validateResult?.roleIds ? [validateResult.roleIds] : [],
      });
      if (editResult.code === 200 && afterSubmit) {
        message.success('修改成功');
        afterSubmit();
      } else {
        message.error(editResult?.msg ?? '修改失败');
      }
    }
  };
  return (
    <Modal
      open={!!currentUserId}
      width={700}
      title={currentUserId === 'add' ? '新增用户' : '修改用户信息'}
      onCancel={afterSubmit}
      onOk={handleSumit}
    >
      <Form style={{ paddingTop: 24 }} form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="userId" label="用户编码" labelCol={{ span: 6 }}>
              <Input placeholder="请输入用户编码,不填则自动生成" />
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
              <Input placeholder="请输入用户名" />
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
              <Input placeholder="请输入用户姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="邮箱" labelCol={{ span: 6 }}>
              <Input placeholder="请输入邮箱号" />
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
            <Form.Item name="status" label="状态" labelCol={{ span: 6 }}>
              <Select placeholder="请选择">
                <Select.Option value="0">正常</Select.Option>
                <Select.Option value="1">禁用</Select.Option>
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
          <Col span={12}>
            <Form.Item
              name="roleIds"
              label="角色"
              labelCol={{ span: 6 }}
              required
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择">
                <Select.Option value="1">超级管理员</Select.Option>
                <Select.Option value="2">普通用户</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="remark" label="备注" labelCol={{ span: 3 }}>
              <Input.TextArea placeholder="请输入备注信息" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
