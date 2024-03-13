import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

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

const HistoryLesson = ({ token }) => {
  const [historyLessonData, setHistoryLessonData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef();

  const getHistoryLessonData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/history-lesson`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.forEach((historyLesson) => {
        if (historyLesson.created_at !== null) {
          historyLesson.created_at = convertISOToCustomFormat(
            historyLesson.created_at
          );
        }
      });
      setHistoryLessonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistoryLessonData();
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
      title: 'Tên bài học',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Danh mục bài học',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <>
          {category.map((tag) => (
            <Tag color='geekblue'>{tag}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Thời gian truy cập',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) =>
        createDateObject(a.created_at) - createDateObject(b.created_at),
    },
  ];

  return (
    <Row className='mt-5'>
      <Col span={24}>
        <h4 className='mb-4 ml-1'>Lịch sử xem bài học</h4>
        <Table columns={columns} dataSource={historyLessonData} />
      </Col>
    </Row>
  );
};

export default HistoryLesson;
