import { Col, Row, Statistic } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OverviewLesson = ({ token }) => {
  const [overviewLessonData, setOverViewLessonData] = useState({});

  const getOverviewLessonData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/overview-lesson`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOverViewLessonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOverviewLessonData();
  }, []);

  return (
    <div>
      <h4 className='ml-1 mb-4'>Thống kê tổng quan</h4>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
      >
        <Col
          span={7}
          className='shadow-sm p-4 border border-info'
          style={{ borderRadius: '10px' }}
        >
          <Statistic
            title='Tổng số bài học'
            value={overviewLessonData.total_lesson}
          />
        </Col>
        <Col
          span={7}
          className='shadow-sm p-4 border border-info'
          style={{ borderRadius: '10px' }}
        >
          <Statistic
            title='Tổng số danh mục bài học'
            value={overviewLessonData.total_category_lesson}
          />
        </Col>
        <Col
          span={7}
          className='shadow-sm p-4 border border-info'
          style={{ borderRadius: '10px' }}
        >
          <Statistic
            title='Tổng số lượt xem'
            value={overviewLessonData.total_reading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default OverviewLesson;
