import { Col, Form, Input, Modal, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateLabModal = ({ open, onCreate, onCancel, item, categoryLesson }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        [{ script: 'sub' }, { script: 'super' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['code-block'],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    setValue('');
    if (item !== null) {
      form.setFieldValue('title', item.title);
      form.setFieldValue('description', item.description);
      form.setFieldValue('tag', item.tag);
      form.setFieldValue('guide', item.guide);
      form.setFieldValue('url', item.url);
    } else {
      form.resetFields();
    }
  }, [open]);

  return (
    <Modal
      width={800}
      open={open}
      centered
      title={item === null ? 'Tạo mới bài thực hành' : 'Cập nhật thực hành'}
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
        <Row>
          <Col span={15}>
            <Form.Item
              name='title'
              label='Tên bài thực hành'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tên bài thực hành!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className='ml-4' span={8}>
            <Form.Item
              name='tag'
              label='Danh mục'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn danh mục!',
                },
              ]}
            >
              <Select allowClear options={categoryLesson} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
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
              <TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col className='ml-4' span={8}>
            <Form.Item
              name='url'
              label='Đường dẫn bài thực hành'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập đường dẫn bài thực hành!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <Form.Item
            style={{ height: '300px' }}
            name='guide'
            label='Hướng dẫn'
            rules={[
              {
                required: true,
                message: 'Hãy nhập hướng dẫn!',
              },
            ]}
          >
            <ReactQuill
              theme='snow'
              value={value}
              onBlur={setValue}
              style={{ height: '230px' }}
              modules={modules}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'align',
                'strike',
                'script',
                'blockquote',
                'background',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
                'video',
                'color',
                'code-block',
              ]}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateLabModal;
