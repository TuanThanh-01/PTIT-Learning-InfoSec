import { Button, Col, Divider, List, Row, Spin, Tag, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateLabModal from './CreateLabModal';
import 'react-quill/dist/quill.snow.css';
import { convertDateVnCustom } from '../../../utils/ConvertDateVn';
import { CalendarOutlined } from '@ant-design/icons';
import { removeVietnameseTones } from '../../../utils/RemoveVietnameseTones';
import { Link } from 'react-router-dom';
import HistoryLabPractice from './HistoryLabPractice';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const Lab = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [labData, setLabData] = useState([]);
  const [item, setItem] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoryLessonData, setCategoryLessonData] = useState([]);
  const [historyPracticeData, setHistoryPracticeData] = useState([]);

  const getCategoryLessonData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/category-lesson/get-all-category-lesson-name',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const arr = [];
      response.data.forEach((ele) => {
        arr.push({ value: ele, label: ele });
      });
      setCategoryLessonData(arr);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const getLabData = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/v1/lab/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLabData(response.data);
      setSearchResult(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const sendDataCreateLab = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/lab/create',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getLabData();
      message.success('Tạo bài thực hành mới thành công!!');
    } catch (error) {
      message.error('Có lỗi xảy ra!!!');
    }
  };

  const sendDataUpdateLab = async (data, id) => {
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/lab/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getLabData();
      message.success('Cập nhật bài thực hành thành công!!');
    } catch (error) {
      message.error('Có lỗi xảy ra!!!');
    }
  };

  const deleteLab = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/lab/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getLabData();
      message.success('Xóa bài thực hành mới thành công!!');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra!!!');
    }
  };

  const getHistoryPracticeLab = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/history-practice-lab/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tmpArr = [];
      response.data.forEach((item) => {
        if (item.created_at !== null) {
          item.created_at = convertISOToCustomFormat(item.created_at);
        }
        tmpArr.push({
          id: item.id,
          username: item.user.lastname + ' ' + item.user.firstname,
          student_identity: item.user.student_identity,
          title: item.lab.title,
          tag: item.tag,
          created_at: item.created_at,
        });
      });
      setHistoryPracticeData(tmpArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryLessonData();
    getLabData();
    getHistoryPracticeLab();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    if (e.target.value !== '') {
      setSearchResult(
        labData.filter((item) =>
          removeVietnameseTones(item.title.toLowerCase()).includes(
            removeVietnameseTones(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setSearchResult(labData);
    }
  };

  const onCreate = (values) => {
    if (item === null) {
      sendDataCreateLab(values);
    } else {
      sendDataUpdateLab(values, item.id);
    }
    setOpenModal(false);
  };

  const handleCreateLab = () => {
    setItem(null);
    setOpenModal(true);
  };

  const handleUpdateLab = (item) => {
    setOpenModal(true);
    setItem(item);
  };

  const handleDeleteLab = (id) => {
    deleteLab(id);
    setIsLoading(true);
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
          <div className='mb-5'>
            <div
              style={{
                marginBottom: 25,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Search
                placeholder='Nhập tiêu đề thực hành'
                allowClear
                style={{ width: '20rem' }}
                onChange={handleSearch}
              />
              <div>
                <Button
                  className='mr-3'
                  type='primary'
                  style={{ background: '#008170' }}
                  onClick={handleCreateLab}
                >
                  Thêm mới bài thực hành
                </Button>
              </div>
            </div>
          </div>
          <CreateLabModal
            open={openModal}
            item={item}
            categoryLesson={categoryLessonData}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          />
          <div>
            <List
              itemLayout='vertical'
              size='large'
              pagination={{ pageSize: 4 }}
              dataSource={searchResult}
              renderItem={(item) => (
                <Row>
                  <Col span={18}>
                    <List.Item
                      key={item.id}
                      className='shadow-sm mb-4 border border-info'
                      style={{ borderRadius: '10px' }}
                    >
                      <List.Item.Meta
                        title=<div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <h5>{item.title}</h5>
                          </div>
                          <div>
                            <CalendarOutlined
                              className='mr-2'
                              style={{ color: '#068FFF', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline'
                              style={{ fontSize: '13px' }}
                            >
                              Cập nhật vào:
                              <span className='font-weight-bold ml-1'>
                                {item.updated_at !== null
                                  ? convertDateVnCustom(item.updated_at)
                                  : convertDateVnCustom(item.created_at)}
                              </span>
                            </p>
                          </div>
                        </div>
                        description={item.description}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <p
                            style={{
                              marginBottom: '10px',
                              fontSize: '1rem',
                              fontWeight: '600',
                              display: 'inline',
                              marginRight: '2px',
                            }}
                          >
                            Đường dẫn bài thực hành:
                          </p>
                          <Link
                            to={item.url}
                            className='ml-1'
                            target='_blank'
                            style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                            }}
                          >
                            {item.url}
                          </Link>
                        </div>
                        <div style={{ bottom: 0, left: 0 }}>
                          <Tag color='cyan'>{item.tag}</Tag>
                        </div>
                      </div>
                    </List.Item>
                  </Col>
                  <Col
                    span={6}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '50px',
                    }}
                  >
                    <Button
                      className='mr-2'
                      type='primary'
                      style={{ backgroundColor: '#1AACAC' }}
                      onClick={() => {
                        handleUpdateLab(item);
                      }}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      danger
                      type='primary'
                      onClick={() => handleDeleteLab(item.id)}
                    >
                      Xóa
                    </Button>
                  </Col>
                </Row>
              )}
            />
          </div>
          <Row className='mt-5'>
            <h3>Lịch sử làm bài</h3>
            <Col span={24} className='mt-3'>
              <HistoryLabPractice
                token={token}
                historyPracticeData={historyPracticeData}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Lab;
