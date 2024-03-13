import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Title } from 'chart.js/auto';

Chart.register(Title);

const TagTotalSubmitChart = ({ tagTotalSubmitData }) => {
  const data = {
    labels: tagTotalSubmitData.map((data) => data.tag),
    datasets: [
      {
        label: 'Tổng số lần nộp',
        data: tagTotalSubmitData.map((data) => data.totalSubmit),
        backgroundColor: ['rgba(54, 162, 235, 0.5)'],
        borderColor: ['rgb(54, 162, 235)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thống kê theo tổng số lần nộp theo dạng bài',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 15,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TagTotalSubmitChart;
