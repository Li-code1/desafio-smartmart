from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import csv
import os

app = FastAPI()

# Configuração de CORS: Permite que o Frontend (React) acesse o Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def carregar_dados_reais():
    receita_total = 0.0
    qtd_total = 0
    historico = []
    
    caminho_csv = "sales.csv"
    
    # Verifica se o arquivo existe para não quebrar o código
    if not os.path.exists(caminho_csv):
        print(f"❌ Erro: O arquivo {caminho_csv} não foi encontrado!")
        return 0.0, 0, []

    try:
        # Usamos utf-8 para ler o arquivo enviado
        with open(caminho_csv, mode="r", encoding="utf-8") as f:
            leitor = csv.DictReader(f)
            for linha in leitor:
                try:
                    # Pegamos os valores baseados nas colunas do seu CSV
                    valor_venda = float(linha['total_price'])
                    quantidade = int(linha['quantity'])
                    
                    receita_total += valor_venda
                    qtd_total += quantidade
                    
                    # Guardamos os dados para o histórico do gráfico
                    historico.append({
                        "date": str(linha['date']),
                        "total_price": valor_venda
                    })
                except:
                    continue # Pula linhas com erro ou vazias
    except Exception as e:
        print(f"❌ Erro ao ler o arquivo: {e}")
        
    return receita_total, qtd_total, historico

@app.get("/sales/stats")
def get_stats():
    try:
        rev, qty, _ = carregar_dados_reais()
        return {
            "total_revenue": round(rev, 2), 
            "total_quantity": int(qty)
        }
    except:
        return {"total_revenue": 0.0, "total_quantity": 0}

@app.get("/sales/history")
def get_history():
    try:
        _, _, historico = carregar_dados_reais()
        dados_grafico = []
        for item in historico[-10:]:
            dados_grafico.append({
                "name": item['date'],   # Data no eixo X
                "price": item['total_price'], # Valor que o gráfico espera
                "product_name": "Venda Geral" # Nome para a tabela
            })
        return dados_grafico
    except:
        return []

@app.get("/products")
def get_products():
    # Rota de segurança para a tabela de produtos não quebrar o site
    return []

if __name__ == "__main__":
    print("🚀 SERVIDOR SMARTMART ONLINE!")
    print("📊 Lendo dados reais de sales.csv...")
    # Rodando na porta 9000, compatível com o seu Dashboard
    uvicorn.run(app, host="127.0.0.1", port=9000)