import { useEffect, useState } from 'react';
import axios from 'axios';
import { LayoutDashboard, History, Search, FileDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_URL = "http://127.0.0.1:9000";

function App() {
  const [stats, setStats] = useState({ total_revenue: 0, total_quantity: 0 });
  const [salesHistory, setSalesHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resStats, resHistory] = await Promise.all([
          axios.get(`${API_URL}/sales/stats`),
          axios.get(`${API_URL}/sales/history`)
        ]);
        setStats(resStats.data || { total_revenue: 0, total_quantity: 0 });
        setSalesHistory(resHistory.data || []);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("SmartMart - Relatorio de Vendas", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [['Data', 'Total da Venda']],
      body: salesHistory.map((v: any) => [v.name || v.date, `R$ ${v.value || v.total_price}`]),
    });
    doc.save("vendas_smartmart.pdf");
  };

  if (loading) return <div className="flex h-screen items-center justify-center font-bold">Carregando SmartMart...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
          <LayoutDashboard className="text-blue-600" /> SmartMart Dashboard
        </h1>
      </header>

      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-blue-500">
          <p className="text-gray-500 text-sm font-bold uppercase">Receita Total</p>
          <p className="text-3xl font-bold text-blue-900">
            R$ {(stats.total_revenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-green-500">
          <p className="text-gray-500 text-sm font-bold uppercase">Vendas Realizadas</p>
          <p className="text-3xl font-bold text-green-900">{(stats.total_quantity || 0)} un.</p>
        </div>
      </div>

      {/* GRÁFICO DE BARRAS */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-6 text-gray-700">Faturamento por Data</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesHistory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABELA DE DADOS */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <History className="text-blue-600" /> Histórico Detalhado
          </h2>
          <button onClick={exportToPDF} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
            <FileDown size={18} /> PDF
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-xs border-b">
              <th className="p-4">DATA</th>
              <th className="p-4 text-right">VALOR</th>
            </tr>
          </thead>
          <tbody>
            {salesHistory.map((venda: any, i) => (
              <tr key={i} className="border-b">
                <td className="p-4">{venda.name}</td>
                <td className="p-4 text-right font-bold text-green-600">R$ {venda.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;