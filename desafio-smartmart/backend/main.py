from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import csv
import io
import os
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CONFIGURAÇÃO DE CORS - Essencial para o Frontend (React) conseguir ler os dados
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados para validação
class Sale(BaseModel):
    product_id: str
    category: str
    quantity: int
    total_price: float
    date: str

CSV_FILE = "sales.csv"

# Inicializa o CSV com cabeçalhos se o arquivo não existir
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "product_id", "category", "quantity", "total_price", "date"])

def carregar_dados_csv():
    historico = []
    if not os.path.exists(CSV_FILE):
        return []
    with open(CSV_FILE, mode="r", encoding="utf-8") as f:
        leitor = csv.DictReader(f)
        for linha in leitor:
            historico.append(linha)
    return historico

def salvar_todos_dados(dados):
    with open(CSV_FILE, mode="w", encoding="utf-8", newline="") as f:
        escritor = csv.writer(f)
        escritor.writerow(["id", "product_id", "category", "quantity", "total_price", "date"])
        for i, item in enumerate(dados):
            # Recalcula o ID com base na posição para manter a ordem
            escritor.writerow([i + 1, item['product_id'], item['category'], item['quantity'], item['total_price'], item['date']])

# --- ROTAS DA API ---

@app.get("/sales/stats")
def get_stats():
    dados = carregar_dados_csv()
    rev = sum(float(item['total_price']) for item in dados if item['total_price'])
    qty = sum(int(item['quantity']) for item in dados if item['quantity'])
    return {"total_revenue": round(rev, 2), "total_quantity": qty}

@app.get("/sales/history")
def get_history():
    dados = carregar_dados_csv()
    historico_formatado = []
    for i, item in enumerate(dados):
        try:
            historico_formatado.append({
                "id": i, 
                "product_id": item.get('product_id', 'Sem Nome'), 
                "category": item.get('category', 'Geral'), 
                "value": float(item.get('total_price', 0)), 
                "quantity": int(item.get('quantity', 0)), 
                "date": item.get('date', '2026-01-01')
            })
        except:
            continue # Pula linhas que estiverem com erro de digitação no CSV
    return historico_formatado

@app.get("/categories")
def get_categories():
    dados = carregar_dados_csv()
    # Extrai categorias únicas e remove vazios
    cats = {item['category'] for item in dados if item.get('category')}
    return sorted(list(cats))

@app.post("/sales/add")
def add_sale(sale: Sale):
    dados = carregar_dados_csv()
    with open(CSV_FILE, mode="a", encoding="utf-8", newline="") as f:
        escritor = csv.writer(f)
        # O ID é o tamanho da lista + 1
        escritor.writerow([len(dados) + 1, sale.product_id, sale.category, sale.quantity, sale.total_price, sale.date])
    return {"status": "success"}

@app.post("/sales/upload")
async def upload_csv(file: UploadFile = File(...)):
    try:
        content = await file.read()
        df = io.StringIO(content.decode('utf-8'))
        reader = csv.DictReader(df)
        
        dados_atuais = carregar_dados_csv()
        proximo_id = len(dados_atuais) + 1
        
        with open(CSV_FILE, mode="a", encoding="utf-8", newline="") as f:
            writer = csv.writer(f)
            for row in reader:
                writer.writerow([proximo_id, row['product_id'], row['category'], row['quantity'], row['total_price'], row['date']])
                proximo_id += 1
        return {"status": "success", "message": "Arquivo importado"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar CSV: {str(e)}")

@app.put("/sales/update/{row_index}")
def update_sale(row_index: int, sale: Sale):
    dados = carregar_dados_csv()
    if 0 <= row_index < len(dados):
        dados[row_index] = {
            "product_id": sale.product_id, 
            "category": sale.category, 
            "quantity": sale.quantity, 
            "total_price": sale.total_price, 
            "date": sale.date
        }
        salvar_todos_dados(dados)
        return {"status": "updated"}
    raise HTTPException(status_code=404, detail="Registro não encontrado")

@app.delete("/sales/delete/{row_index}")
def delete_sale(row_index: int):
    dados = carregar_dados_csv()
    if 0 <= row_index < len(dados):
        dados.pop(row_index)
        salvar_todos_dados(dados)
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Registro não encontrado")

if __name__ == "__main__":
    # Roda na porta 9000 conforme configurado no Frontend
    uvicorn.run(app, host="127.0.0.1", port=9000)