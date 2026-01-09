<<<<<<< HEAD
# 🛒 SmartMart Pro - Gestão de Vendas Full Stack

O **SmartMart Pro** é uma plataforma robusta para monitoramento de vendas e análise de lucros. O sistema transforma dados brutos de arquivos CSV em inteligência de negócio através de dashboards interativos, permitindo o controle total sobre o ciclo de vida dos dados (CRUD).

## 🎯 Funcionalidades Implementadas

* **Dashboard Duplo:** * **Gráfico de Barras:** Visualização cronológica do lucro (Lucro vs. Data).
* **Gráfico de Pizza:** Distribuição percentual de lucro por categoria de produto.
=======
# 🛒 SmartMart Pro - Dashboard de Vendas

O **SmartMart Pro** é uma solução Full Stack desenvolvida para gestão inteligente de inventário e análise de vendas. O sistema permite o controle total de produtos por categorias, visualização de lucros e importação massiva de dados via CSV.
>>>>>>> 84f3cda18248796d34af7c2df72de780b9926206

## 🚀 Funcionalidades Principais

<<<<<<< HEAD
* **Gestão de Dados (CRUD):** Interface completa para adicionar, editar e excluir registros de vendas diretamente na aplicação.
* **Sistema de Filtros:** Busca inteligente por nome de produto e filtragem dinâmica por categoria.
* **Importação Massiva:** Upload de arquivos CSV para alimentação rápida da base de dados.
* **Persistência de Dados:** Armazenamento estruturado em arquivo CSV no backend, garantindo que as informações não sejam perdidas ao reiniciar.

---

## 🛠️ Tecnologias e Dependências
=======
* **Dashboard Dinâmico:** Gráficos interativos que comparam **Quantidade Vendida** vs **Lucro Total** por data.
* **Gestão de Categorias:** Organização automática de produtos e filtros rápidos por categoria.
* **Importação de Dados:** Processamento de arquivos CSV para inserção em massa de registros.
* **CRUD Completo:** Possibilidade de adicionar, editar, visualizar e excluir vendas e produtos em tempo real.
* **Persistência em CSV:** Armazenamento estruturado garantindo que os dados não sejam perdidos ao reiniciar o servidor.

---
>>>>>>> 84f3cda18248796d34af7c2df72de780b9926206

### **Frontend**

<<<<<<< HEAD
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
=======
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
>>>>>>> 84f3cda18248796d34af7c2df72de780b9926206
