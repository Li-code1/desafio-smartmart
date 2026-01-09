from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import csv
import os
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Sale(BaseModel):
    product_id: int
    quantity: int
    total_price: float
    date: str

CSV_FILE = "sales.csv"

def carregar_dados_csv():
    historico = []
    if not os.path.exists(CSV_FILE): return []
    with open(CSV_FILE, mode="r", encoding="utf-8") as f:
        leitor = csv.DictReader(f)
        for linha in leitor:
            historico.append(linha)
    return historico

def salvar_todos_dados(dados):
    with open(CSV_FILE, mode="w", encoding="utf-8", newline="") as f:
        escritor = csv.writer(f)
        escritor.writerow(["id", "product_id", "quantity", "total_price", "date"])
        for i, item in enumerate(dados):
            escritor.writerow([i+1, item['product_id'], item['quantity'], item['total_price'], item['date']])

@app.get("/sales/stats")
def get_stats():
    dados = carregar_dados_csv()
    rev = sum(float(item['total_price']) for item in dados if item['total_price'])
    qty = sum(int(item['quantity']) for item in dados if item['quantity'])
    return {"total_revenue": round(rev, 2), "total_quantity": qty}

@app.get("/sales/history")
def get_history():
    dados = carregar_dados_csv()
    return [{"id": i, "name": item['date'], "value": float(item['total_price']), "quantity": int(item['quantity']), "date": item['date']} for i, item in enumerate(dados)]

@app.post("/sales/add")
def add_sale(sale: Sale):
    dados = carregar_dados_csv()
    with open(CSV_FILE, mode="a", encoding="utf-8", newline="") as f:
        escritor = csv.writer(f)
        escritor.writerow([len(dados)+1, sale.product_id, sale.quantity, sale.total_price, sale.date])
    return {"status": "success"}

@app.put("/sales/update/{row_index}")
def update_sale(row_index: int, sale: Sale):
    dados = carregar_dados_csv()
    if 0 <= row_index < len(dados):
        dados[row_index] = {"product_id": sale.product_id, "quantity": sale.quantity, "total_price": sale.total_price, "date": sale.date}
        salvar_todos_dados(dados)
        return {"status": "updated"}
    raise HTTPException(status_code=404, detail="Não encontrado")

@app.delete("/sales/delete/{row_index}")
def delete_sale(row_index: int):
    dados = carregar_dados_csv()
    if 0 <= row_index < len(dados):
        dados.pop(row_index)
        salvar_todos_dados(dados)
        return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Não encontrado")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9000)