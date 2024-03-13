import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Title } from 'chart.js/auto';

Chart.register(Title);

const TagCompleteUnCompleteChart = ({
  tagTotalCompleteData,
  tagTotalUnCompleteData,
}) => {
  const options = {
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Thống kê số bài làm đúng/sai theo dạng bài',
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
        label: 'Số bài làm đúng',
        data: tagTotalCompleteData.map((data) => data.totalCompleted),
        backgroundColor: ['rgb(34,139,34)'],
      },
      {
        label: 'Số bài làm sai',
        data: tagTotalUnCompleteData.map((data) => data.totalUnComplete),
        backgroundColor: ['rgb(220,20,60)'],
      },
    ],
    labels: tagTotalCompleteData.map((data) => data.tag),
  };
  return <Bar data={data} options={options} />;
};

export default TagCompleteUnCompleteChart;
