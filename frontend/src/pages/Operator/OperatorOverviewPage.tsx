import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { IndianRupee, Users, Armchair, TrendingUp } from 'lucide-react';

const REVENUE_DATA = [
  { name: 'Mon', revenue: 45000 },
  { name: 'Tue', revenue: 52000 },
  { name: 'Wed', revenue: 48000 },
  { name: 'Thu', revenue: 61000 },
  { name: 'Fri', revenue: 85000 },
  { name: 'Sat', revenue: 110000 },
  { name: 'Sun', revenue: 95000 },
];

const RECENT_BOOKINGS = [
  { id: 'B-8831', route: 'Delhi → Manali', date: '26 Jul 2026', seats: 2, amount: 2400, status: 'CONFIRMED' },
  { id: 'B-8832', route: 'Manali → Delhi', date: '27 Jul 2026', seats: 1, amount: 1200, status: 'CONFIRMED' },
  { id: 'B-8833', route: 'Delhi → Jaipur', date: '26 Jul 2026', seats: 4, amount: 3200, status: 'PENDING' },
  { id: 'B-8834', route: 'Jaipur → Delhi', date: '28 Jul 2026', seats: 2, amount: 1600, status: 'CANCELLED' },
];

export default function OperatorOverviewPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back. Here's your fleet's performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <IndianRupee size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Today's Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹45,200</h3>
            <p className="text-sm font-semibold text-green-500 flex items-center mt-1"><TrendingUp size={14} className="mr-1"/> +8.5%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Passengers</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">184</h3>
            <p className="text-sm font-semibold text-green-500 flex items-center mt-1"><TrendingUp size={14} className="mr-1"/> +12%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Armchair size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Avg Occupancy</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">78%</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">Across 12 trips</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Revenue (This Week)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 8 }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
           <div className="p-6 border-b border-slate-200 dark:border-slate-800">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Bookings</h3>
           </div>
           <div className="p-0">
             {RECENT_BOOKINGS.map(booking => (
               <div key={booking.id} className="p-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                 <div className="flex justify-between items-start mb-1">
                   <span className="font-semibold text-slate-900 dark:text-white">{booking.route}</span>
                   <span className="font-bold text-slate-900 dark:text-white">₹{booking.amount}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500">{booking.date} • {booking.seats} Seats</span>
                   <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                     booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                     booking.status === 'PENDING' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                     'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                   }`}>{booking.status}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>

    </div>
  );
}
