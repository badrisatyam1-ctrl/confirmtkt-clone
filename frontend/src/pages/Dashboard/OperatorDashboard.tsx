import { useState } from 'react';
import { Users, TrendingUp, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OperatorDashboard() {
  const [activeTrips] = useState(12);
  const [totalRevenue] = useState(452000);
  const [occupancyRate] = useState(85);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Operator Dashboard</h1>
          <p className="text-slate-500">Manage your fleet, trips, and view passenger manifests.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Add New Trip</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Bus size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Active Trips Today</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{activeTrips}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Today's Revenue</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Avg. Occupancy</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{occupancyRate}%</p>
          </div>
        </div>
      </div>

      {/* Active Trips Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Today's Departures</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Trip ID</th>
                <th className="px-6 py-4 font-medium">Route</th>
                <th className="px-6 py-4 font-medium">Vehicle</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Occupancy</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-slate-700 dark:text-slate-300">TRP-001</td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Delhi → Manali</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Volvo B11R (DL1PC1234)</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">18:00</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-xs font-medium">36/40</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm">Manifest</Button>
                </td>
              </tr>
              {/* Add more mock rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
