import { PlayCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';

const LabModal = ({ open, onCancel, item, token, userId }) => {
  const createHistoryPracticeLab = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/history-practice-lab/create',
        { labId: item.id, userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      width={800}
      open={open}
      title=<h3>{item.title}</h3>
      onCancel={onCancel}
      footer={null}
    >
      <div className='mt-4'>
        <div style={{ display: 'flex' }}>
          <div>
            <h4 className='mr-3'>Làm bài thực hành:</h4>
          </div>
          <div>
            <Button
              type='primary'
              icon={<PlayCircleOutlined />}
              style={{ width: '100px' }}
              size='small'
              className='mt-1'
              onClick={() => {
                createHistoryPracticeLab();
                window.open(`${item.url}`, '_blank');
              }}
            >
              Làm Bài
            </Button>
          </div>
        </div>
        <hr />
        <div>
          <h4 className='mt-2 mb-3'>Hướng dẫn:</h4>
        </div>
        <div
          style={{ padding: 0 }}
          className='ql-editor'
          dangerouslySetInnerHTML={{ __html: item.guide }}
        ></div>
      </div>
    </Modal>
  );
};

export default LabModal;
