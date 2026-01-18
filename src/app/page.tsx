"use client";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import StatCard from "../components/StatCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, Admin</h1>
        <p className="text-slate-500">Here is what is happening with SHAIDO today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231.89" change="20.1%" isPositive={true} icon={DollarSign} />
        <StatCard title="Total Sales" value="+2,350" change="10.5%" isPositive={true} icon={ShoppingCart} />
        <StatCard title="Active Customers" value="12,234" change="3.2%" isPositive={true} icon={Users} />
        <StatCard title="Conversion Rate" value="4.5%" change="-1.1%" isPositive={false} icon={TrendingUp} />
      </div>

      {/* Sales Chart Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-slate-900">Revenue Forecast</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
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
    </div>
  );
}