import {
  Col,
  Row,
  Spin,
  Statistic,
  Table,
  message,
  Input,
  Button,
  Space,
  Menu,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import QuizScoreChart from './QuizScoreChart';
import QuizCorrectWrongPercentageChart from './QuizCorrectWrongPercentageChart';
import QuizTimeCompletionChar from './QuizTimeCompletionChar';
import UserQuizStatistic from './UserQuizStatistic';

const createDateObject = (dateString) => {
  const parts = dateString.split(' ');
  const datePart = parts[0];
  const timePart = parts[1];

  const dateParts = datePart.split('/');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const year = parseInt(dateParts[2], 10);

  const timeParts = timePart.split(':');
  const hour = parseInt(timeParts[0], 10);
  const minute = parseInt(timeParts[1], 10);
  const second = parseInt(timeParts[2], 10);

  return new Date(year, month, day, hour, minute, second);
};

const convertTimeToLong = (time) => {
  const parts = time.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
};

const StatisticQuiz = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [historyQuizData, setHistoryQuizData] = useState([]);
  const [quizStatisticOverview, setQuizStatisticOverview] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [quizScoreAvg, setQuizScoreAvg] = useState([]);
  const [quizCorrectWrongPercentage, setQuizCorrectWrongPercentage] = useState(
    []
  );
  const [userQuizData, setUserQuizData] = useState([]);
  const [quizTimeCompletion, setQuizTimeCompletion] = useState([]);
  const searchInput = useRef();
  const [currentStatisticMenu, setCurrentStatisticMenu] =
    useState('timeCompletion');

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'student_identity',
      key: 'student_identity',
      ...getColumnSearchProps('student_identity'),
    },
    {
      title: 'Họ tên',
      dataIndex: 'full_name',
      key: 'full_name',
      ...getColumnSearchProps('full_name'),
    },
    {
      title: 'Tên bài trắc nghiệm',
      dataIndex: 'quiz_title',
      key: 'quiz_title',
      ...getColumnSearchProps('quiz_title'),
    },
    {
      title: 'Thời gian làm bài',
      dataIndex: 'total_completion_time',
      key: 'total_completion_time',
      sorter: (a, b) =>
        convertTimeToLong(a.total_completion_time) -
        convertTimeToLong(b.total_completion_time),
    },
    {
      title: 'Số câu đúng',
      dataIndex: 'total_correct_answer',
      key: 'total_correct_answer',
      sorter: (a, b) => a.total_correct_answer - b.total_correct_answer,
    },
    {
      title: 'Số câu sai',
      dataIndex: 'total_wrong_answer',
      key: 'total_wrong_answer',
      sorter: (a, b) => a.total_wrong_answer - b.total_wrong_answer,
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) =>
        createDateObject(a.created_at) - createDateObject(b.created_at),
    },
  ];

  const handleOnClickStatistic = (e) => {
    setCurrentStatisticMenu(e.key);
  };

  const getUserQuizData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/statistic/user-quiz',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserQuizData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra', 2);
    }
  };

  const getHistoryQuizData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/score/all',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const listHistoryData = [];
      response.data.forEach((currentValue, index) => {
        const historyQuiz = {
          key: index + 1,
          student_identity: currentValue.user.student_identity,
          full_name: `${currentValue.user.lastname} ${currentValue.user.firstname}`,
          quiz_title: currentValue.quiz.name,
          total_completion_time: currentValue.total_completion_time,
          total_correct_answer: currentValue.total_correct_answer,
          total_wrong_answer: currentValue.total_wrong_answer,
          score: currentValue.score,
          created_at: convertISOToCustomFormat(currentValue.created_at),
        };
        listHistoryData.push(historyQuiz);
      });
      setHistoryQuizData(listHistoryData);
    } catch (error) {
      message.error('Có lỗi xảy ra', 2);
    }
  };

  const getQuizStatisticOverview = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/statistic/quiz-overview',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizStatisticOverview(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra', 2);
    }
  };

  const getQuizCorrectWrongPercentage = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/statistic/quiz-correct-wrong',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizCorrectWrongPercentage(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra', 2);
    }
  };

  const getQuizTimeCompletion = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/statistic/quiz-time-completion-avg',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizTimeCompletion(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra', 2);
    }
  };

  const getQuizScoreAvg = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/statistic/quiz-score-avg',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizScoreAvg(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra', 2);
    }
  };

  useEffect(() => {
    getUserQuizData();
    getQuizStatisticOverview();
    getHistoryQuizData();
    getQuizScoreAvg();
    getQuizCorrectWrongPercentage();
    getQuizTimeCompletion();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div style={{ height: '100vh' }}>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          size='large'
        />
      ) : (
        <>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              textTransform: 'capitalize',
            }}
          >
            <Col
              span={7}
              className='shadow-sm p-4 border border-info'
              style={{ borderRadius: '10px' }}
            >
              <Statistic
                title='Tổng số bài trắc nghiệm'
                value={quizStatisticOverview.total_quiz}
              />
            </Col>
            <Col
              span={7}
              className='shadow-sm p-4 border border-info'
              style={{ borderRadius: '10px' }}
            >
              <Statistic
                title='Tổng số câu hỏi'
                value={quizStatisticOverview.total_question}
              />
            </Col>
            <Col
              span={7}
              className='shadow-sm p-4 border border-info'
              style={{ borderRadius: '10px' }}
            >
              <Statistic
                title='Tổng số lượt làm'
                value={quizStatisticOverview.total_solve}
              />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col span={18} className=''>
              {currentStatisticMenu === 'timeCompletion' ? (
                <QuizTimeCompletionChar
                  quizTimeCompletionData={quizTimeCompletion}
                />
              ) : currentStatisticMenu === 'scoreAvg' ? (
                <QuizScoreChart quizScoreData={quizScoreAvg} />
              ) : (
                <QuizCorrectWrongPercentageChart
                  quizPercentageData={quizCorrectWrongPercentage}
                />
              )}
            </Col>
            <Col span={5} className='ml-5'>
              <div>
                <p
                  style={{
                    fontSize: '1.1rem',
                    marginBottom: '6px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                  }}
                  className='text-center'
                >
                  Chọn thống kê theo
                </p>
                <Menu
                  className='border border-info'
                  selectedKeys={[currentStatisticMenu]}
                  onClick={handleOnClickStatistic}
                  style={{ borderRadius: '10px' }}
                  items={[
                    {
                      label: 'Thời Gian Làm Bài Trung Bình',
                      key: 'timeCompletion',
                    },
                    {
                      type: 'divider',
                    },
                    {
                      label: 'Điểm Trung Bình',
                      key: 'scoreAvg',
                    },

                    {
                      type: 'divider',
                    },
                    {
                      label: 'Tỷ Lệ Câu Đúng/Sai',
                      key: 'percentageCorrectWrong',
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col span={24}>
              <h5 style={{ fontWeight: 700 }}>Thống kê theo người dùng</h5>
              <UserQuizStatistic userQuizStatisticData={userQuizData} />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col span={24}>
              <h5 style={{ fontWeight: 700 }}>Lịch sử làm bài</h5>
              <Table
                pagination={{ pageSize: 5 }}
                columns={columns}
                dataSource={historyQuizData}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default StatisticQuiz;
