import { Card, Divider, Tag, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendLab = ({ token, tag }) => {
  const [labData, setLabData] = useState([]);
  const navigate = useNavigate();

  const getLabData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/lab/get-by-tag?tag=${tag}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLabData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 2);
    }
  };

  const handleOnClickNavigateLab = (title) => {
    navigate(`/lab?title=${title}`);
  };

  useEffect(() => {
    getLabData();
  }, []);

  return (
    <div>
      {labData.length === 0 ? (
        <></>
      ) : (
        <div>
          <Divider orientation='left' plain>
            <p
              style={{
                fontSize: '1.2rem',
              }}
            >
              Gợi ý bài thực hành
            </p>
          </Divider>
          <div className=''>
            {labData.map((value, index) => (
              <Card
                size='small'
                title={value.title}
                style={{ width: '88%', cursor: 'pointer' }}
                className='ml-3 mb-3 border border-info'
                key={index}
                onClick={() => handleOnClickNavigateLab(value.title)}
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Tag color='cyan' style={{ textTransform: 'capitalize' }}>
                    {value.tag}
                  </Tag>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendLab;
