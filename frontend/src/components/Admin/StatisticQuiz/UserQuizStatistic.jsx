import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

const UserQuizStatistic = ({ userQuizStatisticData }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const convertTimeToLong = (time) => {
    const parts = time.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
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
      title: 'Điểm trung bình',
      dataIndex: 'avg_score',
      key: 'avg_score',
      sorter: (a, b) => a.avg_score - b.avg_score,
    },
    {
      title: 'Số câu đúng trung bình',
      dataIndex: 'avg_total_correct_answer',
      key: 'avg_total_correct_answer',
      sorter: (a, b) => a.avg_total_correct_answer - b.avg_total_correct_answer,
    },
    {
      title: 'Số câu sai trung bình',
      dataIndex: 'avg_total_wrong_answer',
      key: 'avg_total_wrong_answer',
      sorter: (a, b) => a.avg_total_wrong_answer - b.avg_total_wrong_answer,
    },
    {
      title: 'Số lần làm',
      dataIndex: 'total_try',
      key: 'total_try',
      sorter: (a, b) => a.total_try - b.total_try,
    },
    {
      title: 'Thời gian làm bài',
      dataIndex: 'time_avg',
      key: 'time_avg',
      sorter: (a, b) =>
        convertTimeToLong(a.time_avg) - convertTimeToLong(b.time_avg),
    },
  ];

  return (
    <Table
      pagination={{ pageSize: 5 }}
      columns={columns}
      dataSource={userQuizStatisticData}
    />
  );
};

export default UserQuizStatistic;
