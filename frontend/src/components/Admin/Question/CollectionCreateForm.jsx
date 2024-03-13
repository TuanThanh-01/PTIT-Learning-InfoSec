import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';

const CollectionCreateForm = ({ open, onCreate, onCancel, item, quizData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item !== null) {
      form.setFieldValue('question_title', item.question_title);
      form.setFieldValue('option1', item.option1);
      form.setFieldValue('option2', item.option2);
      form.setFieldValue('option3', item.option3);
      form.setFieldValue('option4', item.option4);
      form.setFieldValue('correct_answer', item.correct_answer);
      form.setFieldValue('quiz_title', item.quizTitle);
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      open={open}
      title={item === null ? 'Tạo mới  câu hỏi' : 'Cập nhật câu hỏi'}
      okText={item === null ? 'Thêm mới' : 'Cập nhật'}
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
          name='question_title'
          label='Tên câu hỏi'
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên câu hỏi!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='option1'
          label='Đáp án A'
          rules={[
            {
              required: true,
              message: 'Hãy nhập đáp án A!',
            },
          ]}
        >
          <Input type='textarea' />
        </Form.Item>
        <Form.Item
          name='option2'
          label='Đáp án B'
          rules={[
            {
              required: true,
              message: 'Hãy nhập đáp án B!',
            },
          ]}
        >
          <Input type='textarea' />
        </Form.Item>
        <Form.Item
          name='option3'
          label='Đáp án C'
          rules={[
            {
              required: true,
              message: 'Hãy nhập đáp án C!',
            },
          ]}
        >
          <Input type='textarea' />
        </Form.Item>
        <Form.Item
          name='option4'
          label='Đáp án D'
          rules={[
            {
              required: true,
              message: 'Hãy nhập đáp án D!',
            },
          ]}
        >
          <Input type='textarea' />
        </Form.Item>
        <Form.Item label='Đáp án đúng' name='correct_answer'>
          <Select>
            <Select.Option value='option1'>Đáp án A</Select.Option>
            <Select.Option value='option2'>Đáp án B</Select.Option>
            <Select.Option value='option3'>Đáp án C</Select.Option>
            <Select.Option value='option4'>Đáp án D</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Tên bài trắc nghiệm' name='quiz_title'>
          <Select options={quizData}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
