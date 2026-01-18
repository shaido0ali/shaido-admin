"use client";
import { useState } from "react";
import { Plus, Package, Edit, Trash2, AlertCircle, X } from "lucide-react";

// Initial Mock Data
const initialProducts = [
  { id: 1, name: "Shaido Ghost X", category: "Running", price: "199.00", stock: 45 },
  { id: 2, name: "Shaido Flow", category: "Lifestyle", price: "120.00", stock: 12 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Form State
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd = {
      id: Date.now(),
      name: newName,
      category: "New Arrival",
      price: newPrice,
      stock: 20,
    };
    setProducts([newProd, ...products]);
    setIsDrawerOpen(false); // Close drawer
    setNewName(""); // Reset form
    setNewPrice("");
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory</h1>
          <p className="text-slate-500">Manage your product catalog.</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                <Package size={24} />
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-all" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{product.name}</h3>
            <p className="text-slate-500 text-sm mb-4">{product.category}</p>
            <div className="flex justify-between items-end pt-4 border-t border-slate-50">
              <p className="text-xl font-black text-slate-900">${product.price}</p>
              <p className={`font-bold text-sm ${product.stock <= 15 ? "text-amber-500" : "text-slate-400"}`}>
                Stock: {product.stock}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- SIDE DRAWER --- */}
      {/* Backdrop */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-[400px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-6 flex-1">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
              <input 
                type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder="e.g. Shaido Ghost Ultra"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
              <input 
                type="number" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Confirm & Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}