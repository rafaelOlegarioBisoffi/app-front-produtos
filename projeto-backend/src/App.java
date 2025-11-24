import java.util.ArrayList;
import java.util.List;
import api.ApiCategoria;
import api.ApiProduto;
import static spark.Spark.port;
import static spark.Spark.options;
import static spark.Spark.before;
import util.ConnectionFactory;

public class App {
    public static void main(String[] args) {
        port(8080);

          options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "http://localhost:3000");
            response.header("Access-Control-Allow-Credentials", "true");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        });

        ApiCategoria.Execute();
        ApiProduto.Execute();

       System.out.println("Servidor rodando na porta 8080");

    }
}
