import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { Table } from 'antd';

const HistoryChallengeCTF = ({ access_token, user_ID }) => {
  const [historySubmitData, setHistorySubmitData] = useState([]);

  const getHistorySubmitData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/history-submit/get-all-by-user/${user_ID}`,
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
          challenge_ctf_title: history.challenge_ctf_title,
          flag: history.flag,
          status: history.status,
          created_at: history.created_at,
        });
      });
      setHistorySubmitData(tmpArr);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },

    {
      title: 'Tên thử thách CTF',
      dataIndex: 'challenge_ctf_title',
      key: 'challenge_ctf_title',
    },
    {
      title: 'Đáp án',
      dataIndex: 'flag',
      key: 'flag',
      render: (flag) => (
        <span
          style={{
            fontWeight: 600,
          }}
        >
          {flag}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (statusSubmit) => (
        <span
          style={{
            textTransform: 'capitalize',
            color: statusSubmit === 'accept' ? '#52c41a' : '#dc3545',
            fontWeight: 700,
          }}
        >
          {statusSubmit}
        </span>
      ),
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];

  useEffect(() => {
    getHistorySubmitData();
  }, []);

  return <Table dataSource={historySubmitData} columns={columns} />;
};

export default HistoryChallengeCTF;
