import {
  CalendarOutlined,
  DownOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import {
  Col,
  Dropdown,
  List,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Timeline,
  Typography,
  message,
} from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';
import { convertDateVnCustom } from '../../utils/ConvertDateVn';
import LabModal from './LabModal';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { useSearchParams } from 'react-router-dom';

const Lab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [labData, setLabData] = useState([]);
  const [categoryLessonData, setCategoryLessonData] = useState([]);
  const [searchText, setSearchedText] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState({});
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState();
  const [historyPracticeLab, setHistoryPracticeLab] = useState([]);
  const [searchParams] = useSearchParams();

  const handleChange = (value) => {
    setCurrentTag(value);
  };

  const listData = useMemo(() => {
    return labData.reduce((prev, cur) => {
      if (
        String(cur.tag).toLowerCase().includes(currentTag.toLowerCase()) &&
        removeVietnameseTones(cur.title.toLowerCase()).includes(
          removeVietnameseTones(searchText.toLowerCase())
        )
      ) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }, [labData, currentTag, searchText]);

  const getCategoryLessonData = async (token) => {
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
      arr.push({ value: '', label: 'Tất Cả' });
      response.data.forEach((ele) => {
        arr.push({ value: ele, label: ele });
      });
      setCategoryLessonData(arr);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const getHistoryPracticeLab = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/history-practice-lab/all-by-user?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tmpArr = [];
      response.data.forEach((item) => {
        tmpArr.push({
          title: item.lab.title,
          created_at: convertISOToCustomFormat(item.created_at),
        });
      });
      setHistoryPracticeLab(tmpArr);
    } catch (error) {
      console.log(error);
    }
  };

  const getLabData = async (token) => {
    try {
      const response = await axios.get('http://localhost:8082/api/v1/lab/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLabData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    setUserId(user.user_id);
    getHistoryPracticeLab(user.user_id, user.access_token);
    getCategoryLessonData(user.access_token);
    getLabData(user.access_token);
    const title = searchParams.get('title');
    if (title) {
      setSearchedText(title);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <Content style={{ overflow: 'initial' }} className='p-3'>
      {isLoading ? (
        <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        />
      ) : (
        <div
          style={{
            height: '100vh',
          }}
          className='container'
        >
          <div className='mt-3'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h2>Danh sách bài thực hành</h2>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '30px' }}>
                  <Select
                    style={{
                      width: '300px',
                    }}
                    defaultValue=''
                    onChange={handleChange}
                    options={categoryLessonData}
                  ></Select>
                </div>
                <Search
                  placeholder='Nhập tiêu đề thực hành'
                  allowClear
                  value={searchText}
                  style={{ width: '20rem' }}
                  onChange={(e) => {
                    setSearchedText(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          {itemData !== null ? (
            <LabModal
              open={openModal}
              item={itemData}
              token={token}
              userId={userId}
              onCancel={() => {
                setItemData(null);
                setOpenModal(false);
              }}
            />
          ) : (
            <></>
          )}
          <div className='mt-4'>
            <Row style={{ display: 'flex' }}>
              <Col span={24}>
                <List
                  itemLayout='vertical'
                  size='large'
                  pagination={{ pageSize: 5 }}
                  dataSource={listData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      className='shadow-sm mb-4 border border-info'
                      style={{
                        borderRadius: '10px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setItemData(item);
                        setOpenModal(true);
                      }}
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
                        </div>
                        description={item.description}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
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
                          <div style={{ bottom: 0, left: 0 }}>
                            <Tag color='cyan'>{item.tag}</Tag>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Content>
  );
};

export default Lab;
