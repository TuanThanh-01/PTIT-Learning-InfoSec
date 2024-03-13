import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List, Spin, Table, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import { removeVietnameseTones } from '../../../utils/RemoveVietnameseTones';
import CollectionCreateForm from './collectionCreateForm';

const Quiz = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [item, setItem] = useState({});

  const getQuizData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/quiz/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.forEach((quiz) => {
        if (quiz.created_at !== null) {
          quiz.created_at = convertISOToCustomFormat(quiz.created_at);
        }
        if (quiz.updated_at !== null) {
          quiz.updated_at = convertISOToCustomFormat(quiz.updated_at);
        }
      });
      setQuizData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendDataCreateQuiz = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/quiz/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await getQuizData();
      message.success('Tạo mới bài trắc nghiệm thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const sendUpdateQuiz = async (data, id) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image !== undefined) {
      formData.append('image', data.image);
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/quiz/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getQuizData();
      message.success('Cập nhật bài trắc nghiệm thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const deleteQuizById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/quiz/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getQuizData();
      message.success('Xóa bài trắc nghiệm thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  useEffect(() => {
    getQuizData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateQuiz = () => {
    setItem(null);
    setOpenModal(true);
  };

  const handleUpdateQuiz = (record) => {
    setOpenModal(true);
    setItem(record);
  };

  const handleDeleteQuizById = (quizID) => {
    if (deleteQuizById(quizID)) {
      setIsLoading(true);
    }
  };

  const onCreate = (values) => {
    if (values.image !== undefined) {
      values.image = values.image[0].originFileObj;
    }
    if (item === null) {
      sendDataCreateQuiz(values);
    } else {
      sendUpdateQuiz(values, item.id);
    }
    setOpenModal(false);
  };

  return (
    <div style={{ height: '100vh' }}>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          size='large'
        />
      ) : (
        <div>
          <div
            className='mb-5'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Search
              placeholder='Nhập tên bài trắc nghiệm'
              allowClear
              style={{ width: '20rem' }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />

            <div>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170', width: '8rem' }}
                onClick={handleCreateQuiz}
              >
                Thêm mới
              </Button>
            </div>
          </div>
          <CollectionCreateForm
            open={openModal}
            item={item}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          ></CollectionCreateForm>
          <Table
            rowKey={(record) => record.id}
            columns={[
              { title: 'ID', dataIndex: 'id' },
              {
                title: 'Ảnh bìa',
                dataIndex: 'image',
                render: (image) => (
                  <Avatar
                    shape='square'
                    size='large'
                    src={`http://localhost:8082${image}`}
                    icon
                  />
                ),
              },
              {
                title: 'Tên bài trắc nghiệm',
                dataIndex: 'name',
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return String(record.name)
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase());
                },
              },
              {
                title: 'Mô tả',
                dataIndex: 'description',
              },
              {
                title: 'Thời gian tạo',
                dataIndex: 'created_at',
              },
              {
                title: 'Thời gian cập nhật',
                dataIndex: 'updated_at',
              },
              {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (record) => (
                  <div>
                    <Button
                      type='primary'
                      size='small'
                      icon={<EditOutlined />}
                      className='mr-2'
                      onClick={() => {
                        handleUpdateQuiz(record);
                      }}
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteQuizById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={quizData}
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
