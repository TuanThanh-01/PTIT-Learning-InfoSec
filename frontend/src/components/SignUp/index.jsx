import logoPtit from '../../assets/logo.png';
import background from '../../assets/background.svg';
import './SignUp.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Spin, message, Layout } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
const { Header, Content, Footer } = Layout;

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpin, setIsSpin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const sendDataSignup = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/auth/register',
        data
      );
      setIsSpin(false);
      message.success(
        'Xác minh email bằng liên kết được gửi trên địa chỉ email của bạn',
        3
      );
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      if (error.response.data.errorCode === 'ERROR_USER_EXIST') {
        message.error('Tài khoản email đã được đăng ký!!!', 3);
      } else {
        message.error('Đăng ký tài khoản thất bại', 3);
      }
      setIsLoading(false);
      setIsSpin(false);
    }
  };

  const onSubmit = (values) => {
    setIsSpin(true);
    sendDataSignup(values);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${background})`,
      }}
    >
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
        <Spin spinning={isSpin} size='large'>
          <div className='container'>
            <div className='d-flex justify-content-center mt-5'>
              <img
                src={logoPtit}
                className='mr-3'
                style={{ height: '3.25rem' }}
              ></img>
              <h1 className='text-center'>PTIT Learning InfoSec</h1>
            </div>
            <div className='mt-4'>
              <p
                className='text-center'
                style={{
                  fontSize: '1.5rem',
                  color: '#ED2B2A',
                  fontWeight: '600',
                }}
              >
                Đăng ký tài khoản
              </p>
              <hr
                style={{ border: '2px solid red', width: '10rem' }}
                className='mb-3'
              />
              <div className='d-flex justify-content-center mt-3'>
                <form
                  className='p-4'
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    borderRadius: '10px',
                    width: '28rem',
                  }}
                >
                  <div className='form-row'>
                    <div className='form-group col-md-6'>
                      <label htmlFor='lastname'>Họ</label>
                      <input
                        type='text'
                        className='form-control'
                        id='lastname'
                        {...register('lastname', {
                          required: 'Hãy điền họ của bạn',
                        })}
                      />
                      <small style={{ color: '#ED2B2A' }}>
                        {errors.lastname?.message}
                      </small>
                    </div>
                    <div className='form-group col-md-6'>
                      <label htmlFor='firstname'>Tên</label>
                      <input
                        type='text'
                        className='form-control'
                        id='firstname'
                        {...register('firstname', {
                          required: 'Hãy điền tên của bạn',
                        })}
                      />
                      <small style={{ color: '#ED2B2A' }}>
                        {errors.firstname?.message}
                      </small>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='studentIdentity'>Mã sinh viên</label>
                    <input
                      type='text'
                      className='form-control'
                      id='studentIdentity'
                      {...register('studentIdentity', {
                        required: 'Mã sinh viên không được bỏ trống',
                      })}
                    />
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.email?.message}
                    </small>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='emailSignUp'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      id='emailSignUp'
                      {...register('email', {
                        required: 'Email không được bỏ trống',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email không hợp lệ',
                        },
                      })}
                    />
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.email?.message}
                    </small>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Mật khẩu</label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      {...register('password', {
                        required: 'Mật khẩu không được bỏ trống',
                        minLength: {
                          value: 6,
                          message: 'Mật khẩu ít nhất 6 kí tự',
                        },
                      })}
                    />
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.password?.message}
                    </small>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='retypePassword'>Nhập lại mật khẩu</label>
                    <input
                      type='password'
                      className='form-control'
                      id='retypePassword'
                      {...register('confirm_password', {
                        required: 'Hãy nhập lại mật khẩu',
                        validate: (val) => {
                          if (watch('password') != val) {
                            return 'Mật khẩu nhập lại không trùng khớp';
                          }
                        },
                      })}
                    />
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.confirm_password?.message}
                    </small>
                  </div>

                  <Button
                    type='primary'
                    danger
                    style={{ width: '10rem' }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Đăng ký
                  </Button>
                  <Link
                    to='/login'
                    className='float-right pt-2 login'
                    style={{ color: '#ED2B2A' }}
                  >
                    Đã có tài khoản ?
                  </Link>
                </form>
              </div>
            </div>
          </div>
          <div className='footer'>
            <p className='text-center font-weight-light'>
              Học Viện Công Nghệ Bưu Chính Viễn Thông &copy; 2023 Produced by
              Nguyễn Tuấn Thành - B19DCAT179
            </p>
          </div>
        </Spin>
      )}
    </div>
  );
};

export default SignUp;
