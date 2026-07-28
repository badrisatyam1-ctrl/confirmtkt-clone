import { useState } from 'react';
import { Plus, Search, Phone, Star, Edit, Trash2, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_DRIVERS = [
  { id: 'DRV-8821', name: 'Ramesh Kumar', phone: '+91 9876543210', license: 'DL-1420210001234', experience: '8 Years', rating: 4.8, status: 'AVAILABLE', currentTrip: null },
  { id: 'DRV-8822', name: 'Suresh Yadav', phone: '+91 9876543211', license: 'HR-2620180005678', experience: '12 Years', rating: 4.9, status: 'ON_TRIP', currentTrip: 'TRP-101' },
  { id: 'DRV-8823', name: 'Manoj Patel', phone: '+91 9876543212', license: 'KA-0120190009012', experience: '5 Years', rating: 4.5, status: 'OFF_DUTY', currentTrip: null },
  { id: 'DRV-8824', name: 'Vikram Singh', phone: '+91 9876543213', license: 'DL-0520220003456', experience: '3 Years', rating: 4.2, status: 'ON_TRIP', currentTrip: 'TRP-103' },
];

export default function OperatorDriversPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = MOCK_DRIVERS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Driver Management</h1>
          <p className="text-slate-500">Manage your driver crew and assignments.</p>
        </div>
        <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
          <Plus size={16} /> Add New Driver
        </Button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
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
                <th className="p-4 font-semibold">Driver Details</th>
                <th className="p-4 font-semibold">License & Exp</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDrivers.map(driver => (
                <tr key={driver.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{driver.name}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <Phone size={12} /> {driver.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-mono text-sm text-slate-900 dark:text-white mb-0.5">{driver.license}</p>
                    <p className="text-xs text-slate-500">{driver.experience}</p>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star size={14} fill="currentColor" /> {driver.rating}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                        driver.status === 'AVAILABLE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        driver.status === 'ON_TRIP' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {driver.status}
                      </span>
                      {driver.currentTrip && (
                        <span className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                          <Bus size={12} /> {driver.currentTrip}
                        </span>
                      )}
                    </div>
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
          
          {filteredDrivers.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No drivers found matching the search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
