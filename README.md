# App Front Produtos - Documentação

**Alunos:** Rafael Olegario Bisoffi e Otávio Fernandes Temóteo

---

## 🔧 Instalação e Configuração do Backend

### 1. Criar o Banco de Dados

Abra o **MySQL Workbench** ou linha de comando do MySQL:

```bash
mysql -u root -p
```

Copie e execute o conteúdo do arquivo `database.sql`:

```sql
-- Copiar todo conteúdo de projeto-backend/database.sql e executar
```

### 2. Configurar Conexão com Banco de Dados

Abra o arquivo `src/util/ConnectionFactory.java` e configure:

```java
private static final String URL = "jdbc:mysql://localhost:3306/app_produtos";
private static final String USER = "root";
private static final String PASSWORD = "sua_senha_mysql";
```

### 3. Rodar o Backend Localmente

No diretório `projeto-backend/src`, execute:

```bash
javac -cp "../lib/*" -d ../bin *.java api/*.java dao/*.java model/*.java util/*.java

cd ../bin
java -cp "../lib/*;." App
```

## Instalação e Configuração do Frontend

* Em um terminal separado/dedicado dentro do diretorio frontEnd execute o comando:

```bash
npm install
```

### 2. Rodar o Frontend Localmente

```bash
npm run build
npm start
```

### PROJETO RODANDO



