# Projeto Artesanato - Mono-Repo

Este repositório contém o projeto da cliente que trabalha com artesanatos, feltros, guirlandas, decoração de quartos de bebê e bonecos.  
O projeto está dividido em **frontend** (React + Vite) e **backend** (Spring Boot), permitindo escalabilidade para vendas e cursos digitais nos próximos ciclos.

---

## 📁 Estrutura do Repositório

projeto-artesanato/
├── backend/ # Projeto Spring Boot
│ ├── pom.xml
│ └── src/...
└── frontend/ # Projeto React (Vite)
├── package.json
└── src/...
---

## ⚙️ Rodando o Frontend

1. Entre na pasta `frontend`:
```bash
cd frontend

Instale as dependências:

npm install

Rode o servidor de desenvolvimento:

npm run dev

Abra o navegador em:

http://localhost:5173

Rodando o Backend

Entre na pasta backend:

cd backend

Rode o projeto Spring Boot:

./mvnw spring-boot:run

A API estará disponível em:

http://localhost:8080
