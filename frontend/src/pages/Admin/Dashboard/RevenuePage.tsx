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
import { Download, Filter, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MONTHLY_REVENUE = [
  { name: 'Jan', bus: 4000, train: 2400, flight: 2400 },
  { name: 'Feb', bus: 3000, train: 1398, flight: 2210 },
  { name: 'Mar', bus: 2000, train: 9800, flight: 2290 },
  { name: 'Apr', bus: 2780, train: 3908, flight: 2000 },
  { name: 'May', bus: 1890, train: 4800, flight: 2181 },
  { name: 'Jun', bus: 2390, train: 3800, flight: 2500 },
  { name: 'Jul', bus: 3490, train: 4300, flight: 2100 },
];

export default function RevenuePage() {
  const [timeframe, setTimeframe] = useState('6M');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Revenue & Financials</h1>
          <p className="text-slate-500">Detailed breakdown of platform earnings and operator payouts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Download size={16} /> Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500 mb-2">Total Platform Revenue (YTD)</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">₹1,42,50,000</h3>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded font-semibold">+18% YoY</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500 mb-2">Platform Fees Collected</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">₹12,45,000</h3>
          <p className="text-sm text-slate-500 mt-4">Based on 5% standard commission</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500 mb-2">Pending Operator Payouts</p>
          <h3 className="text-3xl font-bold text-orange-600 dark:text-orange-500">₹4,20,000</h3>
          <Button variant="link" className="text-blue-600 p-0 h-auto mt-4 font-semibold">Initiate Payouts →</Button>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue by Transport Mode</h3>
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
        
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={MONTHLY_REVENUE}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="bus" stackId="a" fill="#3b82f6" name="Bus" radius={[0, 0, 4, 4]} />
              <Bar dataKey="train" stackId="a" fill="#10b981" name="Train" />
              <Bar dataKey="flight" stackId="a" fill="#f59e0b" name="Flight" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
