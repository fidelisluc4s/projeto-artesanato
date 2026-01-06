Projeto Artesanato - Plataforma Full Stack
Visão Geral
Sistema completo desenvolvido para digitalizar um negócio de artesanato, permitindo gestão de produtos e preparando para expansão futura (e-commerce, cursos online).

Stack Tecnológica
Backend: Java 17, Spring Boot 3, Maven, H2 Database

Frontend: React 18, TypeScript, Vite, Tailwind CSS

Organização: Mono-repositório

Ferramentas: Git, Postman para testes de API

Estrutura do Projeto
text
projeto-artesanato/
├── backend/          # API Spring Boot
│   ├── src/main/java/com/artesanato/
│   │   ├── controller/    # Endpoints REST
│   │   ├── service/       # Regras de negócio
│   │   ├── repository/    # Acesso a dados
│   │   ├── model/         # Entidades
│   │   └── config/        # Configurações
│   └── pom.xml
│
└── frontend/         # Interface React
    ├── src/
    │   ├── components/   # Componentes reutilizáveis
    │   ├── pages/        # Páginas principais
    │   ├── services/     # Chamadas à API
    │   └── styles/       # Estilos Tailwind
    ├── package.json
    └── vite.config.ts
Funcionalidades Implementadas
Backend (Spring Boot)
API REST com CRUD completo de produtos

Banco H2 em memória (para desenvolvimento)

Upload e gestão de imagens

Validação de dados com Bean Validation

Tratamento global de exceções

Frontend (React)
Dashboard responsivo para gestão

Galeria de produtos com filtros

Formulários com validação

Design mobile-first com Tailwind CSS

Carrinho de compras (base para e-commerce)

Como Executar
1. Banco de Dados (H2)
O projeto usa H2 Database em memória. Ao iniciar o backend:

Banco criado automaticamente

Dados de exemplo carregados via data.sql

Console H2 disponível em: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:artesanatodb

Usuário: sa

Senha: (vazio)

2. Backend
bash
cd backend
./mvnw spring-boot:run
API disponível em: http://localhost:8080

3. Frontend
bash
cd frontend
npm install
npm run dev
Aplicação disponível em: http://localhost:5173

Endpoints da API
Método	Endpoint	Descrição
GET	/api/produtos	Lista todos os produtos
GET	/api/produtos/{id}	Busca produto específico
POST	/api/produtos	Cria novo produto
PUT	/api/produtos/{id}	Atualiza produto
DELETE	/api/produtos/{id}	Remove produto
GET	/api/categorias	Lista categorias
POST	/api/upload	Upload de imagem
Testando a API com Postman
Coleção exemplo:
json
{
  "endpoints": [
    {
      "name": "Listar produtos",
      "method": "GET",
      "url": "http://localhost:8080/api/produtos"
    },
    {
      "name": "Criar produto",
      "method": "POST",
      "url": "http://localhost:8080/api/produtos",
      "body": {
        "nome": "Guirlanda Natal",
        "descricao": "Guirlanda artesanal para Natal",
        "preco": 89.90,
        "categoria": "DECORACAO",
        "estoque": 10
      }
    }
  ]
}
Configurações
Backend (application.properties)
properties
# Servidor
server.port=8080

# Banco H2
spring.datasource.url=jdbc:h2:mem:artesanatodb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
Frontend (.env)
env
VITE_API_BASE_URL=http://localhost:8080/api
Evolução do Projeto
Fase Atual
Gestão básica de produtos

Catálogo digital

Interface administrativa

Próximas Fases
Sistema de vendas online

Carrinho completo

Pagamento integrado

Gestão de pedidos

Plataforma de cursos

Aulas em vídeo

Área do aluno

Certificados

Recursos avançados

Autenticação de usuários

Dashboard analítico

Multi-vendedores

Vantagens da Arquitetura
Mono-repositório
Código frontend/backend juntos

Facilita deploy coordenado

Versionamento simplificado

H2 Database
Ideal para desenvolvimento

Não precisa instalar PostgreSQL

Dados em memória (rápido)

Pode migrar para PostgreSQL depois

Stack Moderna
Spring Boot: rápido desenvolvimento Java

React + Vite: frontend performático

Tailwind CSS: estilização rápida

TypeScript: código mais seguro

Comandos Úteis
Backend
bash
# Rodar aplicação
./mvnw spring-boot:run

# Executar testes
./mvnw test

# Gerar JAR
./mvnw clean package
Frontend
bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Preview build
npm run preview
Contato
Para mais informações sobre o projeto ou demonstração completa, entre em contato.
