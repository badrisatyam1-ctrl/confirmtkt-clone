import { Search, MapPin, Phone, Star, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_DRIVERS = [
  { id: 'DRV-101', name: 'Ramesh Kumar', phone: '+91 98765 43210', operator: 'SRS Travels', rating: 4.8, trips: 1240, status: 'ACTIVE', vehicle: 'KA-01-AB-1234' },
  { id: 'DRV-102', name: 'Suresh Yadav', phone: '+91 87654 32109', operator: 'VRL Travels', rating: 4.5, trips: 890, status: 'ON_TRIP', vehicle: 'MH-12-CD-5678' },
  { id: 'DRV-103', name: 'Manoj Patel', phone: '+91 76543 21098', operator: 'SRS Travels', rating: 3.9, trips: 420, status: 'INACTIVE', vehicle: 'N/A' },
  { id: 'DRV-104', name: 'Vikram Singh', phone: '+91 65432 10987', operator: 'Zingbus', rating: 4.7, trips: 650, status: 'ACTIVE', vehicle: 'DL-05-EF-9012' },
];

export default function AdminDriversPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Driver Management</h1>
        <p className="text-slate-500">View, manage, and monitor driver assignments and performance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">128</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Total Drivers</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-green-600">84</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-blue-600">32</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">On Trip</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-orange-500">4.6</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Avg Rating</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search drivers by name, ID, or vehicle..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Driver</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Operator</th>
                <th className="p-4 font-semibold">Vehicle</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold">Trips</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_DRIVERS.map(driver => (
                <tr key={driver.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-sm text-slate-600 dark:text-slate-300">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{driver.name}</p>
                        <p className="text-xs text-slate-500">{driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Phone size={14} className="text-slate-400" /> {driver.phone}
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{driver.operator}</td>
                  <td className="p-4 font-mono text-sm text-slate-900 dark:text-white">{driver.vehicle}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
                      <Star size={14} fill="currentColor" /> {driver.rating}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{driver.trips.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      driver.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      driver.status === 'ON_TRIP' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {driver.status === 'ON_TRIP' ? '🚌 On Trip' : driver.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <MoreVertical size={16} />
                    </Button>
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
