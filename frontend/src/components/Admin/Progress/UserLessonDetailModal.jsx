import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserLessonDetailModal = ({ open, onCancel, token, userId, title }) => {
  const [userLessonDetailData, setUserLessonDetailData] = useState([]);

  const getUserLessonDetailData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/user-lesson-detail?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserLessonDetailData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId != null) {
      getUserLessonDetailData();
    }
  }, [userId]);

  return (
    <Modal
      open={open}
      width={900}
      onCancel={onCancel}
      title=<h5 className='mb-4'>Lịch sử xem bài học chi tiết: {title}</h5>
      footer={[
        <Button type='primary' onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Table
        bordered
        dataSource={userLessonDetailData}
        pagination={false}
        scroll={{
          y: 500,
        }}
        columns={[
          { title: 'Tên bài học', dataIndex: 'title' },
          { title: 'Số lần xem', dataIndex: 'total_view', width: '15%' },
        ]}
      />
    </Modal>
  );
};

export default UserLessonDetailModal;
