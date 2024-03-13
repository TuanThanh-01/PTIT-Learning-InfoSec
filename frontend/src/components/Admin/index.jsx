import React, { useEffect, useState } from 'react';
import {
  UserOutlined,
  UnorderedListOutlined,
  CloudOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, Spin, theme } from 'antd';
import logoPtit from '../../assets/logo.png';
import CategoryLesson from './CategoryLesson';
import Lesson from './Lesson';
import Progress from './Progress';
import Question from './Question';
import Quiz from './Quiz';
import StatisticQuiz from './StatisticQuiz';
import User from './User';
import ChallengeCTF from './ChallengeCTF';
import getCurrentDateFormatVietnamese from '../../utils/GetCurrentDateFormatVietnamese';
import './style.css';
import { useNavigate } from 'react-router-dom';
import StatisticChallengeCTF from './StatisticChallengeCTF';
import axios from 'axios';
import Lab from './Lab';

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem('Category Lesson', '1', <UnorderedListOutlined />),
  getItem('Lesson', '2', <UnorderedListOutlined />),
  getItem('Post', '3', <UnorderedListOutlined />),
  getItem('Progress', '4', <UnorderedListOutlined />),
  getItem('Question', '5', <UnorderedListOutlined />),
  getItem('Quiz', '6', <UnorderedListOutlined />),
  getItem('Score', '7', <UnorderedListOutlined />),
  getItem('User', '9', <UnorderedListOutlined />),
  getItem('ChallengeCTF', 10, <UnorderedListOutlined />),
  getItem('Lab', 10, <UnorderedListOutlined />),
];

const AdminHomePage = () => {
  const [itemSelect, setItemSelect] = useState('category-lesson');
  const [accessToken, setAccessToken] = useState('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const removeToken = async () => {
    const response = await axios.get(
      'http://localhost:8082/api/v1/auth/logout',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('user_data');
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    if (!user) {
      navigate('/login');
    }
    if (user && user.role === 'ADMIN') {
      setAccessToken(user.access_token);
    }
    if (user && user.role === 'USER') {
      navigate('/lesson');
    }

    setIsLoading(false);
  }, []);

  const handleClickMenu = (e) => {
    if (e.key === 'category-lesson') {
      setItemSelect('category-lesson');
    }
    if (e.key === 'lesson') {
      setItemSelect('lesson');
    }
    if (e.key === 'post') {
      setItemSelect('post');
    }
    if (e.key === 'progress') {
      setItemSelect('progress');
    }
    if (e.key === 'question') {
      setItemSelect('question');
    }
    if (e.key === 'quiz') {
      setItemSelect('quiz');
    }
    if (e.key === 'score') {
      setItemSelect('score');
    }
    if (e.key === 'user') {
      setItemSelect('user');
    }
    if (e.key === 'challenge-ctf') {
      setItemSelect('challenge-ctf');
    }
    if (e.key === 'statistic-challenge-ctf') {
      setItemSelect('statistic-challenge-ctf');
    }
    if (e.key === 'lab') {
      setItemSelect('lab');
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          size='large'
        ></Spin>
      ) : (
        <Layout>
          <Sider breakpoint='lg' collapsedWidth='0' width={250}>
            <div className='p-1'>
              <img
                src={logoPtit}
                style={{
                  width: '20%',
                }}
                className='mt-2 rounded'
              />
              <p
                className='d-inline ml-2 font-weight-bold'
                style={{ color: '#fff', lineHeight: '32px' }}
              >
                PTIT Learning InfoSec
              </p>
            </div>
            <Menu
              className='mt-2'
              style={{ gap: 3 }}
              theme='dark'
              onClick={handleClickMenu}
              defaultSelectedKeys={[itemSelect]}
            >
              <Menu.Item key='category-lesson' icon={<UnorderedListOutlined />}>
                Danh mục bài học
              </Menu.Item>
              <Menu.Item key='lesson' icon={<UnorderedListOutlined />}>
                Bài học
              </Menu.Item>
              <Menu.Item key='progress' icon={<UnorderedListOutlined />}>
                Thống kê bài học
              </Menu.Item>
              <Menu.Item key='lab' icon={<UnorderedListOutlined />}>
                Bài Thực hành
              </Menu.Item>
              <Menu.Item key='challenge-ctf' icon={<UnorderedListOutlined />}>
                Thử thách CTF
              </Menu.Item>
              <Menu.Item
                key='statistic-challenge-ctf'
                icon={<UnorderedListOutlined />}
              >
                Thống kê thử thách CTF
              </Menu.Item>
              <Menu.Item key='question' icon={<UnorderedListOutlined />}>
                Danh mục câu hỏi
              </Menu.Item>
              <Menu.Item key='quiz' icon={<UnorderedListOutlined />}>
                Bài Trắc nghiệm
              </Menu.Item>
              <Menu.Item key='score' icon={<UnorderedListOutlined />}>
                Thống kê trắc nghiệm
              </Menu.Item>
              <Menu.Item key='user' icon={<UnorderedListOutlined />}>
                Người dùng
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div className='ml-4' style={{ display: 'flex' }}>
                <CloudOutlined
                  style={{ fontSize: '2rem', color: '#AEDEFC' }}
                  className='mr-3'
                />
                <p style={{ fontWeight: '700' }}>
                  {getCurrentDateFormatVietnamese()}
                </p>
              </div>
              <Dropdown overlay={menu}>
                <div className='mr-4'>
                  <b className='mr-3'>Xin chào, Administrator</b>
                  <Avatar size='large' icon={<UserOutlined />} className='' />
                </div>
              </Dropdown>
            </Header>
            <Content
              style={{
                margin: '24px 16px 0',
              }}
            >
              <div
                className='main-container'
                style={{
                  padding: 24,
                  height: '100%',
                  background: colorBgContainer,
                  overflowY: 'auto',
                }}
              >
                {itemSelect === 'category-lesson' ? (
                  <CategoryLesson token={accessToken} />
                ) : (
                  <></>
                )}
                {itemSelect === 'challenge-ctf' ? (
                  <ChallengeCTF token={accessToken} />
                ) : (
                  <></>
                )}
                {itemSelect === 'statistic-challenge-ctf' ? (
                  <StatisticChallengeCTF token={accessToken} />
                ) : (
                  <></>
                )}
                {itemSelect === 'lesson' ? (
                  <Lesson token={accessToken} />
                ) : (
                  <></>
                )}
                {itemSelect === 'post' ? <Post /> : <></>}
                {itemSelect === 'progress' ? <Progress /> : <></>}
                {itemSelect === 'question' ? (
                  <Question token={accessToken} />
                ) : (
                  <></>
                )}
                {itemSelect === 'quiz' ? <Quiz token={accessToken} /> : <></>}
                {itemSelect === 'score' ? (
                  <StatisticQuiz token={accessToken} />
                ) : (
                  <></>
                )}
                {itemSelect === 'user' ? <User token={accessToken} /> : <></>}
                {itemSelect === 'lab' ? <Lab token={accessToken} /> : <></>}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Học Viện Công Nghệ Bưu Chính Viễn Thông &copy; 2023 Produced by
              Nguyễn Tuấn Thành - B19DCAT179
            </Footer>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default AdminHomePage;
