import { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, Search, Trash2, Edit3, XCircle, TrendingUp, DollarSign, Package, Upload } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const API_URL = "http://127.0.0.1:9000";

function App() {
  const [salesHistory, setSalesHistory] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [stats, setStats] = useState({ total_revenue: 0, total_quantity: 0 });
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Edição e Formulário
  const [editingId, setEditingId] = useState<number | null>(null);
  const initialForm = { product_id: "", category: "", quantity: 0, total_price: 0, date: new Date().toISOString().split('T')[0] };
  const [form, setForm] = useState(initialForm);

  const fetchData = async () => {
    try {
      const [resStats, resHistory, resCats] = await Promise.all([
        axios.get(`${API_URL}/sales/stats`),
        axios.get(`${API_URL}/sales/history`),
        axios.get(`${API_URL}/categories`)
      ]);
      setStats(resStats.data);
      setSalesHistory(resHistory.data);
      setCategories(resCats.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      await axios.post(`${API_URL}/sales/upload`, formData);
      alert("CSV importado com sucesso!");
      fetchData();
    } catch (err) { alert("Erro ao importar CSV."); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await axios.put(`${API_URL}/sales/update/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/sales/add`, form);
      }
      setForm(initialForm);
      fetchData();
    } catch (err) { alert("Erro ao salvar."); }
  };

  const startEdit = (sale: any) => {
    setEditingId(sale.id);
    setForm({ product_id: sale.product_id, category: sale.category, quantity: sale.quantity, total_price: sale.value, date: sale.date });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGroupedData = () => {
    const groups = salesHistory.reduce((acc: any, item: any) => {
      const date = item.date;
      acc[date] = acc[date] || { name: date, lucro: 0, qtd: 0 };
      acc[date].lucro += item.value;
      acc[date].qtd += item.quantity;
      return acc;
    }, {});
    return Object.values(groups).sort((a: any, b: any) => new Date(a.name).getTime() - new Date(b.name).getTime());
  };

  const filteredSales = salesHistory.filter(s => 
    (s.date.includes(searchTerm) || s.product_id.includes(searchTerm)) &&
    (selectedCategory === "" || s.category === selectedCategory)
  );

  if (loading) return <div className="p-20 text-center font-bold">SmartMart Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-black text-indigo-900 flex items-center gap-2"><TrendingUp /> SMARTMART PRO</h1>
        
        <div className="flex gap-4 items-center w-full md:w-auto">
          <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-dashed border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-all">
            <Upload size={18} className="text-indigo-600"/>
            <span className="text-xs font-bold text-indigo-600 uppercase">Importar CSV</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
          </label>
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200" placeholder="Buscar ID ou Data..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </header>

      {/* FORMULÁRIO DE REGISTO */}
      <section className={`p-6 rounded-2xl shadow-sm mb-8 border-2 ${editingId !== null ? 'border-orange-400 bg-orange-50' : 'border-white bg-white'}`}>
        <h2 className="text-xs font-bold uppercase mb-4 flex justify-between">
          {editingId !== null ? "Editando Produto" : "Novo Produto / Venda"}
          {editingId !== null && <button onClick={() => {setEditingId(null); setForm(initialForm);}} className="text-orange-600">Cancelar</button>}
        </h2>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input placeholder="ID Produto" className="border p-2 rounded-lg" value={form.product_id} onChange={e => setForm({...form, product_id: e.target.value})} required />
          <input placeholder="Categoria" className="border p-2 rounded-lg" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
          <input type="number" placeholder="Qtd" className="border p-2 rounded-lg" value={form.quantity || ''} onChange={e => setForm({...form, quantity: parseInt(e.target.value)})} required />
          <input type="number" step="0.01" placeholder="Preço Total" className="border p-2 rounded-lg" value={form.total_price || ''} onChange={e => setForm({...form, total_price: parseFloat(e.target.value)})} required />
          <button className={`font-bold text-white rounded-lg p-2 ${editingId !== null ? 'bg-orange-500' : 'bg-indigo-600'}`}>
            {editingId !== null ? "ATUALIZAR" : "ADICIONAR"}
          </button>
        </form>
      </section>

      {/* FILTRO POR CATEGORIA */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-xs font-bold text-slate-400 uppercase">Filtrar Categoria:</span>
        <select className="p-2 rounded-lg border bg-white text-xs font-bold" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">TODAS</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
        </select>
      </div>

      {/* DASHBOARD GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Vendas (Quantidade vs Lucro)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getGroupedData().slice(-10)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="lucro" name="Lucro (R$)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="qtd" name="Quantidade" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* HISTÓRICO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Itens Registrados</h3>
          <div className="overflow-y-auto max-h-80">
            <table className="w-full text-[10px]">
              <thead className="text-slate-300 border-b">
                <tr><th className="pb-2">PRODUTO</th><th className="pb-2">CAT</th><th className="pb-2 text-right">VALOR</th><th className="pb-2 text-right">AÇÕES</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredSales.slice().reverse().map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold">{v.product_id}</td>
                    <td className="py-3 text-slate-500">{v.category}</td>
                    <td className="py-3 text-right font-bold text-indigo-600">R$ {v.value.toFixed(2)}</td>
                    <td className="py-3 text-right flex justify-end gap-1">
                      <button onClick={() => startEdit(v)} className="p-1 bg-orange-100 text-orange-600 rounded"><Edit3 size={12}/></button>
                      <button onClick={async () => { if(confirm("Excluir?")) { await axios.delete(`${API_URL}/sales/delete/${v.id}`); fetchData(); } }} className="p-1 bg-red-100 text-red-600 rounded"><Trash2 size={12}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;