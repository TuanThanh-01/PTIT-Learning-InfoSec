import { Button, Table, Tag } from 'antd';
import Modal from 'antd/es/modal/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const UserChallengeCTFModal = ({
  open,
  userId,
  usernameData,
  studentIdentityData,
  onCancel,
  accessToken,
}) => {
  const [userChallengeCTFDetailData, setUserChallengeCTFDetailData] = useState(
    []
  );
  const getUserChallengeCTFDetailData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/user-challenge-ctf-detail?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      response.data.forEach((useChallengeCTFDetail) => {
        if (useChallengeCTFDetail.created_at !== null) {
          useChallengeCTFDetail.created_at = convertISOToCustomFormat(
            useChallengeCTFDetail.created_at
          );
        }
      });
      setUserChallengeCTFDetailData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId != null) {
      getUserChallengeCTFDetailData();
    }
  }, [userId]);

  return (
    <Modal
      open={open}
      width={900}
      onCancel={onCancel}
      title=<h5 className='mb-4'>
        Lịch sử nộp bài: {usernameData} - {studentIdentityData}
      </h5>
      footer={[
        <Button type='primary' onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Table
        bordered
        dataSource={userChallengeCTFDetailData}
        pagination={false}
        scroll={{
          y: 500,
        }}
        columns={[
          { title: 'Tên thử thách CTF', dataIndex: 'title' },
          {
            title: 'Mức độ',
            dataIndex: 'level',
            render: (levelData) =>
              levelData === 'easy' ? (
                <Tag color='#87d068'>Dễ</Tag>
              ) : levelData === 'medium' ? (
                <Tag color='#F4CE14'>Trung bình</Tag>
              ) : levelData === 'hard' ? (
                <Tag color='#f50'>Khó</Tag>
              ) : (
                <></>
              ),
          },
          { title: 'Danh mục', dataIndex: 'tag' },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
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
          { title: 'Thời gian nộp', dataIndex: 'created_at' },
        ]}
      />
    </Modal>
  );
};

export default UserChallengeCTFModal;
