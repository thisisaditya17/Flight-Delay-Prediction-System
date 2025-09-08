import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelector.css';

const DateSelector = ({ selectedDate, onChange }) => {
  const getDayName = (dayNum) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNum];
  };

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}  
        dateFormat="yyyy-MM-dd"
        placeholderText="Select departure date"
        minDate={new Date()}
        showPopperArrow={false}
      />
    </div>
  );
};

export default DateSelector;
