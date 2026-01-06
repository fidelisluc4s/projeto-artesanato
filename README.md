Projeto Artesanato - Plataforma Full Stack
📋 Sobre o Projeto
Sistema completo desenvolvido para digitalizar um negócio de artesanato, permitindo gestão de produtos e preparando para expansão futura (e-commerce, cursos online).

🛠️ Tecnologias Utilizadas
Backend
Java 17 - Linguagem principal

Spring Boot 3 - Framework para API REST

Spring Data JPA - Persistência de dados

H2 Database - Banco em memória para desenvolvimento

Maven - Gerenciamento de dependências

Frontend
React 18 - Biblioteca para interface

TypeScript - Tipagem estática

Vite - Build tool ultra-rápido

Tailwind CSS - Framework CSS

Axios - Cliente HTTP

Organização
Mono-repositório - Frontend e backend no mesmo repositório

Git - Controle de versão

🏗️ Arquitetura do Projeto
Estrutura de Diretórios
text
projeto-artesanato/
│
├── backend/                    # API Spring Boot
│   ├── src/main/java/com/artesanato/
│   │   ├── controller/        # Controladores REST
│   │   ├── service/          # Lógica de negócio
│   │   ├── repository/       # Acesso a dados
│   │   ├── model/           # Entidades JPA
│   │   └── config/          # Configurações
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql         # Dados iniciais
│   └── pom.xml
│
└── frontend/                  # Aplicação React
    ├── src/
    │   ├── components/       # Componentes reutilizáveis
    │   ├── pages/           # Páginas da aplicação
    │   ├── services/        # Comunicação com API
    │   ├── types/          # Tipos TypeScript
    │   └── styles/         # Estilos Tailwind
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
🚀 Como Executar o Projeto
Pré-requisitos
Java 17 ou superior

Node.js 18+ e npm

Maven (ou use o wrapper incluído)

Passo 1: Configuração Inicial
bash
# Clone o repositório
git clone [url-do-repositorio]
cd projeto-artesanato
Passo 2: Executar o Backend
bash
# Navegue para a pasta backend
cd backend

# Execute o projeto Spring Boot
./mvnw spring-boot:run
Backend rodando em: http://localhost:8080

Passo 3: Executar o Frontend
bash
# Em outro terminal, navegue para a pasta frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
Frontend rodando em: http://localhost:5173

📡 Endpoints da API
Produtos
Método	Endpoint	Descrição
GET	/api/produtos	Lista todos os produtos
GET	/api/produtos/{id}	Busca produto por ID
POST	/api/produtos	Cria novo produto
PUT	/api/produtos/{id}	Atualiza produto
DELETE	/api/produtos/{id}	Remove produto
Categorias
Método	Endpoint	Descrição
GET	/api/categorias	Lista todas as categorias
POST	/api/categorias	Cria nova categoria
Upload
Método	Endpoint	Descrição
POST	/api/upload	Upload de imagens
🗄️ Banco de Dados H2
Configuração
O projeto usa H2 Database em modo memória:

URL do Console: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:artesanatodb

Usuário: sa

Senha: (deixe em branco)

Dados Iniciais
O arquivo data.sql na pasta backend/src/main/resources/ contém dados de exemplo que são carregados automaticamente ao iniciar a aplicação.

🔧 Configurações
Backend (application.properties)
properties
# Servidor
server.port=8080

# Banco H2
spring.datasource.url=jdbc:h2:mem:artesanatodb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (acessível em /h2-console)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Upload de arquivos
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
Frontend (.env)
env
VITE_API_BASE_URL=http://localhost:8080/api
🧪 Testando a API
Com Postman
Importe a coleção de exemplos

Configure o ambiente com base URL: http://localhost:8080

Teste os endpoints:

GET /api/produtos - Listar produtos

POST /api/produtos - Criar produto

GET /api/produtos/1 - Buscar produto específico

Exemplo de Request Body (POST /api/produtos)
json
{
  "nome": "Guirlanda Natal",
  "descricao": "Guirlanda artesanal para decoração natalina",
  "preco": 89.90,
  "categoria": "DECORACAO",
  "estoque": 15,
  "imagemUrl": "uploads/guirlanda.jpg"
}
📱 Funcionalidades do Frontend
Páginas Principais
Dashboard - Visão geral do sistema

Produtos - Lista e gestão de produtos

Categorias - Gerenciamento de categorias

Galeria - Visualização em grade dos produtos

Componentes Principais
ProdutoCard - Card para exibição de produto

ProdutoForm - Formulário de criação/edição

Header - Cabeçalho com navegação

Sidebar - Menu lateral responsivo

🎯 Roadmap de Evolução
Fase 1 - MVP (Atual)
CRUD de produtos

Gestão de categorias

Interface administrativa

Upload de imagens

Fase 2 - E-commerce
Sistema de carrinho completo

Integração com gateway de pagamento

Gestão de pedidos

Área do cliente

Fase 3 - Plataforma de Cursos
Gerenciamento de cursos

Player de vídeo

Sistema de certificados

Área do aluno

Fase 4 - Recursos Avançados
Autenticação e autorização

Dashboard analítico

Sistema de notificações

Multi-vendedores

⚙️ Comandos Úteis
Backend
bash
# Rodar aplicação
./mvnw spring-boot:run

# Executar testes
./mvnw test

# Limpar e compilar
./mvnw clean compile

# Gerar pacote JAR
./mvnw clean package
Frontend
bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Verificar problemas
npm run lint

# Instalar dependências
npm install
🔄 Fluxo de Desenvolvimento
Para adicionar nova funcionalidade:
Crie branch a partir de main

Desenvolva no backend (Java/Spring)

Desenvolva no frontend (React/TypeScript)

Teste integração localmente

Commit e push para o repositório

Crie Pull Request para revisão

Para testar alterações:
Certifique-se que o backend está rodando

Execute o frontend em modo desenvolvimento

Teste todos os cenários relevantes

Verifique no console H2 se dados estão consistentes

📊 Vantagens da Arquitetura
Mono-repositório
Versionamento unificado - Histórico completo em um lugar

Deploy coordenado - Facilita sincronização entre frontend/backend

Facilidade de navegação - Encontre código relacionado rapidamente

H2 Database
Zero configuração - Funciona imediatamente

Rápido para desenvolvimento - Dados em memória

Fácil migração - Pode trocar por PostgreSQL depois

Stack Escolhida
Spring Boot - Produtividade no backend Java

React + Vite - Performance no frontend

TypeScript - Segurança com tipagem

Tailwind CSS - Estilização eficiente

🆘 Solução de Problemas
Backend não inicia
Verifique se a porta 8080 está livre

Confirme se Java 17+ está instalado

Execute ./mvnw clean e tente novamente

Frontend não conecta com API
Confirme se backend está rodando

Verifique VITE_API_BASE_URL no .env

Consulte o console do navegador para erros CORS

Banco H2 não aparece
Acesse http://localhost:8080/h2-console

Verifique se spring.h2.console.enabled=true

Confirme credenciais no application.properties

📞 Suporte
Para dúvidas sobre o projeto:

Consulte a documentação acima

Verifique o código fonte

Entre em contato para demonstração

Status do Projeto: Em desenvolvimento ativo
Última Atualização: Dezembro 2024
Próxima Fase: Implementação do carrinho de compras
