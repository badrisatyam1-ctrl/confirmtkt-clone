import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bus, Plane, Train, Search, Filter, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminFleetPage() {
  const location = useLocation();
  const [mode, setMode] = useState<'BUS' | 'FLIGHT' | 'TRAIN'>('BUS');

  useEffect(() => {
    if (location.pathname.includes('buses')) setMode('BUS');
    else if (location.pathname.includes('flights')) setMode('FLIGHT');
    else if (location.pathname.includes('trains')) setMode('TRAIN');
  }, [location]);

  const MOCK_DATA = {
    BUS: [
      { id: 'V-101', name: 'Volvo 9400 B11R', regNumber: 'KA-01-AB-1234', operator: 'SRS Travels', capacity: 42, status: 'ACTIVE' },
      { id: 'V-102', name: 'Scania Metrolink', regNumber: 'MH-12-CD-5678', operator: 'VRL Travels', capacity: 45, status: 'MAINTENANCE' },
    ],
    FLIGHT: [
      { id: 'V-201', name: 'Airbus A320neo', regNumber: 'VT-IZK', operator: 'IndiGo', capacity: 180, status: 'ACTIVE' },
      { id: 'V-202', name: 'Boeing 737 MAX', regNumber: 'VT-SZM', operator: 'SpiceJet', capacity: 189, status: 'ACTIVE' },
    ],
    TRAIN: [
      { id: 'V-301', name: 'Rajdhani Express', regNumber: '12951', operator: 'Indian Railways', capacity: 950, status: 'ACTIVE' },
      { id: 'V-302', name: 'Vande Bharat', regNumber: '22436', operator: 'Indian Railways', capacity: 1128, status: 'INACTIVE' },
    ]
  };

  const getIcon = () => {
    if (mode === 'BUS') return <Bus size={24} className="text-blue-600" />;
    if (mode === 'FLIGHT') return <Plane size={24} className="text-blue-600" />;
    return <Train size={24} className="text-blue-600" />;
  };

  const data = MOCK_DATA[mode];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{mode.toLowerCase()} Fleet Management</h1>
            <p className="text-slate-500">Manage vehicles, capacities, and maintenance status.</p>
          </div>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus size={16} /> Add New {mode.toLowerCase()}
        </Button>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder={`Search ${mode.toLowerCase()}s by name or registration...`} 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button variant="outline" className="ml-4"><Filter size={16} /> <span className="hidden md:inline ml-2">Filters</span></Button>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">ID / Reg No</th>
                <th className="p-4 font-semibold">Model / Name</th>
                <th className="p-4 font-semibold">Operator</th>
                <th className="p-4 font-semibold">Capacity</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white">{item.regNumber}</p>
                    <p className="text-xs text-slate-500">{item.id}</p>
                  </td>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{item.operator}</td>
                  <td className="p-4 font-mono text-slate-900 dark:text-white">{item.capacity} Seats</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      item.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      item.status === 'MAINTENANCE' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                        <Trash2 size={16} />
                      </Button>
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
