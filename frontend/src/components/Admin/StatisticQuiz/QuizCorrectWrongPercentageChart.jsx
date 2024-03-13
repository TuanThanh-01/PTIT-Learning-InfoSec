import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Title } from 'chart.js/auto';

Chart.register(Title);

const QuizCorrectWrongPercentageChart = ({ quizPercentageData }) => {
  const options = {
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Thống kê tỷ lệ câu đúng/sai',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 15,
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  let data = {
    datasets: [
      {
        label: '% Câu Đúng',
        data: quizPercentageData.map((data) => data.total_correct),
        backgroundColor: ['rgb(34,139,34)'],
      },
      {
        label: '% Câu Sai',
        data: quizPercentageData.map((data) => data.total_wrong),
        backgroundColor: ['rgb(220,20,60)'],
      },
    ],
    labels: quizPercentageData.map((data) => data.quiz_title),
  };
  return <Bar data={data} options={options} />;
};

export default QuizCorrectWrongPercentageChart;
