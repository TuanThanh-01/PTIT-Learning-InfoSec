import { CalendarOutlined } from '@ant-design/icons';
import { Card, Divider, Tag, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { convertDateVnCustom } from '../../utils/ConvertDateVn';
import { useNavigate } from 'react-router-dom';

const RecommendLesson = ({ token, lessonId }) => {
  const [lessonData, setLessonData] = useState([]);
  const navigate = useNavigate();

  const getRandomlessonData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/lesson/random-lesson?lessonId=${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      setLessonData(response.data);
    } catch (error) {
      console.log(error);
      message.error('Có lỗi xảy ra!!!', 2);
    }
  };

  const createHistoryReadingLesson = async (lessonId) => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    const data = {
      userId: user.user_id,
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

  const handleRedirectLesson = (id) => {
    createHistoryReadingLesson(id);
    navigate(`/viewLesson/${id}`);
    location.reload();
  };

  useEffect(() => {
    getRandomlessonData();
  }, []);

  return (
    <div>
      <Divider orientation='left' plain>
        <p
          style={{
            fontSize: '1.2rem',
          }}
        >
          Gợi ý bài học tiếp theo
        </p>
      </Divider>
      <div className=''>
        {lessonData.map((value, index) => (
          <Card
            size='small'
            title={value.title}
            style={{ width: '88%', cursor: 'pointer' }}
            className='ml-3 mb-3 border border-info'
            onClick={() => handleRedirectLesson(value.id)}
            key={index}
          >
            <p
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                lineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {value.description}
            </p>
            <div className='d-flex'>
              <div>
                <CalendarOutlined
                  className='mr-2'
                  style={{ color: '#068FFF', fontSize: '1rem' }}
                />
                <p className='d-inline' style={{ fontSize: '13px' }}>
                  Đăng vào{' '}
                  <span className='font-weight-bold'>
                    {value.updated_at ? value.updated_at : value.created_at}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendLesson;
