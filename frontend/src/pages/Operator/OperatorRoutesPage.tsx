import { useState } from 'react';
import { Plus, Search, MapPin, Edit, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_ROUTES = [
  { id: 'RT-501', source: 'Delhi', destination: 'Manali', distance: '540 km', estDuration: '14h 30m', stops: 4, status: 'ACTIVE' },
  { id: 'RT-502', source: 'Bangalore', destination: 'Chennai', distance: '350 km', estDuration: '6h 45m', stops: 2, status: 'ACTIVE' },
  { id: 'RT-503', source: 'Mumbai', destination: 'Pune', distance: '150 km', estDuration: '3h 15m', stops: 1, status: 'ACTIVE' },
  { id: 'RT-504', source: 'Delhi', destination: 'Jaipur', distance: '280 km', estDuration: '5h 30m', stops: 3, status: 'INACTIVE' },
];

export default function OperatorRoutesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = MOCK_ROUTES.filter(r => 
    r.source.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Route Management</h1>
          <p className="text-slate-500">Define and manage the routes your buses operate on.</p>
        </div>
        <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
          <Plus size={16} /> Add New Route
        </Button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by city (e.g., Delhi)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Route</th>
                <th className="p-4 font-semibold">Distance & Time</th>
                <th className="p-4 font-semibold">Boarding/Dropping Stops</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRoutes.map(route => (
                <tr key={route.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                      {route.source} <ArrowRight size={16} className="text-amber-500" /> {route.destination}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{route.id}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">{route.distance}</p>
                    <p className="text-sm text-slate-500">{route.estDuration} approx.</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-medium text-slate-700 dark:text-slate-300">
                      <MapPin size={14} className="text-slate-400" /> {route.stops} Stops
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      route.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {route.status}
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
          
          {filteredRoutes.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No routes found matching the search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
