import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Table from '../components/Table';
import Modal from '../components/Modal';

const API_URL = 'http://localhost:8080';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [formData, setFormData] = useState({
    nome: ''
  });

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/categorias`);
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      alert('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingCategoria 
        ? `${API_URL}/categorias/${editingCategoria.id}`
        : `${API_URL}/categorias`;
      
      const method = editingCategoria ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(editingCategoria ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!');
        fecharModal();
        carregarCategorias();
      } else {
        alert('Erro ao salvar categoria');
      }
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      alert('Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setFormData({
      nome: categoria.nome
    });
    setModalOpen(true);
  };

  const handleDelete = async (categoria) => {
    if (!window.confirm(`Deseja realmente excluir a categoria "${categoria.nome}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/categorias/${categoria.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Categoria excluída com sucesso!');
        carregarCategorias();
      } else {
        alert('Erro ao excluir categoria');
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      alert('Erro ao excluir categoria');
    } finally {
      setLoading(false);
    }
  };

  const abrirModalNovo = () => {
    setEditingCategoria(null);
    setFormData({ nome: '' });
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setEditingCategoria(null);
    setFormData({ nome: '' });
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'nome' }
  ];

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111827' }}>
          Categorias
        </h1>
        <Button onClick={abrirModalNovo} variant="primary">
          + Nova Categoria
        </Button>
      </div>

      <Card>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Carregando...
          </div>
        ) : (
          <Table
            columns={columns}
            data={categorias}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={fecharModal}
        title={editingCategoria ? 'Editar Categoria' : 'Nova Categoria'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button type="button" variant="secondary" onClick={fecharModal}>
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriasPage;