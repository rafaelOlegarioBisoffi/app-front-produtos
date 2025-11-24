import java.util.ArrayList;
import java.util.List;
import api.ApiCategoria;
import api.ApiProduto;

import util.ConnectionFactory;

public class App {
    public static void main(String[] args) {
        port(8080)

        ApiCategoria.Execute();
        ApiProduto.Execute();

        sysout.println("Servidor rodando na porta 8080");

    }
}
