import java.util.ArrayList;
import java.util.List;
import api.ApiCategoria;
import api.ApiProduto;
import static spark.Spark.port;
import util.ConnectionFactory;

public class App {
    public static void main(String[] args) {
        port(8080);

        ApiCategoria.Execute();
        ApiProduto.Execute();

       System.out.println("Servidor rodando na porta 8080");

    }
}
