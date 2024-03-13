import { Select, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import HistoryLab from './HistoryLab';
import HistoryQuiz from './HistoryQuiz';
import HistoryChallengeCTF from './HistoryChallengeCTF';

const HistoryUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState('');
  const [currentTag, setCurrentTag] = useState('lab');
  const [title, setTitle] = useState('bài thực hành');

  const handleChange = (value) => {
    setCurrentTag(value);
    if (value === 'lab') {
      setTitle('bài thực hành');
    }
    if (value === 'ctf') {
      setTitle('thử thách CTF');
    }
    if (value === 'quiz') {
      setTitle('bài trắc nghiệm');
    }
  };

  const options = [
    { value: 'lab', label: 'Bài thực hành' },
    { value: 'ctf', label: 'Thử thách CTF' },
    { value: 'quiz', label: 'Bài trắc nghiệm' },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setUserId(user.user_id);
    setToken(user.access_token);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
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
        <div
          style={{
            height: '100vh',
          }}
          className='container'
        >
          <div
            className='mt-3'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div>
              <h2>Lịch sử làm {title}</h2>
            </div>
            <div className='mt-1'>
              <Select
                style={{
                  width: '300px',
                }}
                defaultValue={currentTag}
                onChange={handleChange}
                options={options}
              ></Select>
            </div>
          </div>
          <div className='mt-5'>
            {currentTag === 'lab' ? (
              <HistoryLab token={token} userId={userId} />
            ) : (
              <></>
            )}
            {currentTag === 'quiz' ? (
              <HistoryQuiz access_token={token} userID={userId} />
            ) : (
              <></>
            )}

            {currentTag === 'ctf' ? (
              <HistoryChallengeCTF access_token={token} user_ID={userId} />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </Content>
  );
};

export default HistoryUser;
