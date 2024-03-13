import { CheckSquareOutlined } from '@ant-design/icons';
import { Card, Divider, Tag, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendChallengeCTF = ({ token }) => {
  const [challengeCTFData, setChallengeCTFData] = useState([]);
  const navigate = useNavigate();

  const getRandomChallengeCTFData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/challenge-ctf/random`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChallengeCTFData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 2);
    }
  };

  const handleOnClickNavigateChallengeCTF = (title) => {
    navigate(`/challenge-ctf?title=${title}`);
  };

  useEffect(() => {
    getRandomChallengeCTFData();
  }, []);

  return (
    <div>
      <Divider orientation='left' plain>
        <p
          style={{
            fontSize: '1.2rem',
          }}
        >
          Gợi ý thử thách CTF
        </p>
      </Divider>
      <div className=''>
        {challengeCTFData.map((value, index) => (
          <Card
            size='small'
            title={value.title}
            style={{ width: '88%', cursor: 'pointer' }}
            className='ml-3 mb-3 border border-info'
            extra={
              <div>
                {value.level === 'easy' ? <Tag color='#87d068'>Dễ</Tag> : <></>}
                {value.level === 'medium' ? (
                  <Tag color='#F4CE14'>Trung bình</Tag>
                ) : (
                  <></>
                )}
                {value.level === 'hard' ? <Tag color='#f50'>Khó</Tag> : <></>}
              </div>
            }
            key={index}
            onClick={() => handleOnClickNavigateChallengeCTF(value.title)}
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
              {value.content}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Tag color='cyan' style={{ textTransform: 'capitalize' }}>
                {value.tag}
              </Tag>
              <div>
                <CheckSquareOutlined
                  style={{ color: 'green', fontSize: '1rem' }}
                />
                <p className='d-inline ml-2' style={{ fontWeight: 500 }}>
                  Làm đúng: <span>{value.total_solve}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendChallengeCTF;
