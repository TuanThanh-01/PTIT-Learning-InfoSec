import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { Table, message } from 'antd';

const HistoryQuiz = ({ access_token, userID }) => {
  const [historyResult, setHistoryResult] = useState([]);
  const getHistoryData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/score/get-all-score-by-user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const tmpArr = [];
      response.data.forEach((history, index) => {
        if (history.created_at !== null) {
          history.created_at = convertISOToCustomFormat(history.created_at);
        }
        tmpArr.push({
          id: index + 1,
          title: history.quiz.name,
          score: history.score,
          total_completion_time: history.total_completion_time,
          total_correct_answer: history.total_correct_answer,
          total_wrong_answer: history.total_wrong_answer,
          created_at: history.created_at,
        });
      });
      console.log(tmpArr);
      setHistoryResult(tmpArr);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 3);
    }
  };

  useEffect(() => {
    getHistoryData();
  }, []);

  const colums = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên bài trắc nghiệm',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Số câu đúng',
      dataIndex: 'total_correct_answer',
      key: 'total_correct_answer',
    },
    {
      title: 'Số câu sai',
      dataIndex: 'total_wrong_answer',
      key: 'total_wrong_answer',
    },
    {
      title: 'Thời gian hoàn thành',
      dataIndex: 'total_completion_time',
      key: 'total_completion_time',
    },
    { title: 'Kết quả', dataIndex: 'score', key: 'score' },
    {
      title: 'Thời gian làm bài',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];

  return <Table dataSource={historyResult} columns={colums} />;
};

export default HistoryQuiz;
