import React from 'react';

const Card = ({ children, title }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '20px'
    }}>
      {title && (
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '16px', 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#111827'
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;