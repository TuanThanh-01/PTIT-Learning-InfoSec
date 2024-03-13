import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Card, Col, List, Row, Spin, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';

const ContainerHeight = 400;

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [token, setToken] = useState('');

  const getQuizData = async (access_token) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/quiz/all`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
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
      setSearchResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    getQuizData(user.access_token);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    if (e.target.value !== '') {
      setSearchResult(
        quizData.filter((item) =>
          removeVietnameseTones(item.name.toLowerCase()).includes(
            removeVietnameseTones(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setSearchResult(quizData);
    }
  };

  return (
    <Content style={{ overflow: 'initial' }}>
      {isLoading ? (
        <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        />
      ) : (
        <div
          style={{
            height: '100vh',
          }}
        >
          <div>
            <div
              className='mb-4 mt-4'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div className='ml-4'>
                <h2 style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                  Danh sách bài trắc nghiệm
                </h2>
              </div>
              <Search
                className='mr-4'
                placeholder='Nhập tên bài trắc nghiệm'
                allowClear
                style={{ width: '20rem' }}
                onChange={handleSearch}
              />
            </div>
            <List
              itemLayout='vertical'
              size='large'
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              pagination={{
                pageSize: 8,
                style: { top: 0 },
              }}
              dataSource={searchResult}
              renderItem={(item) => (
                <List.Item key={item.id} className='mt-2'>
                  <Card
                    className='border'
                    cover={
                      <img
                        src={`http://localhost:8082${item.image}`}
                        height={236}
                      />
                    }
                  >
                    <Meta
                      title=<div>
                        <Link
                          to={`/viewQuiz/${item.name}`}
                          style={{
                            color: '#000',
                            textTransform: 'capitalize',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                          }}
                        >
                          {item.name}
                        </Link>
                      </div>
                      description={item.description}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
    </Content>
  );
};

export default Quiz;
