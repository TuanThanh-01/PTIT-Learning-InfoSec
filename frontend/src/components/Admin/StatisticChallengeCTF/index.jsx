import { Col, Menu, Row, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import HistorySubmitChallengeCTF from './HistorySubmitChallengeCTF';
import StatisticOverview from './StatisticOverview';
import StatisticUserChallengeCTF from './StatisticUserChallengeCTF';
import TagCompleteUnCompleteChart from './TagCompleteUnCompleteChart';
import TagTotalSubmitChart from './TagTotalSubmitChart';
import StatisticChallengeCTFAll from './StatisticChallengeCTFAll';

const StatisticChallengeCTF = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [historySubmitChallengeCTFData, setHistorySubmitChallengeCTFData] =
    useState([]);
  const [
    statisticChallengeCTFOverviewData,
    setStatisticChallengeCTFOverviewData,
  ] = useState({});
  const [tagTotalSubmitData, setTagTotalSubmitData] = useState([]);
  const [tagTotalCompletedData, setTagTotalCompletedData] = useState([]);
  const [tagTotalUnCompletedData, setTagTotalUnCompletedData] = useState([]);
  const [tagTotalChallengeCTF, setTagTotalChallengeCTF] = useState([]);
  const [statisticUserChallengeCTFData, setStatisticUserChallengeCTFData] =
    useState([]);
  const [statisticChallengeCTFData, setStatisticChallengeCTFData] = useState(
    []
  );
  const [currentMenuStatistic, setCurrentMenuStatistic] =
    useState('totalSubmit');

  const getHistorySubmitChallengeCTFData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/history-submit/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.forEach((historySubmit) => {
        if (historySubmit.created_at !== null) {
          historySubmit.created_at = convertISOToCustomFormat(
            historySubmit.created_at
          );
        }
      });
      setHistorySubmitChallengeCTFData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatisticChallengeCTFOverviewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/challenge-ctf-overview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatisticChallengeCTFOverviewData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTagTotalCompletedData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/tag-total-complete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTagTotalCompletedData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTagTotalUnCompletedData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/tag-total-un-complete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTagTotalUnCompletedData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTagTotalSubmitData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/tag-total-submit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTagTotalSubmitData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatisticUserChallengeCTFData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/user-challenge-ctf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatisticUserChallengeCTFData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickStatisticMenu = (e) => {
    setCurrentMenuStatistic(e.key);
  };

  const getTagTotalChallengeCTF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/tag-total-challenge`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTagTotalChallengeCTF(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatisticChallengeCTFData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/challenge-ctf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatisticChallengeCTFData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatisticUserChallengeCTFData();
    getTagTotalChallengeCTF();
    getTagTotalUnCompletedData();
    getHistorySubmitChallengeCTFData();
    getStatisticChallengeCTFOverviewData();
    getTagTotalCompletedData();
    getStatisticChallengeCTFData();
    getTagTotalSubmitData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
        <>
          <StatisticOverview
            statisticChallengeCTFOverview={statisticChallengeCTFOverviewData}
            tagTotalChallenge={tagTotalChallengeCTF}
          />
          <Row className='mt-5'>
            <Col span={24}>
              <h5 className='mb-3' style={{ fontWeight: 700 }}>
                Thống kê theo người dùng
              </h5>
              <StatisticUserChallengeCTF
                statisticUserChallengeCTF={statisticUserChallengeCTFData}
                token={token}
              />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col span={18} className='mr-5'>
              <h5 className='mb-3' style={{ fontWeight: 700 }}>
                Thống kê theo dạng bài
              </h5>
              {currentMenuStatistic === 'totalSubmit' ? (
                <TagTotalSubmitChart tagTotalSubmitData={tagTotalSubmitData} />
              ) : (
                <TagCompleteUnCompleteChart
                  tagTotalCompleteData={tagTotalCompletedData}
                  tagTotalUnCompleteData={tagTotalUnCompletedData}
                />
              )}
            </Col>
            <Col span={5}>
              <div>
                <p
                  style={{
                    fontSize: '1.1rem',
                    marginBottom: '6px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                  }}
                  className='text-center mb-2'
                >
                  Chọn thống kê dạng bài
                </p>
                <Menu
                  className='border border-info'
                  selectedKeys={[currentMenuStatistic]}
                  onClick={handleOnClickStatisticMenu}
                  style={{ borderRadius: '10px' }}
                  items={[
                    {
                      label: 'Tổng số lần nộp',
                      key: 'totalSubmit',
                    },
                    {
                      type: 'divider',
                    },
                    {
                      label: 'Tổng số bài làm đúng/sai',
                      key: 'totalCorrectWrong',
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col span={24}>
              <h5 className='mb-3' style={{ fontWeight: 700 }}>
                Thống kê theo thử thách CTF
              </h5>
              <StatisticChallengeCTFAll
                statisticChallengeCTFData={statisticChallengeCTFData}
                token={token}
              />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col span={24}>
              <h5 className='mb-3' style={{ fontWeight: 700 }}>
                Lịch sử nộp bài
              </h5>
              <HistorySubmitChallengeCTF
                historySubmitChallengeCTFData={historySubmitChallengeCTFData}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default StatisticChallengeCTF;
