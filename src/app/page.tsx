"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { DollarSign, ShoppingCart, Users, TrendingUp, Loader2, ArrowRight } from "lucide-react";
import StatCard from "../components/StatCard";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// 1. Define Types to fix ESLint "any" errors
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string | number;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

interface DashboardStats {
  revenue: number;
  sales: number;
  customers: number;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    revenue: 0,
    sales: 0,
    customers: 0,
  });

  // 2. Fetch Live Data
  useEffect(() => {
    async function fetchDashboardData() {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const typedData = data as Order[];
        setOrders(typedData);
        
        // Calculate Totals safely
        const totalRevenue = typedData.reduce((sum, order) => sum + (order.total_amount || 0), 0);
        const totalSales = typedData.length;
        const uniqueCustomers = new Set(typedData.map(o => o.customer_email)).size;

        setStats({
          revenue: totalRevenue,
          sales: totalSales,
          customers: uniqueCustomers
        });
      }
      setLoading(false);
    }
    fetchDashboardData();
  }, []);

  // 3. Prepare Chart Data (Last 7 transactions)
  const chartData = orders.slice(0, 7).reverse().map((order) => ({
    name: new Date(order.created_at).toLocaleDateString(undefined, { weekday: 'short' }),
    sales: order.total_amount
  }));

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white-900">Welcome back, Admin</h1>
          <p className="text-slate-200">Here is what is happening with SHAIDO today.</p>
        </div>
        <Link href="/orders" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 ">
          Manage Orders <ArrowRight size={18} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
          change="+12.5%" 
          isPositive={true} 
          icon={DollarSign} 
        />
        <StatCard 
          title="Total Sales" 
          value={stats.sales.toString()} 
          change="+8.2%" 
          isPositive={true} 
          icon={ShoppingCart} 
        />
        <StatCard 
          title="Active Customers" 
          value={stats.customers.toString()} 
          change="+3.2%" 
          isPositive={true} 
          icon={Users} 
        />
        <StatCard 
          title="Avg. Order" 
          value={`$${stats.sales > 0 ? (stats.revenue / stats.sales).toFixed(2) : "0.00"}`} 
          change="+2.4%" 
          isPositive={true} 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-900">Revenue Stream</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.length > 0 ? chartData : [{name: "No Data", sales: 0}]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#2563eb" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Panel */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-900">Recent Activity</h2>
          <div className="space-y-6">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-slate-900">{order.customer_name}</p>
                  <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">${(order.total_amount || 0).toFixed(2)}</p>
                  <p className={`text-[10px] uppercase font-bold ${
                    order.status === 'Completed' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-slate-400 text-sm italic">No recent orders found.</p>
            )}
          </div>
          <Link 
            href="/orders" 
            className="block w-full text-center mt-8 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
          >
            View All Activity
          </Link>
        </div>
      </div>
    </div>
  );
}