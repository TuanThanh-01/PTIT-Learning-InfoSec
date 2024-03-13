import { Row } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Title } from 'chart.js/auto';

Chart.register(Title);

const LessonTotalViewChart = ({ token }) => {
  const [lessonViewData, setLessonViewData] = useState([]);
  const [idLessonTitle, setIdLessonTitle] = useState([]);

  const getLessonViewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/lesson-view`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tmp = [];
      response.data.forEach((item) => {
        tmp.push({ id: item.id, title: item.title });
      });
      setIdLessonTitle(tmp);
      setLessonViewData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLessonViewData();
  }, []);

  const data = {
    labels: lessonViewData.map((data) => data.id),
    datasets: [
      {
        label: 'Tổng số lượt xem',
        data: lessonViewData.map((data) => data.total_view),
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
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
          text: 'Thống kê tổng số lượt xem của từng bài học',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 15,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            const id = parseInt(context[0].label);
            return idLessonTitle.find((item) => item.id === id).title;
          },
        },
      },
    },
  };

  return (
    <Row className='mt-5'>
      <Bar data={data} options={options} />
    </Row>
  );
};

export default LessonTotalViewChart;
