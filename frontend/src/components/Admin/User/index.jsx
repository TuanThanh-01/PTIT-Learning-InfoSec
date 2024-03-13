import React, { useEffect, useState } from 'react';
import { Avatar, Button, Spin, Table, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import CollectionCreateForm from './collectionCreateForm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const User = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/user/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.forEach((user) => {
        if (user.created_at !== null) {
          user.created_at = convertISOToCustomFormat(user.created_at);
        }
        if (user.updated_at !== null) {
          user.updated_at = convertISOToCustomFormat(user.updated_at);
        }
      });
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateUser = () => {
    setItem(null);
    setOpenModal(true);
  };

  const sendDataCreateUser = async (data) => {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('studentIdentity', data.studentIdentity);
    formData.append('image', data.image);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/user/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await getUserData();
      message.success('Tạo mới người dùng thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const sendUpdateUser = async (data, id) => {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('studentIdentity', data.studentIdentity);
    if (data.image !== undefined) {
      formData.append('image', data.image);
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/user/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getUserData();
      message.success('Cập nhật người dùng thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const onCreate = (values) => {
    if (values.image !== undefined) {
      values.image = values.image[0].originFileObj;
    }
    if (item === null) {
      sendDataCreateUser(values);
    } else {
      sendUpdateUser(values, item.id);
    }
    setOpenModal(false);
  };

  const deleteUserById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getUserData();
      message.success('Xóa người dùng thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const handleDeleteUserById = (userId) => {
    if (deleteUserById(userId)) {
      setIsLoading(true);
    }
  };

  const handleUpdateUser = (record) => {
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
              placeholder='Nhập tên, họ, email hoặc mã sinh viên'
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
                onClick={handleCreateUser}
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
                title: 'Ảnh đại diện',
                dataIndex: 'avatar',
                render: (imageUrl) => (
                  <Avatar
                    shape='square'
                    size='large'
                    src={`http://localhost:8082${imageUrl}`}
                    icon
                  />
                ),
              },
              {
                title: 'Tên',
                dataIndex: 'firstname',
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return (
                    String(record.firstname)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    String(record.lastname)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    String(record.student_identity)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    String(record.email)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase())
                  );
                },
              },
              {
                title: 'Họ',
                dataIndex: 'lastname',
              },
              {
                title: 'Mã sinh viên',
                dataIndex: 'student_identity',
              },
              {
                title: 'Email',
                dataIndex: 'email',
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
                        handleUpdateUser(record);
                      }}
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteUserById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={userData}
          />
        </div>
      )}
    </div>
  );
};

export default User;
