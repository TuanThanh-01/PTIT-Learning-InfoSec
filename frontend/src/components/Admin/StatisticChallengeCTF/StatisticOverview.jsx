import { Col, Row, Statistic } from 'antd';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Title } from 'chart.js/auto';

Chart.register(Title);
const StatisticOverview = ({
  statisticChallengeCTFOverview,
  tagTotalChallenge,
}) => {
  const data = {
    labels: tagTotalChallenge.map((data) => data.tag),
    datasets: [
      {
        label: 'Tổng số bài',
        data: tagTotalChallenge.map((data) => data.totalChallengeCTF),
        backgroundColor: ['rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgb(75, 192, 192)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thống kê tổng số thử thách CTF theo từng dạng bài',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 15,
        },
      },
    },
  };
  return (
    <div>
      <h5 className='mb-3' style={{ fontWeight: 700 }}>
        Thống kê tổng quan
      </h5>
      <Row>
        <Col span={5} className='mr-5 mt-4'>
          <Row
            className='shadow-sm p-4 border border-info'
            style={{ borderRadius: '10px' }}
          >
            <Statistic
              title='Tổng số thử thách CTF'
              value={statisticChallengeCTFOverview.total_challenge}
            />
          </Row>
          <Row
            className='mt-3 shadow-sm p-4 border border-info'
            style={{ borderRadius: '10px' }}
          >
            <Statistic
              title='Tổng số dạng bài'
              value={statisticChallengeCTFOverview.total_tag}
            />
          </Row>
          <Row
            className='mt-3 shadow-sm p-4 border border-info'
            style={{ borderRadius: '10px' }}
          >
            <Statistic
              title='Tổng số lượt nộp bài'
              value={statisticChallengeCTFOverview.total_submit}
            />
          </Row>
        </Col>
        <Col span={18}>
          <Bar data={data} options={options} />
        </Col>
      </Row>
    </div>
  );
};

export default StatisticOverview;
