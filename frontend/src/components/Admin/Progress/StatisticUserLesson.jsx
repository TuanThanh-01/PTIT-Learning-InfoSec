import { DashOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import UserLessonDetailModal from './UserLessonDetailModal';

const StatisticUserLesson = ({ token }) => {
  const [userLessonData, setUserLessonData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const searchInput = useRef();

  const getUserLessonData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/user-lesson-overview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserLessonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetailUserLesson = (userId, student_identity, username) => {
    setTitle(`${username} - ${student_identity}`);
    setUserId(userId);
    setOpenModal(true);
  };

  useEffect(() => {
    getUserLessonData();
  }, []);

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
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Số bài học đã xem',
      dataIndex: 'total_lesson_learn',
      key: 'total_lesson_learn',
      sorter: (a, b) => a.total_lesson_learn - b.total_lesson_learn,
    },
    {
      title: 'Chi tiết',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <div className='ml-3'>
          <Button
            type='text'
            size='small'
            icon={<DashOutlined style={{ fontSize: '1rem' }} />}
            onClick={() =>
              handleViewDetailUserLesson(
                record.user_id,
                record.student_identity,
                record.username
              )
            }
          />
        </div>
      ),
    },
  ];

  return (
    <Row className='mt-5'>
      <Col span={24}>
        <h4 className='ml-1 mb-4'>Thống kê theo người dùng</h4>
        <div>
          <UserLessonDetailModal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            token={token}
            userId={userId}
            title={title}
          />
          <Table columns={columns} dataSource={userLessonData} />
        </div>
      </Col>
    </Row>
  );
};

export default StatisticUserLesson;
