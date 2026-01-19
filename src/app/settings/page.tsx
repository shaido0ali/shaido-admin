"use client";
import { useState } from "react";
import { Save, Bell, Shield, Globe, User, Mail } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account preferences and store configuration.</p>
      </div>

      {/* Profile Section */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <User size={20} />
          </div>
          <h2 className="font-bold text-slate-900">Admin Profile</h2>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <input type="text" defaultValue="Admin User" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input type="email" defaultValue="admin@shaido.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600" />
          </div>
        </div>
      </section>

      {/* Store Preferences Section */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <Globe size={20} />
          </div>
          <h2 className="font-bold text-slate-900">Store Configuration</h2>
        </div>
        <div className="p-8 space-y-6">
          {/* Toggle 1: Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="p-2 bg-slate-100 rounded-xl h-fit">
                <Bell size={20} className="text-slate-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Order Notifications</p>
                <p className="text-sm text-slate-500">Receive an email every time a new order is placed.</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Toggle 2: Maintenance Mode */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="p-2 bg-slate-100 rounded-xl h-fit">
                <Shield size={20} className="text-slate-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Maintenance Mode</p>
                <p className="text-sm text-slate-500">Put the storefront offline for updates.</p>
              </div>
            </div>
            <button 
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${maintenanceMode ? 'bg-red-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${maintenanceMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
          Discard Changes
        </button>
        <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95">
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}