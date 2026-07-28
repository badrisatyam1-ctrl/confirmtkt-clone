import { useState } from 'react';
import { Search, Filter, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_REFUNDS = [
  { id: 'REF-9921', pnr: 'B7XY9Z', user: 'Amit Patel', amount: 4500, mode: 'Flight', requestDate: '2026-07-24', status: 'PENDING' },
  { id: 'REF-9920', pnr: '8901234567', user: 'Neha Sharma', amount: 1200, mode: 'Train', requestDate: '2026-07-23', status: 'PROCESSED' },
  { id: 'REF-9919', pnr: 'BUS-1029', user: 'Rahul Verma', amount: 800, mode: 'Bus', requestDate: '2026-07-22', status: 'REJECTED' },
  { id: 'REF-9918', pnr: 'Z8A2BQ', user: 'Priya Singh', amount: 12500, mode: 'Flight', requestDate: '2026-07-20', status: 'PROCESSED' },
];

export default function RefundsPage() {
  const [activeTab, setActiveTab] = useState('PENDING');

  const filteredRefunds = MOCK_REFUNDS.filter(r => r.status === activeTab);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Refunds Management</h1>
        <p className="text-slate-500">Process user cancellation refunds and handle chargebacks.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex gap-2">
          {['PENDING', 'PROCESSED', 'REJECTED'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search PNR or Refund ID" 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button variant="outline" className="px-3"><Filter size={16} /></Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Refund ID</th>
                <th className="p-4 font-semibold">PNR / Ref</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Mode</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Req Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No {activeTab.toLowerCase()} refunds found.
                  </td>
                </tr>
              ) : (
                filteredRefunds.map((refund) => (
                  <tr key={refund.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">{refund.id}</td>
                    <td className="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">{refund.pnr}</td>
                    <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{refund.user}</td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{refund.mode}</td>
                    <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">₹{refund.amount}</td>
                    <td className="p-4 text-sm text-slate-500">{refund.requestDate}</td>
                    <td className="p-4 text-right">
                      {activeTab === 'PENDING' ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white px-2">
                            <CheckCircle size={14} className="mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="destructive" className="h-8 px-2">
                            <XCircle size={14} className="mr-1" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <MoreVertical size={16} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
