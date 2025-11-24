-- ============================================
-- CRIAÇÃO DO BANCO DE DADOS
-- ============================================
CREATE DATABASE IF NOT EXISTS app_produtos;
USE app_produtos;

-- ============================================
-- TABELA: CATEGORIAS
-- ============================================
CREATE TABLE IF NOT EXISTS categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA: PRODUTOS
-- ============================================
CREATE TABLE IF NOT EXISTS produtos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    categoria_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Chave estrangeira para relacionamento com categorias
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    
    -- Índices para melhorar performance
    INDEX idx_categoria_id (categoria_id),
    INDEX idx_nome (nome)
);

-- ============================================
-- DADOS DE EXEMPLO 
-- ============================================

-- Inserir categorias de exemplo
INSERT INTO categorias (nome) VALUES 
('Eletrônicos'),
('Roupas'),
('Livros'),
('Alimentos'),
('Móveis');

-- Inserir produtos de exemplo
INSERT INTO produtos (nome, preco, estoque, categoria_id) VALUES 
('Notebook Dell', 3500.00, 10, 1),
('Mouse Logitech', 150.00, 50, 1),
('Camiseta Básica', 49.90, 100, 2),
('Calça Jeans', 120.00, 75, 2),
('Clean Code', 89.90, 30, 3),
('The Pragmatic Programmer', 95.00, 20, 3),
('Arroz 5kg', 25.00, 200, 4),
('Feijão 1kg', 8.50, 150, 4),
('Mesa de Escritório', 450.00, 5, 5),
('Cadeira Gamer', 1200.00, 8, 5);