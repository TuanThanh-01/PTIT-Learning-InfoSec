import React from 'react';
import { Line } from 'react-chartjs-2';

function epoch_to_hh_mm_ss(epoch) {
  return new Date(epoch * 1000).toISOString().substr(11, 8);
}
const QuizTimeCompletionChar = ({ quizTimeCompletionData }) => {
  const data = {
    labels: quizTimeCompletionData.map((data) => data.quiz_title),
    datasets: [
      {
        label: 'Thời gian',
        data: quizTimeCompletionData.map((data) => data.time_avg),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thống kê thời gian làm bài trung bình',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 15,
        },
      },
      y: {
        ticks: {
          callback: function (v) {
            return epoch_to_hh_mm_ss(v);
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            console.log(context.parsed.y);
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += epoch_to_hh_mm_ss(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default QuizTimeCompletionChar;
