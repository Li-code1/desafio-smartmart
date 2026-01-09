# 🛒 SmartMart Pro - Gestão de Vendas Full Stack

O **SmartMart Pro** é uma plataforma robusta para monitoramento de vendas e análise de lucros. O sistema transforma dados brutos de arquivos CSV em inteligência de negócio através de dashboards interativos, permitindo o controle total sobre o ciclo de vida dos dados (CRUD).

## 🎯 Funcionalidades Implementadas

* **Dashboard Duplo:** * **Gráfico de Barras:** Visualização cronológica do lucro (Lucro vs. Data).
* **Gráfico de Pizza:** Distribuição percentual de lucro por categoria de produto.


* **Gestão de Dados (CRUD):** Interface completa para adicionar, editar e excluir registros de vendas diretamente na aplicação.
* **Sistema de Filtros:** Busca inteligente por nome de produto e filtragem dinâmica por categoria.
* **Importação Massiva:** Upload de arquivos CSV para alimentação rápida da base de dados.
* **Persistência de Dados:** Armazenamento estruturado em arquivo CSV no backend, garantindo que as informações não sejam perdidas ao reiniciar.

---

## 🛠️ Tecnologias e Dependências

### **Frontend**

* **React + Vite + TypeScript**
* **Tailwind CSS** (Design responsivo e moderno)
* **Recharts** (Visualização de dados complexa)
* **Lucide React** (Ícones profissionais)
* **Axios** (Integração com API)

### **Backend**

* **Python 3.10+**
* **FastAPI** (Framework de alta performance)
* **Uvicorn** (Servidor ASGI)
* **Python-Multipart** (Processamento de arquivos via API)

---

## 📂 Como Executar o Projeto

### **1. Servidor (Backend)**

Navegue até a pasta do servidor e prepare o ambiente:

```bash
cd backend
pip install fastapi uvicorn python-multipart
python main.py

```

> **Nota:** O servidor iniciará em `http://127.0.0.1:9000`. Certifique-se de que esta porta esteja livre.

### **2. Interface (Frontend)**

Em um novo terminal, instale as dependências e inicie a aplicação:

```bash
cd frontend
npm install
npm run dev

```

> Acesse o endereço indicado no terminal (geralmente `http://localhost:5173`).

---

## 📊 Guia de Importação de Dados (CSV)

Para importar novos dados, o arquivo deve ser salvo no formato **CSV (Separado por vírgulas)** com a seguinte estrutura de cabeçalho:
`product_id,category,quantity,total_price,date`

| product_id | category | quantity | total_price | date |
| --- | --- | --- | --- | --- |
| Exemplo | Eletrônicos | 1 | 2500.00 | 2026-01-09 |

---

---

**Desenvolvido por Liliane de Lima Santos - 2026**

---
