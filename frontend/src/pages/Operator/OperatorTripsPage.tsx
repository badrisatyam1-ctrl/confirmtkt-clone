import { useState } from 'react';
import { Plus, Search, Filter, Edit, Calendar, Clock, MapPin, Bus, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_TRIPS = [
  { id: 'TRP-101', route: 'Delhi → Manali', date: '2026-07-26', departure: '18:00', arrival: '08:30 (+1)', bus: 'KA-01-AB-1234', driver: 'Ramesh Kumar', fare: 1200, status: 'SCHEDULED', bookedSeats: 28, totalSeats: 32 },
  { id: 'TRP-102', route: 'Manali → Delhi', date: '2026-07-27', departure: '19:30', arrival: '10:00 (+1)', bus: 'KA-01-AB-1234', driver: 'Ramesh Kumar', fare: 1200, status: 'SCHEDULED', bookedSeats: 15, totalSeats: 32 },
  { id: 'TRP-103', route: 'Delhi → Jaipur', date: '2026-07-26', departure: '06:00', arrival: '11:30', bus: 'DL-05-GH-3456', driver: 'Vikram Singh', fare: 800, status: 'ONGOING', bookedSeats: 32, totalSeats: 32 },
  { id: 'TRP-104', route: 'Bangalore → Chennai', date: '2026-07-25', departure: '22:00', arrival: '04:45 (+1)', bus: 'KA-01-CD-5678', driver: 'Suresh Yadav', fare: 950, status: 'COMPLETED', bookedSeats: 40, totalSeats: 45 },
];

export default function OperatorTripsPage() {
  const [activeTab, setActiveTab] = useState('UPCOMING');

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Trip Schedules</h1>
          <p className="text-slate-500">Manage daily trip schedules, assignments, and active journeys.</p>
        </div>
        <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
          <Plus size={16} /> Schedule Trip
        </Button>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-full md:w-auto">
          {['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === tab ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
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
              placeholder="Search by trip ID, route..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2"><Calendar size={16} /> <span className="hidden md:inline">Date</span></Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Trip Details</th>
                <th className="p-4 font-semibold">Timing</th>
                <th className="p-4 font-semibold">Bus & Driver</th>
                <th className="p-4 font-semibold">Fare</th>
                <th className="p-4 font-semibold">Occupancy</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_TRIPS.map(trip => (
                <tr key={trip.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <MapPin size={16} className="text-amber-500" /> {trip.route}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{trip.id}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <Calendar size={14} className="text-slate-400" /> {trip.date}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={12} /> {trip.departure} — {trip.arrival}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm font-mono text-slate-900 dark:text-white mb-1">
                      <Bus size={14} className="text-slate-400" /> {trip.bus}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Car size={12} /> {trip.driver}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    ₹{trip.fare}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden w-24">
                        <div 
                          className={`h-full ${trip.bookedSeats === trip.totalSeats ? 'bg-green-500' : 'bg-blue-500'}`} 
                          style={{ width: `${(trip.bookedSeats / trip.totalSeats) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {trip.bookedSeats}/{trip.totalSeats}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      trip.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      trip.status === 'ONGOING' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8">Manage</Button>
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
