import { Search, Filter, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_OPERATORS = [
  { id: 'OP-001', name: 'IndiGo Airlines', type: 'FLIGHT', email: 'admin@goindigo.in', status: 'VERIFIED', rating: 4.8 },
  { id: 'OP-002', name: 'SRS Travels', type: 'BUS', email: 'contact@srstravels.com', status: 'VERIFIED', rating: 4.2 },
  { id: 'OP-003', name: 'Zingbus', type: 'BUS', email: 'hello@zingbus.com', status: 'PENDING', rating: 0 },
];

export default function AdminOperatorsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Operator KYC & Management</h1>
        <p className="text-slate-500">Approve new operators and manage existing partnerships.</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search operators by name or email..." 
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
                <th className="p-4 font-semibold">Operator ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">KYC Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_OPERATORS.map((op) => (
                <tr key={op.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">{op.id}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {op.status === 'VERIFIED' && <Shield size={14} className="text-blue-500" />} {op.name}
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{op.type}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{op.email}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      op.status === 'VERIFIED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {op.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {op.status === 'PENDING' ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white px-3">
                          Verify
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8 px-3">
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="h-8">View Docs</Button>
                    )}
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
