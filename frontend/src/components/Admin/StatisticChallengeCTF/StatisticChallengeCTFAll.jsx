import { DashOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import ChallengeCTFModal from './ChallengeCTFModal';

const StatisticChallengeCTFAll = ({ statisticChallengeCTFData, token }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [challengeCTFId, setChallengeCTFId] = useState();
  const [title, setTitle] = useState('');
  const [openModal, setOpenModal] = useState(false);

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

  const handleViewDetailChallengeCTF = (challengeCTFID, titleChallenge) => {
    setChallengeCTFId(challengeCTFID);
    setTitle(titleChallenge);
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
      title: 'Tên thử thách CTF',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Mức độ',
      dataIndex: 'level',
      key: 'level',
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
    {
      title: 'Danh mục',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Tổng số bài làm đúng',
      dataIndex: 'total_correct',
      key: 'total_correct',
    },
    {
      title: 'Tổng số bài làm sai',
      dataIndex: 'total_wrong',
      key: 'total_wrong',
    },
    {
      title: 'Tổng số lần nộp',
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
              handleViewDetailChallengeCTF(
                record.challenge_ctf_id,
                record.title
              )
            }
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <ChallengeCTFModal
        open={openModal}
        challengeCTFId={challengeCTFId}
        title={title}
        onCancel={() => setOpenModal(false)}
        accessToken={token}
      />
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={statisticChallengeCTFData}
      />
    </>
  );
};

export default StatisticChallengeCTFAll;
