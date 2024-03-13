import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Col, List, Row, Spin, Tag, message } from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { convertDateVnCustom } from '../../utils/ConvertDateVn';
import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Lesson = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(0);
  const [lessonRecentData, setLessonRecentData] = useState([]);
  const [listLessonData, setListLessonData] = useState([]);
  const navigate = useNavigate();

  const getLessonData = async (access_token) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/lesson/all`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      response.data.forEach((lesson) => {
        if (lesson.created_at !== null) {
          lesson.created_at = convertDateVnCustom(lesson.created_at);
        }
        if (lesson.updated_at !== null) {
          lesson.updated_at = convertDateVnCustom(lesson.updated_at);
        }
      });
      setListLessonData(response.data);
      setData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 2);
      console.log(error);
    }
  };

  const getLessonRecentData = async (access_token, userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/history-reading-lesson/recent-lesson-by-user?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const lessonData = response.data.map((value) => ({
        lesson: value.lesson,
        created_at: value.created_at,
      }));
      lessonData.forEach((historyReadingLesson) => {
        if (historyReadingLesson.created_at !== null) {
          historyReadingLesson.created_at = convertDateVnCustom(
            historyReadingLesson.created_at
          );
        }
      });
      setLessonRecentData(lessonData);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 2);
      console.log(error);
    }
  };

  const createHistoryReadingLesson = async (lessonId) => {
    const data = {
      userId: userId,
      lessonId: lessonId,
    };
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/history-reading-lesson/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 2);
      console.log(error);
    }
  };

  const handleViewLesson = (lessonId) => {
    createHistoryReadingLesson(lessonId);
    navigate(`/viewLesson/${lessonId}`);
  };

  const handleViewLessonInRecentView = (item) => {
    createHistoryReadingLesson(item.lesson.id);
    navigate(`/viewLesson/${item.lesson.id}`);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    setUserId(user.user_id);
    getLessonData(user.access_token);
    getLessonRecentData(user.access_token, user.user_id);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value !== '') {
      setListLessonData(
        listLessonData.filter((item) =>
          removeVietnameseTones(item.title.toLowerCase()).includes(
            removeVietnameseTones(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setListLessonData(data);
    }
  };

  return (
    <Content style={{ overflow: 'initial' }} className='p-3'>
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
        <div>
          <div
            className='mb-3 mr-2'
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <div>
              <Search
                placeholder='Nhập tiêu đề bài học'
                allowClear
                style={{ width: '20rem' }}
                onChange={handleSearch}
              />
            </div>
          </div>
          <Row style={{ display: 'flex' }}>
            <Col span={16} className='ml-2'>
              <h4 style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                Danh sách bài học
              </h4>
              <div
                className='mt-4'
                style={{
                  height: '100vh',
                }}
              >
                <div>
                  <List
                    itemLayout='vertical'
                    size='large'
                    pagination={{ pageSize: 4 }}
                    dataSource={listLessonData}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        onClick={() => handleViewLesson(item.id)}
                        extra={
                          <img
                            src={`http://localhost:8082${item.cover_image}`}
                            width={272}
                            height={'85%'}
                            style={{
                              objectFit: 'fill',
                            }}
                          />
                        }
                        style={{
                          position: 'relative',
                          backgroundColor: '#fff',
                          borderRadius: '10px',
                          cursor: 'pointer',
                        }}
                        className='shadow-sm mb-3 border border-info'
                      >
                        <List.Item.Meta
                          title=<div>
                            <h5>{item.title}</h5>
                          </div>
                          description=<p style={{ textAlign: 'justify' }}>
                            {item.description}
                          </p>
                        />
                        <div className='d-flex'>
                          <div>
                            <CalendarOutlined
                              className='mr-2'
                              style={{ color: '#068FFF', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline'
                              style={{ fontSize: '13px' }}
                            >
                              Đăng vào{' '}
                              <span className='font-weight-bold'>
                                {item.updated_at
                                  ? item.updated_at
                                  : item.created_at}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className='mt-3'>
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
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col span={7} className='ml-5'>
              <h4 style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                Bài học đã xem gần đây
              </h4>
              <div
                className='mt-4'
                style={{
                  height: '100vh',
                }}
              >
                <div>
                  <List
                    itemLayout='vertical'
                    size='large'
                    dataSource={lessonRecentData}
                    renderItem={(item) => (
                      <List.Item
                        onClick={() => handleViewLessonInRecentView(item)}
                        key={item.id}
                        style={{
                          position: 'relative',
                          backgroundColor: '#fff',
                          borderRadius: '10px',
                          cursor: 'pointer',
                        }}
                        className='shadow-sm mb-3 border border-info'
                      >
                        <List.Item.Meta
                          title=<div>
                            <h5>{item.lesson.title}</h5>
                          </div>
                          description=<p
                            style={{
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              lineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              marginBottom: 0,
                              textAlign: 'justify',
                            }}
                          >
                            {item.lesson.description}
                          </p>
                        />
                        <div className='d-flex'>
                          <div style={{ marginBottom: '6px' }}>
                            <FieldTimeOutlined
                              className='mr-2'
                              style={{ color: '#FFB534', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline'
                              style={{ fontSize: '13px' }}
                            >
                              Đã xem lúc{' '}
                              <span className='font-weight-bold'>
                                {item.created_at}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className='mt-3' style={{ display: 'flex' }}>
                          {item.lesson.category_lesson.map((item) => (
                            <Tag color='cyan'>{item}</Tag>
                          ))}
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Content>
  );
};

export default Lesson;
