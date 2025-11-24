package model;

public class Categoria {

    private Long id;
    private String nome;

    // ------------------------------------
    // Construtores
    // ------------------------------------

    // Construtor vazio (necessário para o Gson)
    public Categoria() {
    }

    // Construtor com todos os campos
    public Categoria(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    // Construtor só com nome (útil para inserts)
    public Categoria(String nome) {
        this.nome = nome;
    }

    // ------------------------------------
    // Getters e Setters
    // ------------------------------------
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // ------------------------------------
    // toString (opcional, útil para debug)
    // ------------------------------------
    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                '}';
    }
}