import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Table from '../components/Table';
import Modal from '../components/Modal';

const API_URL = 'http://localhost:8080';

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    estoque: '',
    categoriaId: ''
  });

  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/produtos`);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);

    } finally {
      setLoading(false);
    }
  };

  const carregarCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const carregarProdutosPorCategoria = async (categoriaId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/categorias/${categoriaId}/produtos`);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos da categoria:', error);
      alert('Erro ao carregar produtos da categoria');
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

    const payload = {
      nome: formData.nome,
      preco: parseFloat(formData.preco),
      estoque: parseInt(formData.estoque),
      categoriaId: parseInt(formData.categoriaId)
    };

    try {
      const url = editingProduto 
        ? `${API_URL}/produtos/${editingProduto.id}`
        : `${API_URL}/produtos`;
      
      const method = editingProduto ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        fecharModal();
        carregarProdutos();
      } else {
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (produto) => {
    setEditingProduto(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString(),
      categoriaId: produto.categoriaId.toString()
    });
    setModalOpen(true);
  };

  const handleDelete = async (produto) => {
    if (!window.confirm(`Deseja realmente excluir o produto "${produto.nome}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/produtos/${produto.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        carregarProdutos();
      } else {
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModalNovo = () => {
    setEditingProduto(null);
    setFormData({ nome: '', preco: '', estoque: '', categoriaId: '' });
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setEditingProduto(null);
    setFormData({ nome: '', preco: '', estoque: '', categoriaId: '' });
  };

  // Filtrar produtos por categoria
  const produtosFiltrados = filtroCategoria 
    ? produtos.filter(p => p.categoriaId === parseInt(filtroCategoria))
    : produtos;

  const handleFiltroChange = (e) => {
    const categoriaId = e.target.value;
    setFiltroCategoria(categoriaId);
    
    if (categoriaId) {
      carregarProdutosPorCategoria(categoriaId);
    } else {
      carregarProdutos();
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'nome' },
    { 
      header: 'Preço', 
      render: (row) => `R$ ${row.preco.toFixed(2)}`
    },
    { header: 'Estoque', accessor: 'estoque' },
    { 
      header: 'Categoria', 
      render: (row) => {
        const cat = categorias.find(c => c.id === row.categoriaId);
        return cat ? cat.nome : '-';
      }
    }
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
          Produtos
        </h1>
        <Button onClick={abrirModalNovo} variant="primary">
          + Novo Produto
        </Button>
      </div>

      <Card>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
            🔍 Filtrar por Categoria
          </h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <Select
                label=""
                value={filtroCategoria}
                onChange={handleFiltroChange}
                options={categorias.map(cat => ({
                  value: cat.id,
                  label: cat.nome
                }))}
              />
            </div>
            <Button 
              onClick={() => {
                setFiltroCategoria('');
                carregarProdutos();
              }}
              variant="secondary"
              style={{ marginBottom: 0 }}
            >
              Limpar Filtro
            </Button>
          </div>
          {filtroCategoria && (
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
              Mostrando {produtosFiltrados.length} produto(s) da categoria selecionada
            </p>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Carregando...
          </div>
        ) : (
          <Table
            columns={columns}
            data={produtosFiltrados}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={fecharModal}
        title={editingProduto ? 'Editar Produto' : 'Novo Produto'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
          
          <Input
            label="Preço"
            name="preco"
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={handleInputChange}
            required
          />
          
          <Input
            label="Estoque"
            name="estoque"
            type="number"
            value={formData.estoque}
            onChange={handleInputChange}
            required
          />
          
          <Select
            label="Categoria"
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleInputChange}
            options={categorias.map(cat => ({
              value: cat.id,
              label: cat.nome
            }))}
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

export default ProdutosPage;