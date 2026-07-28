import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const OCCUPANCY_DATA = [
  { name: 'Mon', 'Delhi-Manali': 85, 'Manali-Delhi': 90, 'Delhi-Jaipur': 60 },
  { name: 'Tue', 'Delhi-Manali': 80, 'Manali-Delhi': 85, 'Delhi-Jaipur': 55 },
  { name: 'Wed', 'Delhi-Manali': 75, 'Manali-Delhi': 70, 'Delhi-Jaipur': 80 },
  { name: 'Thu', 'Delhi-Manali': 95, 'Manali-Delhi': 80, 'Delhi-Jaipur': 65 },
  { name: 'Fri', 'Delhi-Manali': 100, 'Manali-Delhi': 95, 'Delhi-Jaipur': 90 },
  { name: 'Sat', 'Delhi-Manali': 100, 'Manali-Delhi': 100, 'Delhi-Jaipur': 95 },
  { name: 'Sun', 'Delhi-Manali': 90, 'Manali-Delhi': 85, 'Delhi-Jaipur': 80 },
];

export default function OperatorReportsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Detailed Reports</h1>
          <p className="text-slate-500">Generate and download comprehensive operational reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Reports Generator Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Generate New Report</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Report Type</label>
                <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800">
                  <option>Booking Summary (Detailed)</option>
                  <option>Revenue & Taxation</option>
                  <option>Route Performance Analysis</option>
                  <option>Driver Trip Logs</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800" />
                  <input type="date" className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="format" defaultChecked className="text-amber-600 focus:ring-amber-500" />
                    <span className="text-sm">CSV / Excel</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="format" className="text-amber-600 focus:ring-amber-500" />
                    <span className="text-sm">PDF Document</span>
                  </label>
                </div>
              </div>

              <Button className="w-full mt-4 flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
                <Download size={16} /> Generate & Download
              </Button>
            </div>
          </div>
        </div>

        {/* Visual Report */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Route Occupancy (%) - Last 7 Days</h3>
              <Button variant="outline" size="sm" className="h-8"><Filter size={14} className="mr-2" /> Filter Routes</Button>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OCCUPANCY_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={((value: any) => [`${value}%`, undefined]) as any}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Delhi-Manali" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Manali-Delhi" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Delhi-Jaipur" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
