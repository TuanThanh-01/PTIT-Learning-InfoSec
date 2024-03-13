import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Select, Spin, Table, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCreateForm from './CollectionCreateForm';
import CollectionCreateFormFile from './CollectionCreateFormFile';

const Question = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState([]);
  const [quizNameData, setQuizNameData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [selectData, setSelectData] = useState('');
  const [item, setItem] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalFormFile, setOpenModalFormFile] = useState(false);

  const getQuizData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/quiz/get-all-quiz-title`,
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
      setQuizNameData(arr);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllQuestion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/question/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestionData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendDataCreateQuestion = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/question/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getAllQuestion();
      message.success('Tạo mới câu hỏi thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const sendUpdateQuestion = async (questionRequest, id) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/question/update/${id}`,
        questionRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getAllQuestion();
      message.success('Cập nhật câu hỏi thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const sendDataCreateQuestionFile = async (data) => {
    const formData = new FormData();
    formData.append('quizTitle', data.quiz_title);
    formData.append('file', data.file);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/question/upload-question-by-excel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getAllQuestion();
      message.success('Tạo mới câu hỏi thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const deleteQuestionById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/question/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getAllQuestion();
      message.success('Xóa câu hỏi thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const handleCreateQuestionByFile = () => {
    setOpenModalFormFile(true);
  };

  const handleUpdateQuestion = (record) => {
    setOpenModal(true);
    setItem(record);
  };

  const handleDeleteQuestionById = (id) => {
    if (deleteQuestionById(id)) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getQuizData();
    getAllQuestion();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateQuestion = () => {
    setItem(null);
    setOpenModal(true);
  };
  const handleChange = (value) => {
    setSelectData(value);
  };

  const onCreate = (value) => {
    const questionRequest = {
      questionTitle: value.question_title,
      option1: value.option1,
      option2: value.option2,
      option3: value.option3,
      option4: value.option4,
      correctAnswer: value.correct_answer,
      quizTitle: value.quiz_title,
    };
    if (item === null) {
      sendDataCreateQuestion(questionRequest);
    } else {
      sendUpdateQuestion(questionRequest, item.id);
    }
    setOpenModal(false);
  };

  const onCreateFormFile = (value) => {
    value.file = value.file[0].originFileObj;
    sendDataCreateQuestionFile(value);
    setOpenModalFormFile(false);
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
                placeholder='Nhập tên câu hỏi'
                allowClear
                style={{ width: '12rem' }}
                onSearch={(value) => {
                  setSearchedText(value);
                }}
                onChange={(e) => {
                  setSearchedText(e.target.value);
                }}
              />
            </div>
            <Select
              defaultValue=''
              style={{ width: '15rem' }}
              options={[{ value: '', label: '---Tất cả---' }, ...quizNameData]}
              onChange={handleChange}
            />
            <div>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170', width: '8rem' }}
                onClick={handleCreateQuestion}
              >
                Thêm mới
              </Button>
              <Button
                type='primary'
                style={{ background: '#008170' }}
                onClick={handleCreateQuestionByFile}
              >
                Thêm mới theo file
              </Button>
            </div>
          </div>
          <CollectionCreateForm
            open={openModal}
            item={item}
            quizData={quizNameData}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          />
          <CollectionCreateFormFile
            open={openModalFormFile}
            quizData={quizNameData}
            onCreate={onCreateFormFile}
            onCancel={() => {
              setOpenModalFormFile(false);
            }}
          />
          <Table
            rowKey={(record) => record.id}
            columns={[
              { title: 'ID', dataIndex: 'id' },
              {
                title: 'Tên câu hỏi',
                dataIndex: 'question_title',
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return String(record.question_title)
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase());
                },
              },
              {
                title: 'Đáp án A',
                dataIndex: 'option1',
              },
              {
                title: 'Đáp án B',
                dataIndex: 'option2',
              },

              {
                title: 'Đáp án C',
                dataIndex: 'option3',
              },
              {
                title: 'Đáp án D',
                dataIndex: 'option4',
              },
              {
                title: 'Đáp án đúng',
                dataIndex: 'correct_answer',
                render: (record) => (
                  <div style={{ fontSize: '1rem' }}>
                    {record === 'option1' ? <b>A</b> : <></>}
                    {record === 'option2' ? <b>B</b> : <></>}
                    {record === 'option3' ? <b>C</b> : <></>}
                    {record === 'option4' ? <b>D</b> : <></>}
                  </div>
                ),
              },
              {
                title: 'Tên bài trắc nghiệm',
                dataIndex: 'quizTitle',
                filteredValue: [selectData],
                onFilter: (value, record) => {
                  return String(record.quizTitle)
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase());
                },
              },
              {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (record) => (
                  <div style={{ display: 'flex' }}>
                    <Button
                      type='primary'
                      size='small'
                      icon={<EditOutlined />}
                      className='mr-2'
                      onClick={() => {
                        handleUpdateQuestion(record);
                      }}
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteQuestionById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={questionData}
          />
        </div>
      )}
    </div>
  );
};

export default Question;
