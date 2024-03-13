import { Form, Input, Modal, Upload, message } from 'antd';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const CollectionCreateForm = ({ open, onCreate, onCancel, item }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item !== null) {
      form.setFieldValue('firstname', item.firstname);
      form.setFieldValue('lastname', item.lastname);
      form.setFieldValue('email', item.email);
      form.setFieldValue('studentIdentity', item.student_identity);
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      open={open}
      title={item === null ? 'Tạo mới người dùng' : 'Cập nhật người dùng'}
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
          name='firstname'
          label='Tên'
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastname'
          label='Họ'
          rules={[
            {
              required: true,
              message: 'Hãy nhập họ!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='studentIdentity'
          label='Mã sinh viên'
          rules={[
            {
              required: true,
              message: 'Hãy nhập mã sinh viên!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {item === null ? (
          <Form.Item
            name='password'
            label='Mật khẩu'
            rules={[
              {
                required: true,
                message: 'Hãy nhập mật khẩu',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: 'Hãy nhập email!',
            },
            {
              type: 'email',
              message: 'Email không hợp lệ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Ảnh đại diện'
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
              <div style={{ marginTop: 8 }}>Tải ảnh đại diện</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
