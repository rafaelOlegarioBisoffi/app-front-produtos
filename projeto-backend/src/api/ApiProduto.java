package api;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.List;

import com.google.gson.Gson;

import dao.ProdutoDAO;
import model.Produto;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Route;

public class ApiProduto {

    // instâncias do DAO e GSON
    private static final ProdutoDAO dao = new ProdutoDAO();
    private static final Gson gson = new Gson();

    // constante para garantir que as respostas sejam JSON
    private static final String APPLICATION_JSON = "application/json";

    public static void Execute() {
        // filtro para definir o tipo de conteúdo como JSON
        after(new Filter() {
            @Override
            public void handle(Request request, Response response) {
                response.type(APPLICATION_JSON);
            }
        });

        // GET /produtos - Buscar todos
        get("/produtos", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                return gson.toJson(dao.buscarTodos());
            }
        });

        // GET /produtos/:id - Buscar produto por ID
        get("/produtos/:id", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Long id = Long.parseLong(request.params(":id"));
                    Produto produto = dao.buscarPorId(id);
                    if (produto != null) {
                        return gson.toJson(produto);
                    } else {
                        response.status(404);
                        return "{\"mensagem\": \"Produto com ID " + id + " não encontrado.\"}";
                    }
                } catch (NumberFormatException e) {
                    response.status(400);
                    return "{\"mensagem\": \"Produto com ID inválido.\"}";
                }
            }
        });

        // POST /produtos - Criar novos produtos
        post("/produtos", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Produto novoProduto = gson.fromJson(request.body(), Produto.class);
                    dao.inserir(novoProduto);

                    response.status(201);
                    return "{\"mensagem\": \"Produto criado com sucesso.\"}";
                } catch (Exception e) {
                    response.status(500);
                    return "{\"mensagem\": \"Erro ao criar produto.\"}";
                }
            }
        });

        // PUT /produtos/:id - Editar produto pelo ID
        put("/produtos/:id", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Long id = Long.parseLong(request.params(":id"));

                    if (dao.buscarPorId(id) == null) {
                        response.status(404);
                        return "{\"mensagem\": \"Produto não encontrado.\"}";
                    }

                    Produto produtoAtualizar = gson.fromJson(request.body(), Produto.class);
                    produtoAtualizar.setId(id);
                    dao.atualizar(produtoAtualizar);

                    response.status(200);
                    return "{\"mensagem\": \"Produto atualizado com sucesso.\"}";
                } catch (Exception e) {
                    response.status(500);
                    return "{\"mensagem\": \"Erro ao atualizar produto.\"}";
                }
            }
        });

        // DELETE /produtos/:id - Excluir produto pelo ID
        delete("/produtos/:id", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Long id = Long.parseLong(request.params(":id"));

                    if (dao.buscarPorId(id) == null) {
                        response.status(404);
                        return "{\"mensagem\": \"Produto não encontrado.\"}";
                    }

                    dao.deletar(id);

                    response.status(200);
                    return "{\"mensagem\": \"Produto deletado com sucesso.\"}";
                } catch (Exception e) {
                    response.status(500);
                    return "{\"mensagem\": \"Erro ao deletar produto.\"}";
                }
            }
        });

        // GET /categorias/:id/produtos - Listar produtos por categoria
        get("/categorias/:id/produtos", (request, response) -> {
            try {
                Long categoriaId = Long.parseLong(request.params(":id"));
                List<Produto> produtos = dao.buscarPorCategoria(categoriaId);
                return gson.toJson(produtos);
            } catch (NumberFormatException e) {
                response.status(400);
                return "{\"mensagem\": \"ID de categoria inválido.\"}";
            }
        });
    }
}
