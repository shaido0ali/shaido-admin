"use client";
import { useEffect, useState } from "react";
import { Search, Filter, MoreHorizontal, Loader2, DollarSign, Package, Mail, MapPin } from "lucide-react";
import { supabase } from "../../../lib/supabase";

interface Order {
  id: string | number;
  customer_name: string;
  customer_email: string;
  address: string; // Added address
  total_amount: number;
  status: string;
  created_at: string;
  items: { name: string }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data as Order[]);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string | number, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
  
    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) || // Added email search
    order.id.toString().includes(searchTerm)
  );

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-200">Orders</h1>
          <p className="text-slate-300">Manage and track your customer transactions in real-time.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
            <h3 className="text-2xl font-black text-slate-900">${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Orders</p>
            <h3 className="text-2xl font-black text-slate-900">{filteredOrders.length}</h3>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or order ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all text-sm text-black"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="font-medium">Loading live orders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Shipping Address</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Product(s)</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 text-sm font-bold text-blue-600 font-mono">
                      #{order.id.toString().slice(-6).toUpperCase()}
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{order.customer_name}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail size={12} /> {order.customer_email}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-start gap-1 text-xs text-slate-600 max-w-[200px]">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" />
                        <span className="line-clamp-2">{order.address}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sm text-slate-600">
                      {order.items && order.items.length > 0 ? (
                        <div className="flex flex-col">
                          <span className="font-medium">{order.items[0].name}</span>
                          {order.items.length > 1 && (
                            <span className="text-[10px] text-blue-600 font-bold uppercase">
                              +{order.items.length - 1} more items
                            </span>
                          )}
                        </div>
                      ) : "No items"}
                    </td>
                    <td className="p-5 text-sm font-bold text-slate-900">
                      ${(order.total_amount || 0).toFixed(2)}
                    </td>
                    <td className="p-5">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight border-none outline-none cursor-pointer appearance-none text-center transition-all ${
                          order.status === "Completed" ? "bg-green-100 text-green-700" :
                          order.status === "Pending" ? "bg-amber-100 text-amber-700" :
                          order.status === "Shipped" ? "bg-purple-100 text-purple-700" :
                          "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-5 text-sm text-slate-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-5 text-right">
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="p-20 text-center text-slate-400">
                <p className="italic text-lg">No orders found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}