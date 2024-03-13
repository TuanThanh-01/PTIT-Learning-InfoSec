import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Title } from 'chart.js/auto';

Chart.register(Title);
const QuizScoreChart = ({ quizScoreData }) => {
  const [quizScore, setQuizScore] = useState({
    labels: quizScoreData.map((data) => data.quiz_title),
    datasets: [
      {
        label: 'Điểm trung bình',
        data: quizScoreData.map((data) => data.avg_value),
        backgroundColor: ['#6DB9EF'],
      },
    ],
  });

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thống kê điểm trung bình',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 15,
        },
      },
    },
  };
  return <Bar data={quizScore} options={options} />;
};

export default QuizScoreChart;
