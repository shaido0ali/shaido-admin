import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export default function StatCard({ title, value, change, isPositive, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Icon size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}>
          {isPositive ? "+" : ""}{change}
        </span>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}