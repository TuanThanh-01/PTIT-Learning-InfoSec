import { Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RankingAllUser = ({ token }) => {
  const [userChallengeData, setUserChallengeData] = useState([]);

  const getUserChallengeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/ranking/list-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tmp = [];
      response.data.forEach((item, index) => {
        tmp.push({
          id: index + 1,
          username: item.username,
          student_identity: item.student_identity,
          score: item.score,
          total_try: item.total_try,
          total_correct: item.total_correct,
          total_submit: item.total_submit,
        });
      });
      setUserChallengeData(tmp);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!');
    }
  };

  useEffect(() => {
    getUserChallengeData();
  }, []);

  const columns = [
    { title: 'STT', dataIndex: 'id', key: 'id' },
    {
      title: 'Họ tên',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'student_identity',
      key: 'student_identity',
    },
    {
      title: 'Tổng điểm',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Tổng số bài đã thử',
      dataIndex: 'total_try',
      key: 'total_try',
    },
    {
      title: 'Tổng số bài làm đúng',
      dataIndex: 'total_correct',
      key: 'total_correct',
    },
    {
      title: 'Tổng số lần nộp bài',
      dataIndex: 'total_submit',
      key: 'total_submit',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={userChallengeData}
      pagination={false}
      virtual
      className='mt-3 border border-info p-1 shadow'
      style={{ borderRadius: '10px' }}
      scroll={{
        y: 400,
      }}
    />
  );
};

export default RankingAllUser;
