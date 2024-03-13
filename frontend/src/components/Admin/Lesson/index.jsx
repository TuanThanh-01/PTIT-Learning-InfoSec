import React, { useEffect, useState } from 'react';
import { Button, List, Spin, Tag, message } from 'antd';
import Search from 'antd/es/input/Search';
import { CalendarOutlined } from '@ant-design/icons';
import CreateLesson from './createLesson';
import { convertDateVnCustom } from '../../../utils/ConvertDateVn';
import axios from 'axios';
import { removeVietnameseTones } from '../../../utils/RemoveVietnameseTones';

const Lesson = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lessonData, setLessonData] = useState([]);
  const [item, setItem] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoryLessonData, setCategoryLessonData] = useState();

  const getCategoryLessonData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/category-lesson/get-all-category-lesson-name',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const arr = [];
      response.data.forEach((ele) => {
        arr.push({ value: ele, label: ele });
      });
      setCategoryLessonData(arr);
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra');
    }
  };

  const getLessonData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/lesson/all',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLessonData(response.data);
      setSearchResult(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra');
    }
  };

  const sendDataCreateLesson = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('content', values.content);
    formData.append('coverImage', values.coverImage);
    formData.append('lstCategoryLessonName', values.lstCategoryLessonName);
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/lesson/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getLessonData();
      message.success('Tạo mới bài học thành công');
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra');
    }
  };

  const sendDataUpdateLesson = async (values, id) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('content', values.content);
    formData.append('coverImage', values.coverImage);
    formData.append('lstCategoryLessonName', values.lstCategoryLessonName);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/lesson/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getLessonData();
      message.success('Cập nhật bài học thành công');
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra');
    }
  };

  const deleteLessonById = async (lessonId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/lesson/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getLessonData();
      setIsLoading(false);
      message.success('Xóa bài học thành công', 3);
      return true;
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const handleSearch = (e) => {
    if (e.target.value !== '') {
      setSearchResult(
        lessonData.filter((item) =>
          removeVietnameseTones(item.title.toLowerCase()).includes(
            removeVietnameseTones(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setSearchResult(lessonData);
    }
  };

  const handleDeleteLesson = (lessonId) => {
    deleteLessonById(lessonId);
  };

  const handleCreateLesson = () => {
    setItem(null);
    setOpenModal(true);
  };

  const handleUpdateLesson = (item) => {
    setOpenModal(true);
    setItem(item);
  };

  useEffect(() => {
    getCategoryLessonData();
    getLessonData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const onCreate = (values) => {
    if (item === null) {
      values.coverImage = values.coverImage.file;
      sendDataCreateLesson(values);
    } else {
      if (values.coverImage !== undefined) {
        values.coverImage = values.coverImage.file;
      }
      sendDataUpdateLesson(values, item.id);
    }
    setOpenModal(false);
  };

  return (
    <div style={{ height: '100vh' }}>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          size='large'
        />
      ) : (
        <div
          className='mt-4 container'
          style={{
            height: '100vh',
          }}
        >
          <div className='mb-3'>
            <div
              style={{
                marginBottom: 25,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Search
                placeholder='Nhập tiêu đề bài học'
                allowClear
                style={{ width: '20rem' }}
                onChange={handleSearch}
              />
              <div>
                <Button
                  className='mr-3'
                  type='primary'
                  style={{ background: '#008170' }}
                  onClick={handleCreateLesson}
                >
                  Thêm mới bài học
                </Button>
              </div>
            </div>
          </div>
          <CreateLesson
            open={openModal}
            item={item}
            categoryLesson={categoryLessonData}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
            token={token}
          />
          <div>
            <List
              itemLayout='vertical'
              size='large'
              pagination={{ pageSize: 4 }}
              dataSource={searchResult}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={
                    <img
                      src={`http://localhost:8082${item.cover_image}`}
                      width={272}
                    />
                  }
                  style={{ position: 'relative', borderRadius: '10px' }}
                  className='shadow-sm mb-4'
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className='d-flex'>
                    <div>
                      <CalendarOutlined
                        className='mr-2'
                        style={{ color: '#068FFF', fontSize: '1rem' }}
                      />
                      <p className='d-inline' style={{ fontSize: '13px' }}>
                        Cập nhật vào{' '}
                        <span className='font-weight-bold'>
                          {item.updated_at !== null
                            ? convertDateVnCustom(item.updated_at)
                            : convertDateVnCustom(item.created_at)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className='mt-4'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {item.category_lesson.map((val, index) => (
                        <Tag
                          color='cyan'
                          key={index}
                          title={item.category_lesson_description[index]}
                        >
                          {val}
                        </Tag>
                      ))}
                    </div>
                    <div>
                      <Tag
                        color='#2db7f5'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleUpdateLesson(item);
                        }}
                      >
                        Chỉnh sửa bài học
                      </Tag>
                      <Tag
                        color='red-inverse'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleDeleteLesson(item.id);
                        }}
                      >
                        Xóa bài học
                      </Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;
