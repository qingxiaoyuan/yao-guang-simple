import { InboxOutlined } from '@ant-design/icons';
import { App, GetProp, Modal, Upload, UploadFile, UploadProps } from 'antd';
import React, { useState } from 'react';
import { importUsers } from './services';

interface ImportModalProps {
  open: boolean;
  afterSubmit?: () => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const ImportModal: React.FC<ImportModalProps> = (props) => {
  const { afterSubmit, open } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { message } = App.useApp();
  const handleSumit = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file as FileType);
    });
    const importResult = await importUsers(formData);
    if (importResult.code === 200 && afterSubmit) {
      message.success('导入成功');
      afterSubmit();
    } else {
      message.error(importResult?.msg ?? '新增失败');
    }
  };
  return (
    <Modal open={open} title={'导入用户数据'} onCancel={afterSubmit} onOk={handleSumit}>
      <Upload.Dragger
        name="file"
        accept=".xlsx, .xls"
        multiple={false}
        maxCount={1}
        onRemove={(file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
          return false;
        }}
        fileList={fileList}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
      </Upload.Dragger>
    </Modal>
  );
};
