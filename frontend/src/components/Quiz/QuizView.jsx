import { Card, List, Progress, Spin, message } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormatedTime } from '../../utils/GetFormatedTime';
import ModalResult from './ModalResult';
import './quizViewStyle.css';

const QuizView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [timeFinish, setTimeFinish] = useState('');
  const [score, setScore] = useState(0);
  const [answerChoose, setAnswerChoose] = useState([]);
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState(0);
  const [totalWrongAnswer, setTotalWrongAnswer] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [review, setReview] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const { quizTitle } = useParams();

  let timer;

  const getPercentage = (currentQuestion, totalQuestion) => {
    return Math.round((currentQuestion / totalQuestion) * 100);
  };

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  const getQuestionData = async (access_token) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/question/all-by-quiz-name?quizTitle=${quizTitle}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const questionDataTmp = [];
      const lstQuestionAnswer = [];
      response.data.forEach((question) => {
        questionDataTmp.push({
          ...question,
          options: [
            question.option1,
            question.option2,
            question.option3,
            question.option4,
          ],
        });
        lstQuestionAnswer.push(question.correct_answer);
      });
      setQuestionData(questionDataTmp);
      setAnswer(lstQuestionAnswer);
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  const calculateScore = (lstAnswerChoose) => {
    let totalScore = 0;
    let correctAnswer = 0;
    let wrongAnswer = 0;
    const resultReview = [];
    lstAnswerChoose.forEach((item, index) => {
      if (item === answer[index]) {
        totalScore += 10;
        resultReview.push({
          question_title: questionData[index].question_title,
          correct: true,
          user_choose: questionData[index][`${item}`],
          correct_answer: questionData[index][`${item}`],
        });
        correctAnswer += 1;
      } else {
        resultReview.push({
          question_title: questionData[index].question_title,
          correct: false,
          user_choose: questionData[index][`${item}`],
          correct_answer: questionData[index][`${answer[index]}`],
        });
        wrongAnswer += 1;
      }
    });
    setTotalCorrectAnswer(correctAnswer);
    setTotalWrongAnswer(wrongAnswer);
    setScore(totalScore);
    setReview(resultReview);
    return totalScore + ' ' + correctAnswer + ' ' + wrongAnswer;
  };

  const sendDataSaveScore = async (dataPass, time) => {
    const dataResult = dataPass.split(' ');
    const data = {
      score: parseInt(dataResult[0]),
      userId: userId,
      quizTitle: quizTitle,
      totalCompletionTime: time,
      totalCorrectAnswer: parseInt(dataResult[1]),
      totalWrongAnswer: parseInt(dataResult[2]),
    };
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/score/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      message.error('Có lỗi xảy ra!!!', 3);
    }
  };

  const updateAnswer = (optionChoose) => {
    const lstAnswerChoose = [...answerChoose];
    lstAnswerChoose.push(`option${optionChoose + 1}`);
    if (questionIndex < questionData.length - 1) {
      setAnswerChoose(lstAnswerChoose);
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(questionIndex + 1);
      setTimeFinish(getFormatedTime(timeTaken));
      const data = calculateScore(lstAnswerChoose);
      message.success('Hoàn thành bài trắc nghiệm', 3);
      sendDataSaveScore(data, getFormatedTime(timeTaken));
      setOpenModal(true);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    setUserId(user.user_id);
    getQuestionData(user.access_token);
    startTimer();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Content style={{ overflow: 'initial' }}>
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
        >
          {questionIndex < questionData.length ? (
            <div className='container' style={{ transform: `translateY(10%)` }}>
              <Card
                title=<div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <h4 className='mt-3'>{`Câu hỏi ${
                        questionIndex + 1
                      } trên ${questionData.length}`}</h4>
                    </div>
                    <div>
                      <p style={{ fontSize: '1.2rem' }} className='mt-4 mr-1'>
                        {getFormatedTime(timeTaken)}
                      </p>
                    </div>
                  </div>
                  <Progress
                    percent={getPercentage(
                      questionIndex + 1,
                      questionData.length
                    )}
                    status='active'
                    showInfo={false}
                  />
                </div>
                style={{
                  height: 540,
                }}
              >
                <div>
                  <h5 style={{ fontSize: '1.5rem' }} className='mb-4'>
                    {questionData[questionIndex].question_title}
                  </h5>
                </div>
                <List
                  dataSource={questionData[questionIndex].options}
                  renderItem={(item, index) => (
                    <List.Item
                      className='ml-4 mt-3'
                      style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                      onClick={() => updateAnswer(index)}
                    >
                      <b>{String.fromCharCode(65 + index) + ' . '}</b>
                      {item}
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          ) : (
            <ModalResult
              score={score}
              timeFinish={timeFinish}
              review={review}
              open={openModal}
              totalCorrectAnswer={totalCorrectAnswer}
              totalWrongAnswer={totalWrongAnswer}
              quizTitle={quizTitle}
              onCancel={() => setOpenModal(false)}
            />
          )}
        </div>
      )}
    </Content>
  );
};

export default QuizView;
