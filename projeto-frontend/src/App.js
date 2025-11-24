import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProdutosPage from './pages/ProdutosPage';
import CategoriasPage from './pages/CategoriasPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('produtos');

  const renderPage = () => {
    switch (currentPage) {
      case 'produtos':
        return <ProdutosPage />;
      case 'categorias':
        return <CategoriasPage />;
      default:
        return <ProdutosPage />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div style={{
        flex: 1,
        backgroundColor: '#f3f4f6',
        padding: '32px',
        overflow: 'auto'
      }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;