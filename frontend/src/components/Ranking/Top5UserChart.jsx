import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Top5UserChart = ({ token }) => {
  const [top5UserData, setTop5UserData] = useState([]);

  const getTop5UserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/ranking/get-top-5-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTop5UserData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!');
    }
  };

  useEffect(() => {
    getTop5UserData();
  }, []);

  const data = {
    labels: top5UserData.map((item) => item.student_identity),
    datasets: [
      {
        label: 'Điểm số',
        data: top5UserData.map((item) => item.score),
        backgroundColor: '#f26c6d',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Xếp hạng 5 người đạt điểm cao nhất',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 15,
          position: 'top',
        },
      },
    },
  };

  return (
    <div
      className='mt-4 p-3 shadow-sm'
      style={{ backgroundColor: '#fff', borderRadius: '10px' }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default Top5UserChart;
