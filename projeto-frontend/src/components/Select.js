import React from 'react';

const Select = ({ label, value, onChange, options, required = false, name }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ 
          display: 'block', 
          marginBottom: '6px', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151' 
        }}>
          {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          outline: 'none',
          backgroundColor: 'white',
          cursor: 'pointer',
          boxSizing: 'border-box'
        }}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;