import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Alert, Button, List, Modal } from 'antd';
import React, { useEffect } from 'react';
import './modalResultStyle.css';
import { Link } from 'react-router-dom';

const ModalResult = ({
  open,
  score,
  timeFinish,
  review,
  totalCorrectAnswer,
  totalWrongAnswer,
}) => {
  return (
    <Modal
      width={800}
      open={open}
      title=<h5 style={{ fontWeight: 650 }}>Kết quả bài làm</h5>
      footer={[
        <Button
          key='retry'
          type='primary'
          onClick={() => window.location.reload()}
          className='mr-3'
        >
          Làm lại
        </Button>,
        <Link to={'/quiz'}>
          <Button key='back'>Trở về</Button>
        </Link>,
      ]}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '10px',
        }}
        className='mt-3 mb-3 shadow-sm p-3 border border-info'
      >
        <div>
          <TrophyOutlined style={{ color: '#FFC436', fontSize: '1rem' }} />
          <p
            className='d-inline ml-2'
            style={{ fontSize: '1rem', fontWeight: 700 }}
          >
            Điểm: {score}
          </p>
        </div>
        <div>
          <FieldTimeOutlined style={{ color: '#0766AD', fontSize: '1rem' }} />
          <p
            className='d-inline ml-2'
            style={{ fontSize: '1rem', fontWeight: 700 }}
          >
            Thời gian: {timeFinish}
          </p>
        </div>
        <div>
          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '1rem' }} />
          <p
            className='d-inline ml-2'
            style={{ fontSize: '1rem', fontWeight: 700 }}
          >
            Số câu đúng: {totalCorrectAnswer}
          </p>
        </div>
        <div>
          <CloseCircleOutlined style={{ color: '#D80032', fontSize: '1rem' }} />
          <p
            className='d-inline ml-2'
            style={{ fontSize: '1rem', fontWeight: 700 }}
          >
            Số câu sai: {totalWrongAnswer}
          </p>
        </div>
      </div>
      <List
        style={{ height: '520px', overflowY: 'auto' }}
        bordered
        dataSource={review}
        renderItem={(item) => (
          <List.Item>
            {item.correct === true ? (
              <Alert
                style={{ width: '100%' }}
                message={item.question_title}
                description=<div>
                  <p>
                    <span style={{ fontWeight: 700 }} className='mr-2'>
                      Đáp án đúng:
                    </span>
                    {item.correct_answer}
                  </p>
                </div>
                type='success'
                showIcon
              />
            ) : (
              <Alert
                style={{ width: '100%' }}
                message={item.question_title}
                description=<div>
                  <p>
                    <span style={{ fontWeight: 700 }} className='mr-2'>
                      Bạn chọn:
                    </span>
                    {item.user_choose}
                  </p>
                  <p>
                    <span style={{ fontWeight: 700 }} className='mr-2'>
                      Đáp án đúng:
                    </span>
                    {item.correct_answer}
                  </p>
                </div>
                type='error'
                showIcon
              />
            )}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ModalResult;
