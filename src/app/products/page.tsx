"use client";
import { useState, useEffect } from "react";
import { Plus, Package, Trash2, X, RotateCcw } from "lucide-react";
import { supabase } from "../../../lib/supabase";

interface Product {
  id: string | number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image_url?: string;
  description?: string;
  created_at: string;
}

const STORAGE_KEY = "shaido_demo_products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function initProducts() {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setProducts(JSON.parse(savedData));
        setLoading(false);
      } else {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          setProducts(data as Product[]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        setLoading(false);
      }
    }
    initProducts();
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      name: newName,
      price: parseFloat(newPrice),
      category: category,
      stock: 20,
      image_url: newImageUrl,
      description: description,
      created_at: new Date().toISOString()
    };
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    setIsDrawerOpen(false);
    setNewName(""); setNewPrice(""); setCategory(""); setNewImageUrl(""); setDescription("");
  };

  const handleDelete = (id: string | number) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  };

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen pb-20 md:pb-0">
      {/* Header - Responsive Flex */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Inventory</h1>
          <p className="text-slate-500 text-sm">Manage your product catalog.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={resetDemo}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200"
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex-[2] sm:flex-none bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Product Grid - Adaptive Columns */}
      {loading ? (
        <div className="flex justify-center p-12">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <Package size={24} className="text-slate-400" />
                  )}
                </div>
                {/* Delete Button - Better visibility on mobile */}
                <button 
                  className="p-2 text-slate-300 hover:text-red-600 rounded-lg transition-all md:opacity-0 md:group-hover:opacity-100" 
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 className="font-bold text-slate-900 text-base md:text-lg truncate">{product.name}</h3>
              <p className="text-slate-500 text-xs md:text-sm mb-4">{product.category}</p>
              <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                <p className="text-lg md:text-xl font-black text-slate-900">${product.price.toFixed(2)}</p>
                <p className={`font-bold text-xs ${product.stock <= 15 ? "text-amber-500" : "text-slate-400"}`}>
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- SIDE DRAWER --- */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]" onClick={() => setIsDrawerOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-[400px] bg-white z-[110] shadow-2xl transition-transform duration-300 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 md:p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-5 flex-1 overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
              <input 
                type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
                className="w-full text-slate-700 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price ($)</label>
                <input 
                  type="number" step="0.01" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full p-3 text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                <input 
                  type="text" required value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-slate-700 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                  placeholder="Category"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
              <textarea 
                required value={description} onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl outline-none focus:border-blue-500 min-h-[80px]"
                placeholder="Product details..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
              <input 
                type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full text-slate-700 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
            
            <div className="pt-4">
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                Confirm & Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
