import { DashOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import UserChallengeCTFModal from './UserChallengeCTFModal';

const StatisticUserChallengeCTF = ({ statisticUserChallengeCTF, token }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState();
  const [usernameData, setUsernameData] = useState('');
  const [studentIdentityData, setStudentIdentityData] = useState('');
  const searchInput = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleViewDetailUserChallengeCTF = (
    userId,
    username,
    studentIdentity
  ) => {
    setUserId(userId);
    setUsernameData(username);
    setStudentIdentityData(studentIdentity);
    setOpenModal(true);
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
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Số bài đã thử',
      dataIndex: 'total_try',
      key: 'total_try',
    },
    {
      title: 'Số bài làm đúng',
      dataIndex: 'total_correct',
      key: 'total_correct',
    },
    {
      title: 'Số bài làm sai',
      dataIndex: 'total_wrong',
      key: 'total_wrong',
    },
    {
      title: 'Số lần nộp',
      dataIndex: 'total_submit',
      key: 'total_submit',
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
              handleViewDetailUserChallengeCTF(
                record.user_id,
                record.username,
                record.student_identity
              )
            }
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <UserChallengeCTFModal
        open={openModal}
        studentIdentityData={studentIdentityData}
        userId={userId}
        usernameData={usernameData}
        onCancel={() => setOpenModal(false)}
        accessToken={token}
      />
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={statisticUserChallengeCTF}
      />
    </>
  );
};

export default StatisticUserChallengeCTF;
