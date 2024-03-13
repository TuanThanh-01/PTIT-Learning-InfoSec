import React, { useEffect, useState } from 'react';
import { Button, Spin, Table, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import CollectionCreateForm from './collectionCreateForm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const CategoryLesson = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryLessonData, setCategoryLessonData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getCategoryLessonData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/category-lesson/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.forEach((categoryLesson) => {
        if (categoryLesson.created_at !== null) {
          categoryLesson.created_at = convertISOToCustomFormat(
            categoryLesson.created_at
          );
        }
        if (categoryLesson.updated_at !== null) {
          categoryLesson.updated_at = convertISOToCustomFormat(
            categoryLesson.updated_at
          );
        }
      });
      setCategoryLessonData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryLessonData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateCategory = () => {
    setItem(null);
    setOpenModal(true);
  };

  const sendDataCreateCategoryLesson = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/category-lesson/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getCategoryLessonData();
      message.success('Tạo mới danh mục bài học thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const sendUpdateCategoryLesson = async (data, id) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/category-lesson/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getCategoryLessonData();
      message.success('Cập nhật danh mục bài học thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const onCreate = (values) => {
    if (item === null) {
      sendDataCreateCategoryLesson(values);
    } else {
      sendUpdateCategoryLesson(values, item.id);
    }
    setOpenModal(false);
  };

  const deleteCategoryLessonById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/category-lesson/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getCategoryLessonData();
      message.success('Xóa danh mục bài học thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const handleDeleteCategoryLessonById = (categoryLessonId) => {
    if (deleteCategoryLessonById(categoryLessonId)) {
      setIsLoading(true);
    }
  };

  const handleUpdateCategoryLesson = (record) => {
    setOpenModal(true);
    setItem(record);
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
            <Search
              placeholder='Nhập tên danh mục bài học'
              allowClear
              style={{ width: '20rem' }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />

            <div>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170', width: '8rem' }}
                onClick={handleCreateCategory}
              >
                Thêm mới
              </Button>
            </div>
          </div>
          <CollectionCreateForm
            open={openModal}
            item={item}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          ></CollectionCreateForm>
          <Table
            rowKey={(record) => record.id}
            columns={[
              { title: 'ID', dataIndex: 'id' },
              {
                title: 'Tên danh mục',
                dataIndex: 'category_name',
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return String(record.category_name)
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase());
                },
              },
              {
                title: 'Mô tả',
                dataIndex: 'description',
              },
              {
                title: 'Thời gian tạo',
                dataIndex: 'created_at',
              },
              {
                title: 'Thời gian cập nhật',
                dataIndex: 'updated_at',
              },
              {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (record) => (
                  <div>
                    <Button
                      type='primary'
                      size='small'
                      icon={<EditOutlined />}
                      className='mr-2'
                      onClick={() => {
                        handleUpdateCategoryLesson(record);
                      }}
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteCategoryLessonById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={categoryLessonData}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryLesson;
