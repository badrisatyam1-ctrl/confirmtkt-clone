import { useState } from 'react';
import { Search, Filter, Download, MoreVertical, MapPin, Calendar, Clock, Eye, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_BOOKINGS = [
  { id: 'B-8831', pnr: 'PNR837192', customer: 'Rahul Verma', phone: '+91 9876543210', route: 'Delhi → Manali', bus: 'KA-01-AB-1234', tripId: 'TRP-101', date: '26 Jul 2026, 18:00', seats: '12, 13', amount: 2400, status: 'CONFIRMED' },
  { id: 'B-8832', pnr: 'PNR837193', customer: 'Neha Sharma', phone: '+91 9876543211', route: 'Manali → Delhi', bus: 'KA-01-AB-1234', tripId: 'TRP-102', date: '27 Jul 2026, 19:30', seats: '4', amount: 1200, status: 'CONFIRMED' },
  { id: 'B-8833', pnr: 'PNR837194', customer: 'Amit Kumar', phone: '+91 9876543212', route: 'Delhi → Jaipur', bus: 'DL-05-EF-9012', tripId: 'TRP-103', date: '26 Jul 2026, 06:00', seats: '8, 9, 10, 11', amount: 3200, status: 'PENDING' },
  { id: 'B-8834', pnr: 'PNR837195', customer: 'Priya Singh', phone: '+91 9876543213', route: 'Jaipur → Delhi', bus: 'DL-05-EF-9012', tripId: 'TRP-104', date: '28 Jul 2026, 14:00', seats: '1, 2', amount: 1600, status: 'CANCELLED' },
];

export default function OperatorBookingsPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredBookings = activeTab === 'ALL' ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter(b => b.status === activeTab);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Bookings</h1>
          <p className="text-slate-500">Manage all passenger bookings for your fleet.</p>
        </div>
        <Button className="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
          <Download size={16} /> Export Data
        </Button>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-full md:w-auto">
          {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map(tab => (
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
              placeholder="Search PNR, phone, name..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2"><Filter size={16} /> <span className="hidden md:inline">Filters</span></Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Booking ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Route & Bus</th>
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold">Seats</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBookings.map(booking => (
                <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-slate-900 dark:text-white">{booking.pnr}</p>
                    <p className="text-xs text-slate-500">{booking.id}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-900 dark:text-white">{booking.customer}</p>
                    <p className="text-xs text-slate-500">{booking.phone}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 font-medium text-slate-900 dark:text-white">
                      <MapPin size={14} className="text-amber-500" /> {booking.route}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{booking.bus} ({booking.tripId})</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                      <Calendar size={14} className="text-slate-400" /> {booking.date.split(',')[0]}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <Clock size={12} /> {booking.date.split(',')[1]}
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">
                    {booking.seats}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    ₹{booking.amount}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      booking.status === 'PENDING' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30" title="Cancel Booking">
                        <Ban size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBookings.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No bookings found matching the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
