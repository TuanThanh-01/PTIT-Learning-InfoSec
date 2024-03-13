import {
  BulbOutlined,
  CalendarOutlined,
  CheckOutlined,
  DownloadOutlined,
  FileOutlined,
  FireOutlined,
  FlagOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Button, Col, List, Row, Select, Spin, Tag, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import CollectionCreateForm from './collectionCreateForm';

const ChallengeCTF = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [challengeCTFData, setChallengeCTFData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getChallengeCTFData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/challenge-ctf/all',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChallengeCTFData(response.data);
      setIsLoading(false);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const sendDataCreateChallengeCTF = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('level', data.level);
    formData.append('tag', data.tag);
    formData.append('hint', data.hint);
    formData.append('flag', data.flag);
    formData.append('point', data.point);
    formData.append('file', data.file);
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/challenge-ctf/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await getChallengeCTFData();
      message.success('Tạo thử thách CTF thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const sendUpdateChallengeCTF = async (data, id) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('level', data.level);
    formData.append('tag', data.tag);
    formData.append('hint', data.hint);
    formData.append('flag', data.flag);
    formData.append('point', data.point);
    formData.append('file', data.file);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/challenge-ctf/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await getChallengeCTFData();
      message.success('Cập nhật thử thách CTF thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const deleteChallengeCTFById = async (challengeCTFId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/challenge-ctf/${challengeCTFId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getChallengeCTFData();
      message.success('Xóa thử thách CTF thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  useEffect(() => {
    getChallengeCTFData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const listData = useMemo(() => {
    return challengeCTFData.reduce((prev, cur) => {
      if (
        String(cur.title).toLowerCase().includes(searchedText.toLowerCase()) &&
        String(cur.level).toLowerCase().includes(selectedLevel.toLowerCase()) &&
        String(cur.tag).toLowerCase().includes(selectedTag.toLowerCase())
      ) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }, [challengeCTFData, selectedLevel, selectedTag, searchedText]);

  const handleCreateChallenge = () => {
    setItem(null);
    setOpenModal(true);
  };

  const handleUpdateChallengeCTF = (values) => {
    setOpenModal(true);
    setItem(values);
  };

  const handleDeleteChallengeCTF = (challengeCTFId) => {
    if (deleteChallengeCTFById(challengeCTFId)) {
      setIsLoading(true);
    }
  };

  const onCreate = (values) => {
    if (values.file !== undefined) {
      values.file = values.file[0].originFileObj;
    }
    if (item === null) {
      sendDataCreateChallengeCTF(values);
    } else {
      sendUpdateChallengeCTF(values, item.id);
    }
    setOpenModal(false);
  };

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
        <div>
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Search
                placeholder='Nhập tiêu đề thử thách CTF'
                allowClear
                style={{ width: '20rem' }}
                onChange={(e) => {
                  setSearchedText(e.target.value);
                }}
              />
              <div className='d-inline ml-5'>
                <p
                  className='d-inline mr-3 font-weight-bold'
                  style={{ fontSize: '1rem' }}
                >
                  Mức độ:
                </p>
                <Select
                  defaultValue=''
                  style={{ width: '8rem' }}
                  onChange={(value) => setSelectedLevel(value)}
                  options={[
                    { value: '', label: '---Tất cả---' },
                    { value: 'easy', label: 'Dễ' },
                    { value: 'medium', label: 'Trung bình' },
                    { value: 'hard', label: 'Khó' },
                  ]}
                />
              </div>
              <div className='d-inline ml-5'>
                <p
                  className='d-inline mr-3 font-weight-bold'
                  style={{ fontSize: '1rem' }}
                >
                  Chủ đề:
                </p>
                <Select
                  defaultValue=''
                  style={{ width: '11rem' }}
                  onChange={(value) => setSelectedTag(value)}
                  options={[
                    { value: '', label: '---Tất cả---' },
                    { value: 'web', label: 'Web' },
                    { value: 'forensics', label: 'Forensics' },
                    { value: 'binary', label: 'Binary' },
                    {
                      value: 'reverse engineering',
                      label: 'Reverse Engineering',
                    },
                    { value: 'cryptography', label: 'Cryptography' },
                    { value: 'miscellaneous', label: 'Miscellaneous' },
                  ]}
                />
              </div>
            </div>
            <div>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170', width: '8rem' }}
                onClick={handleCreateChallenge}
              >
                Thêm mới
              </Button>
            </div>
          </div>
          <div></div>
          <CollectionCreateForm
            open={openModal}
            item={item}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          ></CollectionCreateForm>
          <List
            itemLayout='vertical'
            size='large'
            pagination={{
              pageSize: 5,
            }}
            dataSource={listData}
            renderItem={(item) => (
              <List.Item key={item.title} itemID={item.id} className='mt-3'>
                <Row>
                  <Col
                    span={18}
                    className='border p-3 shadow-sm'
                    style={{ borderRadius: '10px' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p
                          className='d-inline'
                          style={{ fontSize: '1.1rem', fontWeight: 700 }}
                        >
                          {item.title}
                        </p>
                      </div>
                      <div className='mt-1'>
                        <Tag
                          color='cyan'
                          style={{ textTransform: 'capitalize' }}
                        >
                          {item.tag}
                        </Tag>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <p className='d-inline' style={{ fontSize: '1.1rem' }}>
                        <span className='d-inline font-weight-bold mr-1'>
                          Nội dung:
                        </span>
                        {item.content}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1rem',
                      }}
                      className='mt-2 mb-1'
                    >
                      <div>
                        <p className='d-inline mr-2 font-weight-bold'>
                          Mức độ:{' '}
                        </p>
                        {item.level === 'easy' ? (
                          <Tag color='#87d068'>Dễ</Tag>
                        ) : (
                          <></>
                        )}
                        {item.level === 'medium' ? (
                          <Tag color='#F4CE14'>Trung bình</Tag>
                        ) : (
                          <></>
                        )}
                        {item.level === 'hard' ? (
                          <Tag color='#f50'>Khó</Tag>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <FlagOutlined style={{ color: '#362FD9' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Flag:{' '}
                        </p>
                        <Tag color='red'>{item.flag}</Tag>
                      </div>
                      <div>
                        <FireOutlined style={{ color: '#C70039' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Điểm:{' '}
                        </p>
                        {item.point}
                      </div>
                      <div>
                        <CheckOutlined style={{ color: '#1A5D1A' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Làm đúng :{' '}
                        </p>
                        {item.total_solve}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      className='mt-2'
                    >
                      <div>
                        <CalendarOutlined style={{ color: '#706233' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Thời gian tạo:{' '}
                        </p>
                        <Tag color='geekblue'>
                          {convertISOToCustomFormat(item.created_at)}
                        </Tag>
                      </div>
                      <div>
                        <CalendarOutlined style={{ color: '#706233' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Thời gian cập nhật:{' '}
                        </p>
                        <Tag color='geekblue'>
                          {item.updated_at ? (
                            convertISOToCustomFormat(item.updated_at)
                          ) : (
                            <></>
                          )}
                        </Tag>
                      </div>
                      <div>
                        <FileOutlined style={{ color: '#1A5D1A' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          File:{' '}
                        </p>
                        {item.url_file ? (
                          <Button
                            size='small'
                            icon={<DownloadOutlined />}
                            href={`http://localhost:8082/files/${item.url_file}`}
                          >
                            Tải file
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className='mt-2'>
                      <BulbOutlined
                        style={{ color: '#F4CE14', fontSize: '1.1rem' }}
                      />
                      <p className='d-inline font-weight-bold ml-1'>Gợi ý: </p>
                      {item.hint}
                    </div>
                  </Col>
                  <Col
                    span={6}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      className='mr-2'
                      type='primary'
                      style={{ backgroundColor: '#1AACAC' }}
                      onClick={() => {
                        handleUpdateChallengeCTF(item);
                      }}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      danger
                      type='primary'
                      onClick={() => handleDeleteChallengeCTF(item.id)}
                    >
                      Xóa
                    </Button>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ChallengeCTF;
