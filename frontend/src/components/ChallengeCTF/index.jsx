import {
  BarChartOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';
import {
  Card,
  Col,
  List,
  Menu,
  Progress,
  Row,
  Spin,
  Tag,
  Timeline,
  message,
} from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import SingleChallengeCTF from './SingleChallengeCTF';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { useParams, useSearchParams } from 'react-router-dom';

const { SubMenu } = Menu;

const ChallengeCTF = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [dataChallengeCTF, setDataChallengeCTF] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [singleChallengeCTFData, setSingleChallengeCTFData] = useState({});
  const [token, setToken] = useState('');
  const [searchText, setSearchedText] = useState('');
  const [userId, setUserId] = useState('');
  const [statisticChallengeCTFUser, setStatisticChallengeCTFUser] = useState(
    {}
  );
  const [searchParams] = useSearchParams();

  const getChallengeCTFData = async (access_token, user_ID) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/challenge-ctf/all-by-user?userId=${user_ID}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setDataChallengeCTF(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const getStatisticChallengeCTFUser = async (access_token, user_ID) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/challenge-ctf-user?userId=${user_ID}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setStatisticChallengeCTFUser(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const listData = useMemo(() => {
    return dataChallengeCTF.reduce((prev, cur) => {
      if (
        String(cur.title).toLowerCase().includes(searchText.toLowerCase()) &&
        String(cur.level).toLowerCase().includes(currentLevel.toLowerCase()) &&
        String(cur.tag).toLowerCase().includes(currentCategory.toLowerCase())
      ) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }, [dataChallengeCTF, currentLevel, currentCategory, searchText]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleDoChallengeCTF = (item) => {
    setOpenModal(true);
    setSingleChallengeCTFData(item);
  };

  const handleOnClickCategory = (e) => {
    setCurrentCategory(e.key);
  };

  const handleOnClickLevel = (e) => {
    setCurrentLevel(e.key);
  };

  useEffect(() => {
    if (!openModal) {
      const user = JSON.parse(localStorage.getItem('user_data'));
      setToken(user.access_token);
      setUserId(user.user_id);
      getChallengeCTFData(user.access_token, user.user_id);
      getStatisticChallengeCTFUser(user.access_token, user.user_id);
      const title = searchParams.get('title');
      if (title) {
        setSearchedText(title);
      }
      if (isLoading) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  }, [openModal]);

  return (
    <Content style={{ overflow: 'initial' }}>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          size='large'
        />
      ) : (
        <div style={{ height: '100vh' }}>
          <Row>
            <Col span={24} className='container'>
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                  height: '5rem',
                }}
                className='shadow-sm mt-3'
              >
                <div
                  style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <h3
                    style={{ color: '#dc3545', fontWeight: 700 }}
                    className='mt-4 ml-4'
                  >
                    PTIT CTF Challenge
                  </h3>
                  <h4
                    className='mt-4 mr-4'
                    style={{ color: '#0766AD', fontWeight: 700 }}
                  >
                    Điểm: {statisticChallengeCTFUser.user_score}
                  </h4>
                </div>
              </div>
              <SingleChallengeCTF
                open={openModal}
                onCancel={handleCancel}
                singleChallengeCTFData={singleChallengeCTFData}
                token={token}
                userID={userId}
              />
              <Menu
                className='mt-3'
                mode='inline'
                style={{ borderRadius: '10px' }}
              >
                <SubMenu
                  key='SubMenu'
                  icon={<BarChartOutlined style={{ fontSize: '1.7rem' }} />}
                  title=<p
                    className='mt-3'
                    style={{
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      color: '#0766AD',
                    }}
                  >
                    Theo Dõi Tiến Độ Bài Làm
                  </p>
                >
                  <Menu.Item key='web'>
                    <div
                      className='mt-3'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                          Web Exploitation
                        </p>
                      </div>
                      <div className='mr-4' style={{ width: '500px' }}>
                        <Progress
                          percent={
                            statisticChallengeCTFUser.percentage_web_exploitation
                          }
                          status={
                            statisticChallengeCTFUser.percentage_web_exploitation ===
                            100
                              ? 'success'
                              : 'active'
                          }
                        />
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key='forensics'>
                    <div
                      className='mt-3'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                          Forensics
                        </p>
                      </div>
                      <div className='mr-4' style={{ width: '500px' }}>
                        <Progress
                          percent={
                            statisticChallengeCTFUser.percentage_forensics
                          }
                          status={
                            statisticChallengeCTFUser.percentage_forensics ===
                            100
                              ? 'success'
                              : 'active'
                          }
                        />
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key='binary'>
                    <div
                      className='mt-3'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                          Binary Exploitation
                        </p>
                      </div>
                      <div className='mr-4' style={{ width: '500px' }}>
                        <Progress
                          percent={
                            statisticChallengeCTFUser.percentage_binary_exploitation
                          }
                          status={
                            statisticChallengeCTFUser.percentage_binary_exploitation ===
                            100
                              ? 'success'
                              : 'active'
                          }
                        />
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key='reverse'>
                    <div
                      className='mt-3'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                          Reverse Engineering
                        </p>
                      </div>
                      <div className='mr-4' style={{ width: '500px' }}>
                        <Progress
                          percent={
                            statisticChallengeCTFUser.percentage_reverse_engineering
                          }
                          status={
                            statisticChallengeCTFUser.percentage_reverse_engineering ===
                            100
                              ? 'success'
                              : 'active'
                          }
                        />
                      </div>
                    </div>
                  </Menu.Item>

                  <Menu.Item key='cryptography'>
                    <div
                      className='mt-3'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                          Cryptography
                        </p>
                      </div>
                      <div className='mr-4' style={{ width: '500px' }}>
                        <Progress
                          percent={
                            statisticChallengeCTFUser.percentage_cryptography
                          }
                          status={
                            statisticChallengeCTFUser.percentage_cryptography ===
                            100
                              ? 'success'
                              : 'active'
                          }
                        />
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key='miscellaneous'>
                    <div
                      className='mt-3'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                          Miscellaneous
                        </p>
                      </div>
                      <div className='mr-4' style={{ width: '500px' }}>
                        <Progress
                          percent={
                            statisticChallengeCTFUser.percentage_miscellaneous
                          }
                          status={
                            statisticChallengeCTFUser.percentage_miscellaneous ===
                            100
                              ? 'success'
                              : 'active'
                          }
                        />
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key='all' style={{ backgroundColor: '#fff' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      className='mt-2'
                    >
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 700 }}>
                          Tất Cả
                        </p>
                      </div>
                      <div className='mr-4' style={{ width: '500px' }}>
                        <Progress
                          percent={statisticChallengeCTFUser.percentage_all}
                          status={
                            statisticChallengeCTFUser.percentage_all === 100
                              ? 'success'
                              : 'active'
                          }
                        />
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Row className='mt-4'>
                <Col
                  className='pb-4'
                  span={8}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                  }}
                >
                  <div className='ml-4 mr-4'>
                    <p
                      className='mt-1'
                      style={{ fontSize: '1.3rem', fontWeight: 700 }}
                    >
                      Lọc & Tìm kiếm
                    </p>

                    <div className='mt-4'>
                      <p
                        style={{
                          fontSize: '1rem',
                          marginBottom: '6px',
                          fontWeight: 600,
                        }}
                        className='mb-3'
                      >
                        Tìm kiếm theo tên
                      </p>
                      <Search
                        placeholder='Nhập tên thử thách ctf'
                        allowClear
                        onChange={(e) => {
                          setSearchedText(e.target.value);
                        }}
                        value={searchText}
                      />
                    </div>
                    <div className='mt-3'>
                      <p
                        style={{
                          fontSize: '1rem',
                          marginBottom: '6px',
                          fontWeight: 600,
                        }}
                        className='mb-3'
                      >
                        Lọc theo mức độ
                      </p>
                      <Menu
                        className='border'
                        selectedKeys={[currentLevel]}
                        onClick={handleOnClickLevel}
                        style={{ borderRadius: '10px' }}
                        items={[
                          {
                            label: 'Tất cả',
                            key: '',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Dễ',
                            key: 'easy',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Trung bình',
                            key: 'medium',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Khó',
                            key: 'hard',
                          },
                        ]}
                      />
                    </div>
                    <div className='mt-3'>
                      <p
                        style={{
                          fontSize: '1rem',
                          marginBottom: '6px',
                          fontWeight: 600,
                        }}
                        className='mb-3'
                      >
                        Lọc theo danh mục
                      </p>
                      <Menu
                        className='border'
                        selectedKeys={[currentCategory]}
                        onClick={handleOnClickCategory}
                        style={{ borderRadius: '10px' }}
                        items={[
                          {
                            label: 'Tất cả',
                            key: '',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Web Exploitation',
                            key: 'web',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Forensics',
                            key: 'forensics',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Binary Exploitation',
                            key: 'binary',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Reverse Engineering',
                            key: 'reverse',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Cryptography',
                            key: 'cryptography',
                          },
                          {
                            type: 'divider',
                          },
                          {
                            label: 'Misellaneous',
                            key: 'misellaneous',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </Col>
                <Col span={16}>
                  <List
                    pagination={{ pageSize: 6 }}
                    itemLayout='vertical'
                    size='large'
                    className='ml-2'
                    grid={{
                      gutter: 16,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    dataSource={listData}
                    renderItem={(item) => (
                      <List.Item onClick={() => handleDoChallengeCTF(item)}>
                        <Card
                          className='mb-5 shadow-sm'
                          style={{
                            width: 340,
                            cursor: 'pointer',
                            borderColor:
                              item.is_complete === true
                                ? '#52c41a'
                                : item.is_complete === false
                                ? '#D80032'
                                : '',
                            borderWidth: '2px',
                          }}
                          title={
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div style={{ fontSize: '1.1rem' }}>
                                {item.title}
                              </div>
                            </div>
                          }
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              height: 60,
                            }}
                          >
                            <div>
                              <FireOutlined style={{ color: '#C70039' }} />
                              <p
                                className='d-inline ml-2'
                                style={{ fontWeight: 500 }}
                              >
                                Điểm: <span>{item.point}</span>
                              </p>
                            </div>
                            <div>
                              <CheckSquareOutlined
                                style={{ color: 'green', fontSize: '1rem' }}
                              />
                              <p
                                className='d-inline ml-2'
                                style={{ fontWeight: 500 }}
                              >
                                Làm đúng: <span>{item.total_solve}</span>
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Tag
                              color='cyan'
                              style={{ textTransform: 'capitalize' }}
                            >
                              {item.tag}
                            </Tag>
                            <div>
                              {item.level === 'easy' ? (
                                <Tag
                                  color='green'
                                  className='text-center'
                                  style={{ width: '4.5rem' }}
                                >
                                  Dễ
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {item.level === 'medium' ? (
                                <Tag color='gold'>Trung bình</Tag>
                              ) : (
                                <></>
                              )}
                              {item.level === 'hard' ? (
                                <Tag
                                  color='red'
                                  className='text-center'
                                  style={{ width: '4.5rem' }}
                                >
                                  Khó
                                </Tag>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </Content>
  );
};

export default ChallengeCTF;
