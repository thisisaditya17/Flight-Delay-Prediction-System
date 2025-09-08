import { useState } from 'react';

function HourSelector({ selectedHour, onChange }) {
  const [time, setTime] = useState('');

  const handleChange = (e) => {
    const value = e.target.value; 
    setTime(value);
    
    if (value) {
      const hour = parseInt(value.split(':')[0], 10);
      if (!isNaN(hour)) {
        onChange(hour); 
        console.log(`Flight time: ${value}, Hour used: ${hour}`);
      }
    } else {
      onChange(null);
    }
  };

  return (
        <div style={{ width: '300px', margin: '20px' }}>
      <label htmlFor="timeInput" style={{ 
        display: 'block', 
        marginBottom: '8px', 
        fontWeight: '500' 
      }}>
        Flight Departure Time
      </label>
      <input
        id="timeInput"
        type="time"
        value={time}
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          fontSize: '16px',
          width: '200px',
          backgroundColor: 'white'
        }}
        placeholder="Select time"
      />
    </div>
  );
}

export default HourSelector;
