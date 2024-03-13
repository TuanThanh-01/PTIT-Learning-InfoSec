import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import { useLocation } from 'react-router-dom';

const FooterHomePage = () => {
  const pathname = useLocation().pathname;
  return (
    <Footer
      style={{
        textAlign: 'center',
        backgroundColor: pathname.includes('viewLesson') ? '#F5F5F5' : '#fff',
      }}
    >
      Học Viện Công Nghệ Bưu Chính Viễn Thông &copy; 2023 Produced by Nguyễn
      Tuấn Thành - B19DCAT179
    </Footer>
  );
};

export default FooterHomePage;
