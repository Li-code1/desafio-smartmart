import { useEffect, useState } from 'react';
import axios from 'axios';
import { LayoutDashboard, History, PlusCircle, Search, Trash2, Edit3, XCircle, TrendingUp, DollarSign, Package } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = "http://127.0.0.1:9000";

function App() {
  const [salesHistory, setSalesHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({ total_revenue: 0, total_quantity: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const initialForm = { product_id: 1, quantity: 0, total_price: 0, date: new Date().toISOString().split('T')[0] };
  const [form, setForm] = useState(initialForm);

  // FUNÇÃO PARA FORMATAR DATA: Transforma AAAA-MM-DD em DD/MM/AAAA
  const formatDateBR = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchData = async () => {
    try {
      const [resStats, resHistory] = await Promise.all([
        axios.get(`${API_URL}/sales/stats`),
        axios.get(`${API_URL}/sales/history`)
      ]);
      setStats(resStats.data);
      setSalesHistory(resHistory.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.total_price <= 0) return alert("Insira um valor válido.");
    try {
      if (editingId !== null) {
        await axios.put(`${API_URL}/sales/update/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/sales/add`, form);
      }
      setForm(initialForm);
      fetchData();
    } catch (err) { alert("Erro ao guardar dados."); }
  };

  const startEdit = (sale: any) => {
    setEditingId(sale.id);
    setForm({ product_id: 1, quantity: sale.quantity, total_price: sale.value, date: sale.date });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem a certeza que deseja eliminar esta venda?")) {
      await axios.delete(`${API_URL}/sales/delete/${id}`);
      fetchData();
    }
  };

  const getGroupedData = () => {
    const groups = salesHistory.reduce((acc: any, item: any) => {
      acc[item.date] = acc[item.date] || { name: item.date, value: 0 };
      acc[item.date].value += item.value;
      return acc;
    }, {});
    // Aqui formatamos a data do nome para o gráfico
    return Object.values(groups)
      .sort((a: any, b: any) => new Date(a.name).getTime() - new Date(b.name).getTime())
      .map((item: any) => ({ ...item, displayName: formatDateBR(item.name) }));
  };

  const filteredSales = salesHistory.filter(s => s.date.includes(searchTerm) || formatDateBR(s.date).includes(searchTerm));

  if (loading) return <div className="p-20 text-center font-bold text-indigo-600">SmartMart a carregar...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-black text-indigo-900 flex items-center gap-2"><TrendingUp className="text-indigo-600" /> SMARTMART PRO</h1>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-white" placeholder="Filtrar por data (ex: 09/01)..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </header>

      {/* FORMULÁRIO */}
      <section className={`p-6 rounded-2xl shadow-sm mb-8 border-2 transition-all ${editingId !== null ? 'border-orange-400 bg-orange-50' : 'border-white bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold uppercase flex items-center gap-2">
            {editingId !== null ? <Edit3 size={16} className="text-orange-600" /> : <PlusCircle size={16} className="text-emerald-500" />}
            {editingId !== null ? "A editar registo" : "Nova venda manual"}
          </h2>
          {editingId !== null && (
            <button onClick={() => {setEditingId(null); setForm(initialForm);}} className="text-orange-600 text-xs font-bold flex items-center gap-1 hover:underline">
              <XCircle size={14}/> CANCELAR EDIÇÃO
            </button>
          )}
        </div>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="date" className="border p-2.5 rounded-lg bg-white font-medium" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          <input type="number" placeholder="Quantidade" className="border p-2.5 rounded-lg bg-white" value={form.quantity || ''} onChange={e => setForm({...form, quantity: parseInt(e.target.value)})} />
          <input type="number" step="0.01" placeholder="Preço Total R$" className="border p-2.5 rounded-lg bg-white" value={form.total_price || ''} onChange={e => setForm({...form, total_price: parseFloat(e.target.value)})} />
          <button className={`p-2.5 rounded-lg font-bold text-white shadow-md transition-all ${editingId !== null ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            {editingId !== null ? "ATUALIZAR" : "GUARDAR NO CSV"}
          </button>
        </form>
      </section>

      {/* CARDS KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-indigo-600 flex justify-between items-center">
          <div><p className="text-xs font-bold text-slate-400 uppercase">Receita Total</p><p className="text-3xl font-black tracking-tighter">R$ {stats.total_revenue.toLocaleString('pt-BR')}</p></div>
          <DollarSign size={40} className="text-slate-100" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-emerald-500 flex justify-between items-center">
          <div><p className="text-xs font-bold text-slate-400 uppercase">Itens Vendidos</p><p className="text-3xl font-black tracking-tighter">{stats.total_quantity} un.</p></div>
          <Package size={40} className="text-slate-100" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GRÁFICO */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-6">Desempenho por Data</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getGroupedData().slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="displayName" tick={{fontSize: 11}} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip formatter={(v: any) => [`R$ ${v.toFixed(2)}`, "Total"]} />
                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABELA COM DATA FORMATADA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><History size={16}/> Histórico</h3>
          <div className="overflow-y-auto max-h-[350px]">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white border-b text-slate-300 font-bold">
                <tr><th className="pb-2">DATA</th><th className="pb-2 text-right">VALOR</th><th className="pb-2 text-right px-2">AÇÕES</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredSales.slice().reverse().map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-700">{formatDateBR(v.date)}</td>
                    <td className="py-4 font-bold text-emerald-600 text-right font-mono">R$ {v.value.toFixed(2)}</td>
                    <td className="py-4 text-right flex justify-end gap-2 px-2">
                      <button onClick={() => startEdit(v)} className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors shadow-sm" title="Editar">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete(v.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors shadow-sm" title="Eliminar">
                        <Trash2 size={14} />
                      </button>
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