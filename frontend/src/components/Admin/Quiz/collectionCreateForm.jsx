import { Form, Input, Modal, Upload } from 'antd';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const CollectionCreateForm = ({ open, onCreate, onCancel, item }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item !== null) {
      form.setFieldValue('name', item.name);
      form.setFieldValue('description', item.description);
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      open={open}
      title={
        item === null ? 'Tạo mới bài trắc nghiệm' : 'Cập nhật bài trắc nghiệm'
      }
      okText={item === null ? 'Tạo mới' : 'Cập nhật'}
      cancelText='Hủy'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name='name'
          label='Tên bài trắc nghiệm'
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên bài trắc nghiệm!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Mô tả'
          rules={[
            {
              required: true,
              message: 'Hãy nhập mô tả!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Ảnh bìa'
          valuePropName='fileList'
          name='image'
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[{ required: false }]}
        >
          <Upload
            maxCount={1}
            listType='picture-card'
            accept='image/png, image/jpeg'
            beforeUpload={(file) => {
              if (file.size > 9000000) {
                reject('File size exceeded');
              } else {
                resolve('Success');
              }
            }}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh bìa</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
