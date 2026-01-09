# 📊 SmartMart Dashboard - Full Stack

O **SmartMart Dashboard** é uma solução completa de análise de dados para varejo. O sistema lê dados reais de vendas e produtos a partir de arquivos CSV, processa essas informações através de uma API em Python e as exibe em um painel interativo desenvolvido em React.

## 🚀 Funcionalidades

* **KPIs em Tempo Real:** Visualização de Receita Total e Quantidade de Vendas.
* **Gráficos Dinâmicos:** Fluxo de faturamento por data utilizando Recharts.
* **Histórico de Vendas:** Tabela detalhada consumindo dados diretamente do arquivo `sales.csv`.
* **Relatórios em PDF:** Geração de documentos profissionais com um clique usando `jsPDF`.
* **Arquitetura Escalável:** Separação clara entre Backend (API) e Frontend (UI).

## 🛠️ Tecnologias Utilizadas

### **Frontend**

* **React + TypeScript** (Interface do usuário)
* **Tailwind CSS** (Estilização moderna e responsiva)
* **Lucide React** (Ícones)
* **Recharts** (Gráficos interativos)
* **Axios** (Consumo de API)

### **Backend**

* **Python 3.x**
* **FastAPI** (Framework web de alta performance)
* **Uvicorn** (Servidor ASGI)
* **CSV Native Module** (Processamento eficiente de dados)

---

## 📦 Como Executar o Projeto

### 1. Preparação

Certifique-se de ter o Python e o Node.js instalados em sua máquina.

### 2. Configurando o Backend

No terminal, acesse a pasta do backend:

```bash
cd backend
# Instale as dependências necessárias
pip install fastapi uvicorn
# Execute o servidor
python main.py

```

O servidor estará rodando em: `http://127.0.0.1:9000`

### 3. Configurando o Frontend

Em outro terminal, acesse a pasta do frontend:

```bash
cd frontend
# Instale as dependências
npm install
# Inicie a aplicação
npm run dev

```

Acesse o painel em: `http://localhost:5173`

---

## 📂 Estrutura de Arquivos

```text
projeto/desafio-smartmart/
├── backend/
│   ├── main.py          # Servidor FastAPI e lógica de dados
│   └── sales.csv        # Base de dados de vendas
├── frontend/
│   ├── src/
│   │   └── App.tsx      # Painel principal em React
│   └── package.json     # Dependências do projeto
└── README.md            # Documentação

```

---

## ✒️ Autora

**Liliane Lima** — Desenvolvimento Full Stack.

---
