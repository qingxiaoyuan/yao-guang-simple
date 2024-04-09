import { App, Col, Form, Input, Modal, Radio, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { CronSelect } from 'react-cron-select';
import { addTask, editTask, getTaskDetail } from './services';

interface TaskModalProps {
  currentTaskId?: string;
  afterSubmit?: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = (props) => {
  const { currentTaskId, afterSubmit } = props;
  const { message } = App.useApp();
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentTaskId === 'add') {
      form.resetFields();
    }
    if (!!currentTaskId && currentTaskId !== 'add') {
      getTaskDetail(currentTaskId).then((res) => {
        if (res.code === 200 && res?.data) {
          form.setFieldsValue({
            ...res.data,
            roleIds: res.data?.roles?.[0]?.roleId?.toString(),
          });
        } else {
          message.info('获取任务信息失败');
          if (afterSubmit) {
            afterSubmit();
          }
        }
      });
    }
  }, [currentTaskId]);

  const handleSumit = async () => {
    const validateResult = await form.validateFields();
    if (!validateResult) {
      return;
    }
    if (currentTaskId === 'add') {
      // 新增提交
      const addResult = await addTask({
        ...validateResult,
      });
      if (addResult.code === 200 && afterSubmit) {
        message.success('新增成功');
        afterSubmit();
      } else {
        message.error(addResult?.msg ?? '新增失败');
      }
    } else {
      const editResult = await editTask({
        ...validateResult,
        jobId: currentTaskId,
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
      open={!!currentTaskId}
      width={600}
      title={currentTaskId === 'add' ? '新增任务' : '修改任务信息'}
      onCancel={afterSubmit}
      onOk={handleSumit}
    >
      <Form style={{ paddingTop: 24 }} form={form}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="jobName"
              label="任务名"
              labelCol={{ span: 10 }}
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入任务名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="jobGroup"
              label="任务分组"
              labelCol={{ span: 10 }}
              required
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择">
                <Select.Option value="DEFAULT">默认分组</Select.Option>
                <Select.Option value="SYSTEM">系统分组</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="invokeTarget"
              label="执行目标"
              labelCol={{ span: 5 }}
              required
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择">
                <Select.Option value="yaoguangTask.ryNoParams">日报提醒</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="cronExpression"
              label="Cron表达式"
              labelCol={{ span: 5 }}
              required
              rules={[{ required: true }]}
            >
              <CronSelect inputProps={{ placeholder: "请输入!" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="concurrent" label="是否并发" labelCol={{ span: 10 }}>
              <Radio.Group>
                <Radio.Button value="0">是</Radio.Button>
                <Radio.Button value="1">否</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          {currentTaskId !== 'add' && (
            <Col span={12}>
              <Form.Item name="status" label="状态" labelCol={{ span: 10 }}>
                <Radio.Group>
                  <Radio.Button value="0">启用</Radio.Button>
                  <Radio.Button value="1">停用</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};
