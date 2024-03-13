import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import OverviewLesson from './OverviewLesson';
import HistoryLesson from './HistoryLesson';
import LessonTotalViewChart from './LessonTotalViewChart';
import StatisticUserLesson from './StatisticUserLesson';

const Progress = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    setUserId(user.user_id);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
          <OverviewLesson token={token} />
          <LessonTotalViewChart token={token} />
          <StatisticUserLesson token={token} />
          <HistoryLesson token={token} />
        </div>
      )}
    </div>
  );
};

export default Progress;
