import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, name }) => {
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
      />
    </div>
  );
};

export default Input;