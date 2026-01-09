# 🛒 SmartMart Pro - Dashboard de Vendas

O **SmartMart Pro** é uma solução Full Stack desenvolvida para gestão inteligente de inventário e análise de vendas. O sistema permite o controle total de produtos por categorias, visualização de lucros e importação massiva de dados via CSV.

## 🚀 Funcionalidades Principais

* **Dashboard Dinâmico:** Gráficos interativos que comparam **Quantidade Vendida** vs **Lucro Total** por data.
* **Gestão de Categorias:** Organização automática de produtos e filtros rápidos por categoria.
* **Importação de Dados:** Processamento de arquivos CSV para inserção em massa de registros.
* **CRUD Completo:** Possibilidade de adicionar, editar, visualizar e excluir vendas e produtos em tempo real.
* **Persistência em CSV:** Armazenamento estruturado garantindo que os dados não sejam perdidos ao reiniciar o servidor.

---

## 🛠️ Tecnologias Utilizadas

### **Backend**

* **Python 3.10+** com **FastAPI** (Alta performance e tipagem).
* **Uvicorn** (Servidor ASGI).
* **Python-Multipart** (Para suporte a upload de arquivos).
* **CSV Module** (Manipulação de banco de dados em texto).

### **Frontend**

* **React + Vite + TypeScript**.
* **Tailwind CSS** (Estilização moderna e responsiva).
* **Recharts** (Gráficos complexos e interativos).
* **Lucide React** (Pacote de ícones profissionais).
* **Axios** (Comunicação com API).

---

## 📦 Como Instalar e Rodar

### **1. Backend**

1. Acesse a pasta do servidor: `cd backend`
2. Instale as dependências:
```bash
pip install fastapi uvicorn python-multipart

```


3. Inicie o servidor:
```bash
python main.py

```


*O backend estará rodando em `http://127.0.0.1:9000*`

### **2. Frontend**

1. Em um novo terminal, acesse a pasta da interface: `cd frontend`
2. Instale os pacotes:
```bash
npm install

```


3. Rode a aplicação:
```bash
npm run dev

```


*Acesse `http://localhost:5173` no seu navegador.*

---

## 📂 Guia de Importação de CSV

Para importar dados em massa, utilize um arquivo `.csv` com a seguinte estrutura de colunas:

| product_id | category | quantity | total_price | date |
| --- | --- | --- | --- | --- |
| PROD123 | Eletrônicos | 5 | 1200.00 | 2026-01-09 |
| PROD456 | Casa | 2 | 150.50 | 2026-01-10 |

**Nota:** A data deve seguir o formato `AAAA-MM-DD`. O sistema converterá automaticamente para o padrão brasileiro (`DD/MM/AAAA`) na interface.

---

## 🧪 Roteiro de Testes Recomendado

1. **Inserção Manual:** Adicione um produto preenchendo o formulário e veja o gráfico atualizar.
2. **Edição:** Clique no ícone de lápis laranja em um item do histórico, mude o valor e salve.
3. **Filtro:** Utilize o seletor de "Categorias" para filtrar apenas produtos de um tipo específico.
4. **Upload:** Use o botão "Importar CSV" com o modelo de exemplo acima para ver o processamento em massa.

---

**Desenvolvido por [Liliane Lima] - 2026**

---
