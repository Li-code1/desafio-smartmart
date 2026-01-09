import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Trash2, Edit3, TrendingUp, Upload } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const API_URL = "http://127.0.0.1:9000";
const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

interface SaleItem {
  id: number; product_id: string; category: string; value: number; quantity: number; date: string;
}

function App() {
  const [salesHistory, setSalesHistory] = useState<SaleItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ product_id: "", category: "", quantity: 0, total_price: 0, date: new Date().toISOString().split('T')[0] });

  const fetchData = async () => {
    try {
      const [resHistory, resCats] = await Promise.all([
        axios.get(`${API_URL}/sales/history`),
        axios.get(`${API_URL}/categories`)
      ]);
      setSalesHistory(resHistory.data);
      setCategories(resCats.data);
    } catch (err) { console.error("Erro ao carregar:", err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  // FUNÇÕES DE CRUD
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await axios.put(`${API_URL}/sales/update/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/sales/add`, form);
      }
      setForm({ product_id: "", category: "", quantity: 0, total_price: 0, date: new Date().toISOString().split('T')[0] });
      fetchData();
    } catch (err) { alert("Erro ao salvar dados."); }
  };

  const startEdit = (sale: SaleItem) => {
    setEditingId(sale.id);
    setForm({ product_id: sale.product_id, category: sale.category, quantity: sale.quantity, total_price: sale.value, date: sale.date });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await axios.delete(`${API_URL}/sales/delete/${id}`);
      fetchData();
    }
  };

  // LÓGICA DOS GRÁFICOS
  const getGroupedByDate = () => {
    const groups = salesHistory.reduce((acc: any, item: SaleItem) => {
      acc[item.date] = (acc[item.date] || 0) + Number(item.value);
      return acc;
    }, {});
    return Object.entries(groups).map(([name, lucro]) => ({ name, lucro })).sort().slice(-7);
  };

  const getGroupedByCategory = () => {
    const groups = salesHistory.reduce((acc: any, item: SaleItem) => {
      const cat = isNaN(Number(item.category)) ? item.category : "Outros";
      acc[cat] = (acc[cat] || 0) + Number(item.value);
      return acc;
    }, {});
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  };

  const filteredSales = salesHistory.filter(s => 
    (s.product_id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "" || s.category === selectedCategory)
  );

  if (loading) return <div className="p-20 text-center font-bold">Carregando SmartMart...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-black text-indigo-900 flex items-center gap-2"><TrendingUp /> SMARTMART</h1>
        <div className="flex gap-4">
            <input className="border p-2 rounded-xl text-sm" placeholder="Buscar produto..." onChange={e => setSearchTerm(e.target.value)} />
            <select className="border p-2 rounded-xl text-sm" onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Todas Categorias</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
      </header>

      {/* 1. DOIS GRÁFICOS LADO A LADO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Lucro por Data</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={getGroupedByDate()}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="lucro" fill="#4f46e5" /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Divisão por Categoria</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={getGroupedByCategory()} dataKey="value" nameKey="name" outerRadius={60} label>{getGroupedByCategory().map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. FORMULÁRIO (ADICIONAR/EDITAR) */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
        <h2 className="text-xs font-bold mb-4">{editingId !== null ? "EDITAR PRODUTO" : "ADICIONAR PRODUTO"}</h2>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input className="border p-2 rounded" placeholder="Produto" value={form.product_id} onChange={e => setForm({...form, product_id: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Categoria" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
          <input className="border p-2 rounded" type="number" placeholder="Qtd" value={form.quantity || ''} onChange={e => setForm({...form, quantity: Number(e.target.value)})} required />
          <input className="border p-2 rounded" type="number" step="0.01" placeholder="Preço" value={form.total_price || ''} onChange={e => setForm({...form, total_price: Number(e.target.value)})} required />
          <button className="bg-indigo-600 text-white font-bold rounded p-2">{editingId !== null ? "SALVAR" : "ADICIONAR"}</button>
        </form>
      </section>

      {/* 3. LISTAGEM COM EXCLUIR E EDITAR */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400">
            <tr><th className="p-4">PRODUTO</th><th>CATEGORIA</th><th>VALOR</th><th className="text-right p-4">AÇÕES</th></tr>
          </thead>
          <tbody>
            {filteredSales.slice().reverse().map(sale => (
              <tr key={sale.id} className="border-t">
                <td className="p-4 font-bold">{sale.product_id}</td>
                <td>{sale.category}</td>
                <td className="text-indigo-600 font-bold">R$ {sale.value.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <button onClick={() => startEdit(sale)} className="mr-2 text-orange-500"><Edit3 size={16}/></button>
                  <button onClick={() => handleDelete(sale.id)} className="text-red-500"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;