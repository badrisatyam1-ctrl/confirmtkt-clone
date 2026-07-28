import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { IndianRupee, Users, Ticket, TrendingUp } from 'lucide-react';

const REVENUE_DATA = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const BOOKINGS_BY_MODE = [
  { name: 'Bus', value: 400, color: '#3b82f6' }, // blue-500
  { name: 'Train', value: 300, color: '#10b981' }, // green-500
  { name: 'Flight', value: 300, color: '#f59e0b' }, // amber-500
];

const RECENT_TRANSACTIONS = [
  { id: 'TRX-9829', user: 'Rahul Verma', mode: 'Flight', amount: 12500, status: 'Success', date: 'Just now' },
  { id: 'TRX-9828', user: 'Priya Singh', mode: 'Bus', amount: 1200, status: 'Success', date: '5 mins ago' },
  { id: 'TRX-9827', user: 'Amit Kumar', mode: 'Train', amount: 3400, status: 'Pending', date: '12 mins ago' },
  { id: 'TRX-9826', user: 'Neha Gupta', mode: 'Flight', amount: 8900, status: 'Failed', date: '1 hr ago' },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, Super Admin. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <IndianRupee size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total GMV (MTD)</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹24,59,200</h3>
            <p className="text-sm font-semibold text-green-500 flex items-center mt-1"><TrendingUp size={14} className="mr-1"/> +12.5%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Bookings</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1,204</h3>
            <p className="text-sm font-semibold text-green-500 flex items-center mt-1"><TrendingUp size={14} className="mr-1"/> +5.2%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Users</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">45,231</h3>
            <p className="text-sm font-semibold text-green-500 flex items-center mt-1"><TrendingUp size={14} className="mr-1"/> +2.4%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Pending Refunds</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">24</h3>
            <p className="text-sm font-semibold text-orange-500 flex items-center mt-1">Requires Action</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Revenue Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mode Split Chart */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Bookings by Mode</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BOOKINGS_BY_MODE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {BOOKINGS_BY_MODE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4">
              {BOOKINGS_BY_MODE.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
          <button className="text-blue-600 text-sm font-semibold">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Transaction ID</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Mode</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {RECENT_TRANSACTIONS.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">{trx.id}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{trx.user}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{trx.mode}</td>
                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">₹{trx.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      trx.status === 'Success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      trx.status === 'Pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{trx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
