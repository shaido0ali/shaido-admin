"use client";
import { Search, Filter, MoreHorizontal, Eye } from "lucide-react";

const orders = [
  { id: "#SH-9021", customer: "Alex Rivera", product: "Shaido Ghost X", amount: "$199.00", status: "Completed", date: "Oct 24, 2025" },
  { id: "#SH-9022", customer: "Sarah Chen", product: "Shaido Flow", amount: "$120.00", status: "Processing", date: "Oct 25, 2025" },
  { id: "#SH-9023", customer: "Marcus Vogt", product: "Shaido Ghost X", amount: "$199.00", status: "Cancelled", date: "Oct 25, 2025" },
  { id: "#SH-9024", customer: "Elena Rossi", product: "Shaido Pulse", amount: "$150.00", status: "Completed", date: "Oct 26, 2025" },
  { id: "#SH-9025", customer: "Julian Banks", product: "Shaido Aero", amount: "$210.00", status: "Shipped", date: "Oct 27, 2025" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-500">Manage and track your customer transactions.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
          Export CSV
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Order ID</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
              <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-5 text-sm font-bold text-blue-600">{order.id}</td>
                <td className="p-5 text-sm font-medium text-slate-900">{order.customer}</td>
                <td className="p-5 text-sm text-slate-600">{order.product}</td>
                <td className="p-5 text-sm font-bold text-slate-900">{order.amount}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${
                    order.status === "Completed" ? "bg-green-100 text-green-700" :
                    order.status === "Processing" ? "bg-blue-100 text-blue-700" :
                    order.status === "Shipped" ? "bg-purple-100 text-purple-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-5 text-sm text-slate-500">{order.date}</td>
                <td className="p-5 text-right">
                  <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}