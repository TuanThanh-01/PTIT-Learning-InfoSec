import { Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../utils/ConvertDate';

const HistoryLab = ({ userId, token }) => {
  const [historyPracticeLab, setHistoryPracticeLab] = useState([]);
  const getHistoryPracticeLab = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/history-practice-lab/all-by-user?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tmpArr = [];
      response.data.forEach((item, index) => {
        tmpArr.push({
          id: index + 1,
          title: item.lab.title,
          created_at: convertISOToCustomFormat(item.created_at),
        });
      });
      setHistoryPracticeLab(tmpArr);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 3);
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên bài thực hành',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Thời gian làm bài',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];

  useEffect(() => {
    getHistoryPracticeLab();
  }, []);

  return (
    <div>
      <Table dataSource={historyPracticeLab} columns={columns} />
    </div>
  );
};

export default HistoryLab;
