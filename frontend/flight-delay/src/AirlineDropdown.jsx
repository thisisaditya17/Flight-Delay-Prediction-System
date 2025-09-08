import React, { useState } from 'react';
import Select from 'react-select';

const AirlineDropdown = ({ selectedOption, onChange }) => {

  const options = [
    { value: 'UA', label: 'United Airlines' },
    { value: 'WN', label: 'Southwest Airlines' },
    { value: 'AA', label: 'American Airlines' },
    { value: 'DL', label: 'Delta Airlines' },
    { value: 'B6', label: 'JetBlue Airways' },
    { value: 'F9', label: 'Frontier Airlines' },
    { value: 'G4', label: 'Allegiant Air' },
    { value: 'HA', label: 'Hawaiian Airlines' },
    { value: 'NK', label: 'Spirit Airlines' },
    { value: 'AS', label: 'Alaska Airlines' },
  ];

  const handleChange = (option) => {
    onChange(option);
    console.log('Selected:', option);
  };

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Choose Airline"
        isSearchable={true}
        isClearable={true}
      />
    </div>
  );
};

export default AirlineDropdown;
