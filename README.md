# 🎟️ Sistema de Gerenciamento de Eventos

Um sistema simples para gerenciamento de **check-in** e **check-out** de participantes em eventos, com foco em **dispositivos móveis**.

## ✨ Tecnologias Utilizadas

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **NeonDB (PostgreSQL)**
- **React Query (Tanstack)**
- **Axios**

---

## 🧠 Funcionalidades

### Frontend

- 📋 Listagem de eventos
- 👥 Visualização de participantes de um evento
- ✅ Botões para check-in / check-out
- 📊 Visualização de estatísticas do evento
- 📱 Design responsivo (mobile-first)

### Backend (API)

- 🔍 Listar eventos
- 🔍 Listar participantes de um evento
- ⏱️ Realizar check-in / check-out
- 📈 Obter estatísticas do evento

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
Antes de rodar o projeto, é necessário ter instalado em sua máquina:

- **Node.js** 
- **Next.js** 
- **Prisma** para ORM e configuração do banco de dados
- **PostgreSQL** (NeonDB ou local)
- **PNPM / NPM**


### 1. Clone o repositório

```bash
git clone https://github.com/caiohtorres/eventopayxyz
cd eventopayxyz
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Banco de Dados
  Você pode configurar o banco de dados tanto em um servidor local quanto na nuvem (exemplo: **NeonDB**).
  Crie um arquivo .env na raiz do projeto
```bash
DATABASE_URL="postgresql://usuario:senha@host:porta/database"
```

### 4. Execute as migrations e preencha com dados iniciais

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. Rode o projeto

```bash
npm run dev
```

## 🧑‍💻 Autor

Desenvolvido por **Caio Torres**  
🔗 [LinkedIn](https://www.linkedin.com/in/caiohtorres2001/)  
📫 [torrescaio12@gmail.com](mailto:torrescaio12@gmail.com)

---

## 📄 Licença

Este projeto é apenas para fins demonstrativos e de avaliação técnica.

---
