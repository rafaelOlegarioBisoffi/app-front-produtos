import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  const baseStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    opacity: disabled ? 0.6 : 1
  };

  const variants = {
    primary: { backgroundColor: '#2563eb', color: 'white' },
    secondary: { backgroundColor: '#64748b', color: 'white' },
    danger: { backgroundColor: '#dc2626', color: 'white' },
    success: { backgroundColor: '#16a34a', color: 'white' }
  };

  const hoverStyle = (e, isHover) => {
    if (!disabled && isHover) {
      e.target.style.transform = 'translateY(-1px)';
      e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'none';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
      onMouseEnter={(e) => hoverStyle(e, true)}
      onMouseLeave={(e) => hoverStyle(e, false)}
    >
      {children}
    </button>
  );
};

export default Button;