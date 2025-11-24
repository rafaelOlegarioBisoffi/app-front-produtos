package api;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.List;

import com.google.gson.Gson;

import dao.CategoriaDAO;
import model.Categoria;
import model.Produto;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Route;

public class ApiCategoria {

    // instâncias do DAO e GSON
    private static final CategoriaDAO dao = new CategoriaDAO();
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

        // ------------------------------------
        // GET /categorias - Buscar todas as categorias
        // ------------------------------------
        get("/categorias", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                return gson.toJson(dao.buscarTodos());
            }
        });

        // ------------------------------------
        // GET /categorias/:id - Buscar categoria por ID
        // ------------------------------------
        get("/categorias/:id", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Long id = Long.parseLong(request.params(":id"));
                    Categoria categoria = dao.buscarPorId(id);
                    if (categoria != null) {
                        return gson.toJson(categoria);
                    } else {
                        response.status(404);
                        return "{\"mensagem\": \"Categoria com ID " + id + " não encontrada.\"}";
                    }
                } catch (NumberFormatException e) {
                    response.status(400);
                    return "{\"mensagem\": \"ID de categoria inválido.\"}";
                }
            }
        });

        // ------------------------------------
        // POST /categorias - Criar nova categoria
        // ------------------------------------
        post("/categorias", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Categoria novaCategoria = gson.fromJson(request.body(), Categoria.class);
                    dao.inserir(novaCategoria);

                    response.status(201);
                    return "{\"mensagem\": \"Categoria criada com sucesso.\"}";
                } catch (Exception e) {
                    e.printStackTrace();
                    response.status(500);
                    return "{\"mensagem\": \"Erro ao criar categoria.\"}";
                }
            }
        });

        // ------------------------------------
        // PUT /categorias/:id - Atualizar categoria existente
        // ------------------------------------
        put("/categorias/:id", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Long id = Long.parseLong(request.params(":id"));

                    if (dao.buscarPorId(id) == null) {
                        response.status(404);
                        return "{\"mensagem\": \"Categoria não encontrada.\"}";
                    }

                    Categoria categoriaAtualizada = gson.fromJson(request.body(), Categoria.class);
                    categoriaAtualizada.setId(id);
                    dao.atualizar(categoriaAtualizada);

                    response.status(200);
                    return "{\"mensagem\": \"Categoria atualizada com sucesso.\"}";
                } catch (Exception e) {
                    e.printStackTrace();
                    response.status(500);
                    return "{\"mensagem\": \"Erro ao atualizar categoria.\"}";
                }
            }
        });

        // ------------------------------------
        // DELETE /categorias/:id - Excluir categoria
        // ------------------------------------
        delete("/categorias/:id", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Long id = Long.parseLong(request.params(":id"));

                    if (dao.buscarPorId(id) == null) {
                        response.status(404);
                        return "{\"mensagem\": \"Categoria não encontrada.\"}";
                    }

                    dao.deletar(id);
                    response.status(200);
                    return "{\"mensagem\": \"Categoria deletada com sucesso.\"}";
                } catch (Exception e) {
                    e.printStackTrace();
                    response.status(500);
                    return "{\"mensagem\": \"Erro ao deletar categoria.\"}";
                }
            }
        });
    }
}