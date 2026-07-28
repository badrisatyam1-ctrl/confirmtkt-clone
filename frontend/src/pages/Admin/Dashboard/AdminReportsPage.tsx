import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Filter, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DAILY_BOOKINGS = [
  { date: 'Jul 19', bus: 45, train: 32, flight: 18 },
  { date: 'Jul 20', bus: 52, train: 28, flight: 22 },
  { date: 'Jul 21', bus: 38, train: 41, flight: 15 },
  { date: 'Jul 22', bus: 60, train: 35, flight: 30 },
  { date: 'Jul 23', bus: 55, train: 50, flight: 25 },
  { date: 'Jul 24', bus: 48, train: 38, flight: 28 },
  { date: 'Jul 25', bus: 65, train: 42, flight: 35 },
];

const USER_GROWTH = [
  { month: 'Jan', users: 12000 },
  { month: 'Feb', users: 14500 },
  { month: 'Mar', users: 18200 },
  { month: 'Apr', users: 22000 },
  { month: 'May', users: 28500 },
  { month: 'Jun', users: 35000 },
  { month: 'Jul', users: 45231 },
];

const CANCELLATION_REASONS = [
  { name: 'Change of plans', value: 40, color: '#3b82f6' },
  { name: 'Found cheaper', value: 25, color: '#f59e0b' },
  { name: 'Schedule conflict', value: 20, color: '#10b981' },
  { name: 'Medical', value: 10, color: '#ef4444' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const TOP_ROUTES = [
  { route: 'Delhi → Mumbai', bookings: 2450, revenue: 1245000, mode: 'BUS' },
  { route: 'Bangalore → Chennai', bookings: 1890, revenue: 945000, mode: 'BUS' },
  { route: 'Delhi → Goa', bookings: 1650, revenue: 3300000, mode: 'FLIGHT' },
  { route: 'Mumbai → Pune', bookings: 1420, revenue: 568000, mode: 'TRAIN' },
  { route: 'Kolkata → Delhi', bookings: 1200, revenue: 2400000, mode: 'FLIGHT' },
];

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('BOOKINGS');

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-slate-500">In-depth platform performance reports and data exports.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {['BOOKINGS', 'USERS', 'CANCELLATIONS'].map(t => (
              <button
                key={t}
                onClick={() => setReportType(t)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${reportType === t ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
              >
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Download size={16} /> Export Report
          </Button>
        </div>
      </div>

      {/* Bookings Report */}
      {reportType === 'BOOKINGS' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Daily Bookings Area Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Daily Bookings (Last 7 Days)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DAILY_BOOKINGS} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorBus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTrain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFlight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="bus" stackId="1" stroke="#3b82f6" fill="url(#colorBus)" strokeWidth={2} name="Bus" />
                  <Area type="monotone" dataKey="train" stackId="1" stroke="#10b981" fill="url(#colorTrain)" strokeWidth={2} name="Train" />
                  <Area type="monotone" dataKey="flight" stackId="1" stroke="#f59e0b" fill="url(#colorFlight)" strokeWidth={2} name="Flight" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Routes Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><FileText size={18} /> Top Routes by Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">#</th>
                    <th className="p-4 font-semibold">Route</th>
                    <th className="p-4 font-semibold">Mode</th>
                    <th className="p-4 font-semibold">Bookings</th>
                    <th className="p-4 font-semibold">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {TOP_ROUTES.map((route, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-bold text-slate-400 text-lg">{idx + 1}</td>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">{route.route}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                          route.mode === 'BUS' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          route.mode === 'TRAIN' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {route.mode}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{route.bookings.toLocaleString()}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">₹{(route.revenue / 100000).toFixed(1)}L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users Report */}
      {reportType === 'USERS' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">User Growth (2026)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={USER_GROWTH} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5, fill: '#8b5cf6' }} activeDot={{ r: 8 }} name="Total Users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Cancellations Report */}
      {reportType === 'CANCELLATIONS' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Cancellation Reasons</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CANCELLATION_REASONS}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                      label={({ name, percent = 0 }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {CANCELLATION_REASONS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Cancellation Stats</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Total Cancellations (MTD)</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">342</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Cancellation Rate</span>
                  <span className="text-2xl font-bold text-red-600">8.2%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Total Refund Amount</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">₹4,82,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Avg Refund Time</span>
                  <span className="text-2xl font-bold text-green-600">2.4 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
