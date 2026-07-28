import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { IndianRupee, Download, Calendar, Filter, CreditCard, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MONTHLY_REVENUE = [
  { name: 'Jan', revenue: 450000, platformFee: 45000 },
  { name: 'Feb', revenue: 520000, platformFee: 52000 },
  { name: 'Mar', revenue: 480000, platformFee: 48000 },
  { name: 'Apr', revenue: 610000, platformFee: 61000 },
  { name: 'May', revenue: 850000, platformFee: 85000 },
  { name: 'Jun', revenue: 1100000, platformFee: 110000 },
  { name: 'Jul', revenue: 950000, platformFee: 95000 },
];

const PAYOUT_HISTORY = [
  { id: 'PAY-8921', date: '01 Jul 2026', amount: 990000, period: 'June 2026', status: 'COMPLETED', method: 'Bank Transfer' },
  { id: 'PAY-8842', date: '01 Jun 2026', amount: 765000, period: 'May 2026', status: 'COMPLETED', method: 'Bank Transfer' },
  { id: 'PAY-8711', date: '01 May 2026', amount: 549000, period: 'April 2026', status: 'COMPLETED', method: 'Bank Transfer' },
  { id: 'PAY-8650', date: '01 Apr 2026', amount: 432000, period: 'March 2026', status: 'COMPLETED', method: 'Bank Transfer' },
];

export default function OperatorRevenuePage() {
  const [timeframe, setTimeframe] = useState('6M');

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Revenue & Payouts</h1>
          <p className="text-slate-500">Track your earnings and payout history.</p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Download size={16} /> Export Financials
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <IndianRupee size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Earnings (YTD)</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹49,60,000</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">Gross Revenue</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Banknote size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Platform Fees (YTD)</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹4,96,000</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">10% standard deduction</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Next Payout (Est)</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹8,55,000</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">Scheduled for 01 Aug</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Earnings Breakdown</h3>
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {['1M', '3M', '6M', '1Y'].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${timeframe === t ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_REVENUE} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={((value: any) => [`₹${value.toLocaleString()}`, undefined]) as any}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="revenue" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} name="Net Earnings" />
              <Bar dataKey="platformFee" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Platform Fee" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white">Payout History</h3>
          <Button variant="outline" size="sm" className="h-8"><Filter size={14} className="mr-2" /> Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Payout ID</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Period</th>
                <th className="p-4 font-semibold">Method</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PAYOUT_HISTORY.map(payout => (
                <tr key={payout.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">{payout.id}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" /> {payout.date}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{payout.period}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{payout.method}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">₹{payout.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {payout.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                      <Download size={14} className="mr-1" /> PDF
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
