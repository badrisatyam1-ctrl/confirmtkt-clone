import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_BUSES = [
  { id: 'BUS-101', registrationNumber: 'KA-01-AB-1234', type: 'AC_SLEEPER', capacity: 32, currentStatus: 'ACTIVE', make: 'Volvo 9400', lastService: '2026-07-10' },
  { id: 'BUS-102', registrationNumber: 'KA-01-CD-5678', type: 'AC_SEATER', capacity: 45, currentStatus: 'ACTIVE', make: 'Scania Metrolink', lastService: '2026-06-25' },
  { id: 'BUS-103', registrationNumber: 'MH-12-EF-9012', type: 'NON_AC_SLEEPER', capacity: 36, currentStatus: 'MAINTENANCE', make: 'Tata Marcopolo', lastService: '2026-07-22' },
  { id: 'BUS-104', registrationNumber: 'DL-05-GH-3456', type: 'AC_SLEEPER', capacity: 32, currentStatus: 'ACTIVE', make: 'Volvo 9400', lastService: '2026-07-05' },
];

export default function OperatorBusesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuses = MOCK_BUSES.filter(b => 
    b.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Fleet</h1>
          <p className="text-slate-500">Manage your buses and their operational status.</p>
        </div>
        <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
          <Plus size={16} /> Add New Bus
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{MOCK_BUSES.length}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Total Buses</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-green-600">3</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-orange-500">1</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">In Maintenance</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-blue-600">145</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Total Capacity</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by registration or make..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
        <Button variant="outline" className="ml-4"><Filter size={16} /> <span className="hidden md:inline ml-2">Filter</span></Button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Bus Details</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Capacity</th>
                <th className="p-4 font-semibold">Last Service</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBuses.map(bus => (
                <tr key={bus.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg flex items-center justify-center">
                        <Bus size={20} />
                      </div>
                      <div>
                        <p className="font-bold font-mono text-slate-900 dark:text-white">{bus.registrationNumber}</p>
                        <p className="text-xs text-slate-500">{bus.make}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {bus.type.replace('_', ' ')}
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{bus.capacity} Seats</td>
                  <td className="p-4 text-sm text-slate-500">{bus.lastService}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      bus.currentStatus === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      bus.currentStatus === 'MAINTENANCE' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {bus.currentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBuses.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No buses found matching the search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
