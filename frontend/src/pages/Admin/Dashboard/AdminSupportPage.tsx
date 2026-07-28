import { useState } from 'react';
import { Search, Filter, MessageSquare, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

const MOCK_TICKETS = [
  { id: 'TKT-4501', subject: 'Bus did not arrive at boarding point', user: 'Rahul Verma', priority: 'HIGH', status: 'OPEN' as TicketStatus, category: 'BUS', createdAt: '2026-07-25 08:30' },
  { id: 'TKT-4500', subject: 'Refund not received after cancellation', user: 'Neha Sharma', priority: 'CRITICAL', status: 'IN_PROGRESS' as TicketStatus, category: 'PAYMENT', createdAt: '2026-07-24 16:45' },
  { id: 'TKT-4499', subject: 'Seat allotment different from booking', user: 'Amit Kumar', priority: 'MEDIUM', status: 'RESOLVED' as TicketStatus, category: 'TRAIN', createdAt: '2026-07-23 12:00' },
  { id: 'TKT-4498', subject: 'Flight rescheduled, need assistance', user: 'Priya Singh', priority: 'HIGH', status: 'IN_PROGRESS' as TicketStatus, category: 'FLIGHT', createdAt: '2026-07-22 09:15' },
  { id: 'TKT-4497', subject: 'Unable to download ticket PDF', user: 'Deepak Jain', priority: 'LOW', status: 'CLOSED' as TicketStatus, category: 'GENERAL', createdAt: '2026-07-21 11:30' },
];

const STATUS_COLORS: Record<TicketStatus, string> = {
  OPEN: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  IN_PROGRESS: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  RESOLVED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  CLOSED: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};

const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: 'text-red-600 dark:text-red-400',
  HIGH: 'text-orange-600 dark:text-orange-400',
  MEDIUM: 'text-yellow-600 dark:text-yellow-400',
  LOW: 'text-slate-500',
};

export default function AdminSupportPage() {
  const [activeFilter, setActiveFilter] = useState<TicketStatus | 'ALL'>('ALL');

  const filtered = activeFilter === 'ALL' ? MOCK_TICKETS : MOCK_TICKETS.filter(t => t.status === activeFilter);

  const countByStatus = (s: TicketStatus) => MOCK_TICKETS.filter(t => t.status === s).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Support Tickets</h1>
        <p className="text-slate-500">Manage customer complaints and inquiries.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => setActiveFilter('OPEN')} className={`bg-white dark:bg-slate-900 rounded-xl p-4 border shadow-sm text-left transition-all ${activeFilter === 'OPEN' ? 'border-red-400 ring-2 ring-red-200 dark:ring-red-900/50' : 'border-slate-200 dark:border-slate-800'}`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-xs font-bold uppercase text-slate-500">Open</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{countByStatus('OPEN')}</p>
        </button>
        <button onClick={() => setActiveFilter('IN_PROGRESS')} className={`bg-white dark:bg-slate-900 rounded-xl p-4 border shadow-sm text-left transition-all ${activeFilter === 'IN_PROGRESS' ? 'border-orange-400 ring-2 ring-orange-200 dark:ring-orange-900/50' : 'border-slate-200 dark:border-slate-800'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-orange-500" />
            <span className="text-xs font-bold uppercase text-slate-500">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{countByStatus('IN_PROGRESS')}</p>
        </button>
        <button onClick={() => setActiveFilter('RESOLVED')} className={`bg-white dark:bg-slate-900 rounded-xl p-4 border shadow-sm text-left transition-all ${activeFilter === 'RESOLVED' ? 'border-green-400 ring-2 ring-green-200 dark:ring-green-900/50' : 'border-slate-200 dark:border-slate-800'}`}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-xs font-bold uppercase text-slate-500">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{countByStatus('RESOLVED')}</p>
        </button>
        <button onClick={() => setActiveFilter('ALL')} className={`bg-white dark:bg-slate-900 rounded-xl p-4 border shadow-sm text-left transition-all ${activeFilter === 'ALL' ? 'border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900/50' : 'border-slate-200 dark:border-slate-800'}`}>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={16} className="text-blue-500" />
            <span className="text-xs font-bold uppercase text-slate-500">All Tickets</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{MOCK_TICKETS.length}</p>
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search tickets by ID, subject, or user..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button variant="outline" className="ml-4"><Filter size={16} /> <span className="hidden md:inline ml-2">Filters</span></Button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Ticket ID</th>
                <th className="p-4 font-semibold">Subject</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Priority</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Created</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">{ticket.id}</td>
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white max-w-xs truncate">{ticket.subject}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{ticket.user}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold uppercase ${PRIORITY_COLORS[ticket.priority]}`}>
                      ● {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{ticket.category}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${STATUS_COLORS[ticket.status]}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{ticket.createdAt}</td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" className="h-8">View</Button>
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
