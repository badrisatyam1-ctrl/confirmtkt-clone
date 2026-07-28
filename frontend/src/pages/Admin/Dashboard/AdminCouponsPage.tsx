import { Search, Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_COUPONS = [
  { id: 'CPN-101', code: 'SUMMER50', type: 'PERCENTAGE', value: 50, maxDiscount: 500, validUntil: '2026-08-31', status: 'ACTIVE' },
  { id: 'CPN-102', code: 'FLAT200', type: 'FIXED', value: 200, maxDiscount: 200, validUntil: '2026-12-31', status: 'ACTIVE' },
  { id: 'CPN-103', code: 'NEWUSER', type: 'PERCENTAGE', value: 100, maxDiscount: 1000, validUntil: '2026-05-30', status: 'EXPIRED' },
];

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Coupons & Offers</h1>
          <p className="text-slate-500">Create and manage promotional discounts.</p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus size={16} /> Create Coupon
        </Button>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by coupon code..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Code</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Value</th>
                <th className="p-4 font-semibold">Max Discount</th>
                <th className="p-4 font-semibold">Valid Until</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_COUPONS.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                      {coupon.code}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{coupon.type}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {coupon.type === 'PERCENTAGE' ? `${coupon.value}%` : `₹${coupon.value}`}
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">₹{coupon.maxDiscount}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" /> {coupon.validUntil}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      coupon.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                      <Trash2 size={16} />
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
