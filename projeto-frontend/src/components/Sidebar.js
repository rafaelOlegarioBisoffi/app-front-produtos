import React from 'react';

const Sidebar = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'produtos', label: 'Produtos'},
    { id: 'categorias', label: 'Categorias'}
  ];

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#1f2937',
      minHeight: '100vh',
      padding: '20px',
      color: 'white'
    }}>
      <div style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '1px solid #374151'
      }}>
        📊 Sistema
      </div>
      
      <nav>
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              padding: '12px 16px',
              marginBottom: '8px',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: currentPage === item.id ? '#3b82f6' : 'transparent',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '15px'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== item.id) {
                e.currentTarget.style.backgroundColor = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== item.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '20px' }}></span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;