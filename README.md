🎨 Projeto Artesanato - Plataforma Full Stack
https://img.shields.io/badge/Java-17+-007396?style=for-the-badge&logo=openjdk&logoColor=white
https://img.shields.io/badge/Spring%2520Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white
https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black
https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white
https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white
https://img.shields.io/badge/Tailwind%2520CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white

📋 Sobre o Projeto
Plataforma Full Stack desenvolvida para um negócio de artesanato especializado em:

Artesanatos em feltro 🧵

Guirlandas personalizadas 🎀

Decoração de quartos de bebê 🍼

Bonecos artesanais 🧸

A solução implementa um sistema completo de gestão de produtos com arquitetura preparada para futura expansão para e-commerce e cursos digitais.

🏗️ Arquitetura
Mono-Repositório Organizado
text
projeto-artesanato/
├── backend/           # API REST - Spring Boot
│   ├── src/
│   │   ├── main/java/com/artesanato/
│   │   │   ├── controller/    # Controllers REST
│   │   │   ├── service/       # Lógica de negócio
│   │   │   ├── repository/    # Acesso a dados
│   │   │   ├── model/         # Entidades JPA
│   │   │   └── config/        # Configurações
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql       # Dados iniciais
│   └── pom.xml
│
└── frontend/          # Interface - React + Vite
    ├── src/
    │   ├── components/   # Componentes React
    │   ├── pages/        # Páginas da aplicação
    │   ├── services/     # Comunicação com API
    │   ├── types/        # Tipos TypeScript
    │   └── styles/       # Estilos Tailwind
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
🚀 Tecnologias Utilizadas
Backend (Java Spring Boot)
Java 17+ - Linguagem principal

Spring Boot 3.x - Framework backend

Spring MVC - Arquitetura MVC

Spring Data JPA - Persistência de dados

PostgreSQL - Banco de dados relacional

Maven - Gerenciamento de dependências

Docker - Containerização

Frontend (React Moderno)
React 18 - Biblioteca de UI

TypeScript - Tipagem estática

Vite - Build tool ultra-rápido

Tailwind CSS - Framework CSS utility-first

React Router - Navegação SPA

Axios - Cliente HTTP

📦 Funcionalidades Implementadas
✅ Backend (API REST)
CRUD completo de produtos e categorias

Upload e gerenciamento de imagens

Sistema de autenticação (JWT)

Validação de dados com Bean Validation

Documentação da API (Swagger/OpenAPI)

Tratamento de exceções global

✅ Frontend (Interface)
Dashboard administrativo responsivo

Galeria de produtos com filtros

Carrinho de compras (base para e-commerce)

Formulários otimizados com validação

Gerenciamento de estado com Context API

Design mobile-first com Tailwind

🛠️ Como Executar o Projeto
Pré-requisitos
bash
# Java 17 ou superior
java --version

# Node.js 18+ e npm
node --version
npm --version

# PostgreSQL (ou Docker)
docker --version  # opcional
1. Clone o Repositório
bash
git clone https://github.com/seu-usuario/projeto-artesanato.git
cd projeto-artesanato
2. Configuração do Banco de Dados
sql
-- Crie o banco de dados
CREATE DATABASE artesanato_db;

-- Ou use Docker
docker run --name postgres-artesanato \
  -e POSTGRES_DB=artesanato_db \
  -e POSTGRES_PASSWORD=senha123 \
  -p 5432:5432 \
  -d postgres:15
3. Backend (Spring Boot)
bash
cd backend

# Configure o application.properties
# Altere as credenciais do banco se necessário

# Execute com Maven
./mvnw spring-boot:run

# Ou compile e execute
./mvnw clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
A API estará disponível em: http://localhost:8080
Documentação Swagger: http://localhost:8080/swagger-ui.html

4. Frontend (React + Vite)
bash
cd frontend

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
A aplicação estará disponível em: http://localhost:5173

🐳 Execução com Docker (Opcional)
Docker Compose
yaml
# docker-compose.yml (crie na raiz do projeto)
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: artesanato_db
      POSTGRES_PASSWORD: senha123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/artesanato_db
  
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:
bash
# Execute tudo com Docker Compose
docker-compose up --build
📚 Endpoints da API
Método	Endpoint	Descrição
GET	/api/produtos	Lista todos os produtos
GET	/api/produtos/{id}	Busca produto por ID
POST	/api/produtos	Cria novo produto
PUT	/api/produtos/{id}	Atualiza produto
DELETE	/api/produtos/{id}	Remove produto
GET	/api/categorias	Lista categorias
POST	/api/upload	Upload de imagem
🎨 Variáveis de Ambiente
Backend (backend/src/main/resources/application.properties)
properties
spring.datasource.url=jdbc:postgresql://localhost:5432/artesanato_db
spring.datasource.username=postgres
spring.datasource.password=senha123
spring.jpa.hibernate.ddl-auto=update
server.port=8080
Frontend (frontend/.env)
env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Artesanato Platform
🔧 Comandos Úteis
Backend
bash
# Executar testes
./mvnw test

# Gerar JAR executável
./mvnw clean package

# Verificar dependências
./mvnw dependency:tree
Frontend
bash
# Build para produção
npm run build

# Preview build de produção
npm run preview

# Lint do código
npm run lint
🧪 Testes
Backend (Spring Boot)
bash
cd backend
./mvnw test
Frontend (React)
bash
cd frontend
npm test
📊 Próximas Funcionalidades (Roadmap)
Sistema de Pagamentos 💳

Integração com Mercado Pago/Stripe

Carrinho de compras completo

Histórico de pedidos

Plataforma de Cursos 🎓

Gerenciamento de aulas em vídeo

Área do aluno

Certificados digitais

Recursos Avançados 🚀

Busca inteligente com Elasticsearch

Cache com Redis

Notificações em tempo real

Dashboard analítico

🤝 Como Contribuir
Faça um Fork do projeto

Crie uma Branch para sua Feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a Branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👤 Autor
Seu Nome

GitHub: @seu-usuario

LinkedIn: Seu Perfil

Email: seu.email@exemplo.com

🙏 Agradecimentos
Spring Boot

React

Vite

Tailwind CSS

Todos os colaboradores e contribuidores

⭐ Suporte
Se este projeto foi útil para você, considere dar uma ⭐ no repositório!

✨ "Transformando arte em tecnologia, e tecnologia em oportunidades" ✨
