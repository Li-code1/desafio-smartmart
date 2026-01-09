# 🛒 SmartMart Dashboard

O **SmartMart** é um dashboard inteligente de gestão de vendas que permite o acompanhamento em tempo real de métricas financeiras. O sistema utiliza um backend em **Python** para gerenciar um banco de dados em **CSV** e um frontend moderno em **React** para visualização de dados.



## ✨ Funcionalidades

-   **Gestão de Vendas (CRUD):** Inserção, listagem, edição e exclusão de vendas diretamente na interface.
-   **Gráfico Inteligente:** Visualização de faturamento agrupado automaticamente por data.
-   **Filtros em Tempo Real:** Busca dinâmica no histórico por datas no formato brasileiro (DD/MM/AAAA).
-   **KPIs Dinâmicos:** Cards com faturamento total e volume de itens vendidos atualizados instantaneamente.
-   **Interface Responsiva:** Design limpo e moderno utilizando Tailwind CSS e Lucide Icons.

## 🛠️ Tecnologias Utilizadas

### Backend
-   **Python 3.x**
-   **FastAPI:** Framework web de alta performance.
-   **Uvicorn:** Servidor ASGI para rodar a API.
-   **CSV:** Armazenamento persistente de dados.

### Frontend
-   **React + TypeScript**
-   **Tailwind CSS:** Estilização baseada em utilitários.
-   **Recharts:** Biblioteca para gráficos interativos.
-   **Lucide React:** Pacote de ícones profissionais.
-   **Axios:** Cliente HTTP para comunicação com a API.

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone [https://github.com/Li-code1/desafio-smartmart.git]


```
### 2. Configurar o Backend

```bash
cd backend
pip install fastapi uvicorn pydantic
python main.py

```

*O servidor iniciará em `http://127.0.0.1:9000*`

### 3. Configurar o Frontend

Em um novo terminal:

```bash
cd frontend
npm install
npm run dev

```

*O dashboard estará disponível em `http://localhost:5173*`

## 📁 Estrutura de Pastas

```text
smartmart/
├── backend/
│   ├── main.py        # API FastAPI e lógica de manipulação do CSV
│   └── sales.csv      # Banco de dados em formato de texto
└── frontend/
    ├── src/
    │   ├── App.tsx    # Interface e lógica principal em React
    │   └── main.tsx
    └── package.json

```

## 📊 Formato dos Dados (CSV)

O sistema gerencia automaticamente o arquivo `sales.csv` com a seguinte estrutura:
`id, product_id, quantity, total_price, date`

---

## 🚀 Guia de Instalação e Execução

Siga os passos abaixo para configurar o ambiente e rodar o SmartMart localmente.

### 1. Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

* **Python 3.8+**
* **Node.js** (Versão 18 ou superior)
* **Gerenciador de pacotes npm** (instalado junto com o Node)

---

### 2. Configuração do Backend (Servidor Python)

O backend gerencia o processamento de dados e o armazenamento no arquivo CSV.

1. Abra o seu terminal e navegue até a pasta do backend:
```bash
cd backend

```


2. Instale as bibliotecas necessárias:
```bash
pip install fastapi uvicorn pydantic

```


3. Inicie o servidor:
```bash
python main.py

```


*O terminal deve exibir: `INFO: Uvicorn running on http://127.0.0.1:9000*`

---

### 3. Configuração do Frontend (Interface React)

O frontend fornece a interface visual e os gráficos do dashboard.

1. Abra um **segundo terminal** (mantenha o primeiro rodando o Python) e navegue até a pasta do frontend:
```bash
cd frontend

```


2. Instale as dependências do projeto:
```bash
npm install

```


3. Instale as bibliotecas de ícones e gráficos (caso ainda não estejam no package.json):
```bash
npm install lucide-react recharts axios

```


4. Inicie a aplicação:
```bash
npm run dev

```


*O terminal informará um endereço como `http://localhost:5173`. Abra este link no seu navegador.*

---

## 🧪 Como Testar o Projeto

Após rodar os dois comandos acima, siga este roteiro para validar as funcionalidades:

1. **Teste de Inserção:**
* No formulário superior, selecione uma data, digite uma quantidade e um valor (ex: R$ 100,00).
* Clique em **"GUARDAR NO CSV"**.
* Verifique se o formulário foi limpo automaticamente e se os dados apareceram no Histórico e no Gráfico.


2. **Teste de Agrupamento:**
* Adicione uma segunda venda na **mesma data** que a anterior.
* Observe que, no gráfico, as vendas foram somadas em uma única barra, enquanto no histórico elas aparecem como itens individuais.


3. **Teste de Edição:**
* Na tabela de Histórico, clique no ícone do **Lápis Laranja** 📝 de uma venda.
* Os dados devem subir para o formulário. Altere o valor e clique em **"ATUALIZAR"**.
* Confirme se os KPIs (Métricas) e o Gráfico foram recalculados.


4. **Teste de Filtro:**
* Utilize a barra de busca no topo. Digite parte de uma data (ex: "09/01" ou "2025-01").
* A tabela de histórico deve filtrar os resultados instantaneamente.


5. **Teste de Exclusão:**
* Clique no ícone da **Lixeira Vermelha** 🗑️.
* Confirme a mensagem de alerta. A venda deve desaparecer e os valores totais do Dashboard devem diminuir.



---

### 💡 Resolução de Problemas

* **Erro de Porta (10048):** Se o Python não iniciar, use `taskkill /F /IM python.exe` no Windows para liberar a porta 9000.
* **Conexão Recusada:** Verifique se o backend está rodando antes de tentar usar o formulário no frontend.

* ## 📺 Demonstração

Confira abaixo o funcionamento do sistema (Inserção, Edição, Exclusão e Filtros):

https://drive.google.com/file/d/1VvF7CXI-1mqGsSfBmF-_PemxfPpY8qr5/view?usp=drivesdk


Desenvolvido por Liliane Lima - Janeiro de 2026.
---
