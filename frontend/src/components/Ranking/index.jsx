import { Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import Top5UserChart from './Top5UserChart';
import RankingAllUser from './RankingAllUser';

const Ranking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
          className='container'
        >
          <Top5UserChart token={token} />
          <h4 className='mt-5'>Bảng xếp hạng</h4>
          <RankingAllUser token={token} />
        </div>
      )}
    </Content>
  );
};

export default Ranking;
