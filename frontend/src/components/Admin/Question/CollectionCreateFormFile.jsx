import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Select, Upload } from 'antd';
import React from 'react';

const CollectionCreateForm = ({ open, onCreate, onCancel, quizData }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title='Thêm danh sách câu hỏi'
      okText={'Thêm mới'}
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
        <Form.Item label='Tên bài trắc nghiệm' name='quiz_title'>
          <Select options={quizData}></Select>
        </Form.Item>
        <Form.Item
          label='File'
          valuePropName='fileList'
          name='file'
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[{ required: true, message: 'Hãy tải file câu hỏi!' }]}
        >
          <Upload
            maxCount={1}
            listType='picture-card'
            accept='.xlsx'
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
              <div style={{ marginTop: 8 }}>Tải File câu hỏi</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
