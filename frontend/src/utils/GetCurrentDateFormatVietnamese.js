const getCurrentDateFormatVietnamese = () => {
  var today = new Date();
  var thu = today.getDay() + 1;
  var ngay = today.getDate();
  var thang = today.getMonth() + 1;
  var nam = today.getFullYear();
  switch (thu) {
    case 1: {
      thu = 'Chủ Nhật';
      break;
    }
    case 2: {
      thu = 'Thứ Hai';
      break;
    }
    case 3: {
      thu = 'Thứ Ba';
      break;
    }
    case 4: {
      thu = 'Thứ tư';
      break;
    }
    case 5: {
      thu = 'Thứ Năm';
      break;
    }
    case 6: {
      thu = 'Thứ Sáu';
      break;
    }
    case 7: {
      thu = 'Thứ Bảy';
      break;
    }
  }

  return thu + ', ngày ' + ngay + ' tháng ' + thang + ' năm ' + nam;
};

export default getCurrentDateFormatVietnamese;
