import { Search, Filter, ShieldCheck, Mail, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_USERS = [
  { id: 'USR-1092', name: 'Rahul Verma', email: 'rahul.v@example.com', role: 'CUSTOMER', status: 'ACTIVE', joined: '2025-01-15' },
  { id: 'USR-1093', name: 'Neha Sharma', email: 'neha.s@example.com', role: 'CUSTOMER', status: 'ACTIVE', joined: '2025-03-22' },
  { id: 'USR-1094', name: 'Admin Operations', email: 'ops@travel.com', role: 'ADMIN', status: 'ACTIVE', joined: '2024-11-10' },
  { id: 'USR-1095', name: 'Suspicious User', email: 'bot123@spam.com', role: 'CUSTOMER', status: 'SUSPENDED', joined: '2026-07-20' },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User & Role Management</h1>
        <p className="text-slate-500">Manage customers, admins, and system access.</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search users by name, email, or ID..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button variant="outline" className="ml-4"><Filter size={16} /> <span className="hidden md:inline ml-2">Filters</span></Button>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">User ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">{user.id}</td>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">{user.name}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" /> {user.email}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {user.role === 'ADMIN' && <ShieldCheck size={12} className="mr-1" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      user.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8">Manage Role</Button>
                      {user.status === 'ACTIVE' ? (
                        <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 px-2">
                          <ShieldAlert size={16} /> Suspend
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-8 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 px-2">
                          <ShieldCheck size={16} /> Unsuspend
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
