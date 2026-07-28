import { ShieldAlert, Users, LayoutDashboard, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="text-blue-500" />
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 py-6 space-y-2">
          <a href="#" className="flex items-center gap-3 px-6 py-3 bg-blue-600/10 text-blue-400 border-r-4 border-blue-500">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 hover:text-white transition-colors">
            <Users size={20} /> Manage Users
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 hover:text-white transition-colors">
            <ShieldAlert size={20} /> Operators & Approvals
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings size={20} /> System Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Platform Overview</h1>
          <p className="text-slate-500">Global metrics and recent activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Mock KPI Cards */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Total Users</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">124,500</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Total Operators</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">450</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Bookings Today</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">8,230</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">GMV Today</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">₹4.2M</p>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pending Operator Approvals</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="p-6 text-center text-slate-500">
            No pending approvals at this time.
          </div>
        </div>
      </main>
    </div>
  );
}
