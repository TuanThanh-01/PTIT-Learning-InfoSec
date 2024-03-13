import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './createLessonStyle.css';

const CreateLesson = ({
  open,
  onCreate,
  onCancel,
  item,
  categoryLesson,
  token,
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');

  const quillRef = useRef();

  const uploadImage = async (imageLesson) => {
    const formData = new FormData();
    formData.append('imageLesson', imageLesson);
    const response = await axios.post(
      'http://localhost:8082/api/v1/lesson/upload-image',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`http://localhost:8082${response.data}`);
    return `http://localhost:8082${response.data}`;
  };

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await uploadImage(file);
        editor.insertEmbed(editor.getSelection(), 'image', url);
      }
    };
  };

  const modules = useMemo(
    () => ({
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
        handlers: {
          image: imageHandler, // <-
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  useEffect(() => {
    setValue('');
    if (item !== null) {
      form.setFieldValue('title', item.title);
      form.setFieldValue('description', item.description);
      form.setFieldValue('lstCategoryLessonName', item.category_lesson);
      setValue(item.content);
      form.setFieldValue('content', item.content);
      setImage(`http://localhost:8082${item.cover_image}`);
    } else {
      form.resetFields();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      centered
      title={item === null ? 'Tạo mới bài học' : 'Cập nhật bài học'}
      okText={item === null ? 'Thêm mới' : 'Cập nhật'}
      cancelText='Hủy'
      onCancel={onCancel}
      width='100vw'
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
      <Row style={{ height: '100%' }} className='border'>
        <Col
          span={12}
          className='container main-container'
          style={{
            overflowY: 'auto',
            height: '100vh',
          }}
        >
          <Form form={form} layout='vertical' name='basic' className='p-2'>
            <Form.Item
              label='Tiêu đề'
              name='title'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tiêu đề bài học',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Mô tả'
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mô tả cho bài học',
                },
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Row>
              <Col span={15}>
                <Form.Item
                  label='Danh mục bài học'
                  name='lstCategoryLessonName'
                  rules={[
                    {
                      required: true,
                      message: 'Hãy chọn danh mục cho bài học',
                    },
                  ]}
                >
                  <Select
                    mode='multiple'
                    style={{ width: '90%' }}
                    allowClear
                    options={categoryLesson}
                  />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label='Ảnh bìa'
                  name='coverImage'
                  rules={
                    item === null
                      ? [
                          {
                            required: true,
                            message: 'Hãy chọn ảnh bìa',
                          },
                        ]
                      : [{ required: false }]
                  }
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
              </Col>
            </Row>
            <Form.Item
              label='Nội dung bài học'
              name='content'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mô tả cho bài học',
                },
              ]}
            >
              <ReactQuill
                ref={quillRef}
                theme='snow'
                style={{ height: '40rem' }}
                className='mb-4'
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
                value={value}
                onChange={setValue}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col
          span={12}
          className='container border-left border-dark'
          style={{
            overflowY: 'auto',
            height: '100vh',
          }}
        >
          <div className='ql-snow'>
            <div
              className='ql-editor'
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateLesson;
