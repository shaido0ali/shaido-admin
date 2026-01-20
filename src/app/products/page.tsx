"use client";
import { useState, useEffect } from "react";
import { Plus, Package, Trash2, X } from "lucide-react";
import { supabase } from "../../../lib/supabase";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Form State
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [description,setDescription]= useState("");

  // 1. Fetch products from Supabase on load
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) setProducts(data);
    }
    fetchProducts();
  }, []);

  // 2. Optimized Add Product Function
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('products')
      .insert([
        { 
          name: newName, 
          price: parseFloat(newPrice), 
          category: category, 
          stock: 20,
          image_url: newImageUrl,
          description: description
          
        }
      ])
      .select();

    if (error) {
      alert("Error saving to database: " + error.message);
    } else if (data) {
      setProducts([data[0], ...products]);
      // Reset Form and Close Drawer
      setIsDrawerOpen(false);
      setNewName("");
      setNewPrice("");
      setCategory("");
      setNewImageUrl("");
      setDescription("");
    }
  };

  // 3. New Delete Function
  const handleDelete = async (id: any) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      setProducts(products.filter((p: any) => p.id !== id));
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white-900">Inventory</h1>
          <p className="text-slate-200">Manage your product catalog.</p>
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
        {products.map((product: any) => (
          <div key={product.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <Package size={24} className="text-slate-400" />
                )}
              </div>
              <div className="flex gap-1">
                <button 
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-all" 
                  onClick={() => handleDelete(product.id)}
                >
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
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={() => setIsDrawerOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-[400px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-6 flex-1 overflow-y-auto pr-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
              <input 
                type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
                className="w-full text-slate-700 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder="e.g. Shaido Ghost Ultra"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
              <input 
                type="number" step="0.01" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)}
                className="w-full p-3 text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <input 
                type="text" required value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full text-slate-700 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder="e.g. Running"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">description</label>
              <input 
                type="text" required value={description} onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
              <input 
                type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full text-slate-700 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder="https://images.com/shoe.jpg"
              />
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Confirm & Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}