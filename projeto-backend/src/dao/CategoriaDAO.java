package dao;

import model.Categoria;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoriaDAO {

    // ------------------------------------
    // READ - Buscar todas as categorias
    // ------------------------------------
    public List<Categoria> buscarTodos() {
        List<Categoria> categorias = new ArrayList<>();
        String sql = "SELECT * FROM categorias";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Categoria categoria = new Categoria(
                        rs.getLong("id"),
                        rs.getString("nome")
                );
                categorias.add(categoria);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar categorias: " + e.getMessage());
            e.printStackTrace();
        }
        return categorias;
    }

    // ------------------------------------
    // READ BY ID - Buscar categoria por ID
    // ------------------------------------
    public Categoria buscarPorId(Long id) {
        Categoria categoria = null;
        String sql = "SELECT id, nome FROM categorias WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    categoria = new Categoria(
                            rs.getLong("id"),
                            rs.getString("nome")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar categoria por ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
        return categoria;
    }

    // ------------------------------------
    // CREATE - Inserir nova categoria
    // ------------------------------------
    public void inserir(Categoria categoria) {
        String sql = "INSERT INTO categorias (nome) VALUES (?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, categoria.getNome());

            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    categoria.setId(rs.getLong(1));
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao inserir categoria: " + categoria.getNome() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ------------------------------------
    // UPDATE - Atualizar categoria existente
    // ------------------------------------
    public void atualizar(Categoria categoria) {
        String sql = "UPDATE categorias SET nome = ? WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, categoria.getNome());
            stmt.setLong(2, categoria.getId());

            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Categoria ID " + categoria.getId() + " atualizada. Linhas afetadas: " + linhasAfetadas);

        } catch (SQLException e) {
            System.err.println("Erro ao atualizar categoria ID: " + categoria.getId() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ------------------------------------
    // DELETE - Excluir categoria por ID
    // ------------------------------------
    public void deletar(Long id) {
        String sql = "DELETE FROM categorias WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Tentativa de deletar categoria ID " + id + ". Linhas afetadas: " + linhasAfetadas);

        } catch (SQLException e) {
            System.err.println("Erro ao deletar categoria ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    
}