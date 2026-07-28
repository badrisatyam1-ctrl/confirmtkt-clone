import { useState } from 'react';
import { Search, Train, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_PNR_DATA = {
  pnr: '8901234567',
  trainNumber: '12951',
  trainName: 'Rajdhani Express',
  boardingDate: '2026-07-26T16:25:00Z',
  boardingStation: 'NDLS (New Delhi)',
  droppingStation: 'MMCT (Mumbai Central)',
  chartStatus: 'Chart Prepared',
  passengers: [
    { name: 'John Doe', age: 28, gender: 'MALE', bookingStatus: 'CNF', currentStatus: 'CNF', coach: 'A1', berth: '12', type: 'LOWER' },
    { name: 'Jane Doe', age: 26, gender: 'FEMALE', bookingStatus: 'CNF', currentStatus: 'CNF', coach: 'A1', berth: '14', type: 'UPPER' }
  ]
};

export default function PnrStatusPage() {
  const [pnrInput, setPnrInput] = useState('');
  const [pnrData, setPnrData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnrInput.length !== 10) {
      setError('PNR must be exactly 10 digits.');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPnrData(MOCK_PNR_DATA);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Check PNR Status</h1>
          <p className="text-slate-500 max-w-lg mx-auto">Enter your 10-digit PNR number to check current reservation status, coach number, and berth details.</p>
        </div>

        <form onSubmit={handleCheck} className="max-w-xl mx-auto mb-12">
          <div className="flex bg-white dark:bg-slate-900 rounded-xl p-2 shadow-md border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500">
            <Input 
              type="text"
              placeholder="Enter 10-digit PNR"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="border-0 focus-visible:ring-0 text-lg py-6"
            />
            <Button type="submit" disabled={isLoading} className="h-full py-6 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-bold">
              {isLoading ? 'Checking...' : <Search size={20} />}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>

        {pnrData && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
            
            <div className="flex flex-col md:flex-row justify-between border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">PNR Number</p>
                <p className="text-3xl font-mono font-bold text-slate-900 dark:text-white">{pnrData.pnr}</p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <div className="flex items-center gap-2 md:justify-end mb-1">
                  <Train size={18} className="text-blue-500" />
                  <span className="font-bold text-slate-900 dark:text-white">{pnrData.trainName} ({pnrData.trainNumber})</span>
                </div>
                <p className="text-slate-500 text-sm">
                  {pnrData.boardingStation} → {pnrData.droppingStation}
                </p>
                <p className="text-slate-500 text-sm">
                  {new Date(pnrData.boardingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' })}
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Charting Status</span>
              <span className={`text-sm font-bold flex items-center gap-1 ${pnrData.chartStatus.includes('Prepared') ? 'text-green-600' : 'text-orange-500'}`}>
                {pnrData.chartStatus.includes('Prepared') ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                {pnrData.chartStatus}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Passenger Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4 rounded-tl-lg">Passenger</th>
                    <th className="p-4">Booking Status</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4 rounded-tr-lg">Coach / Berth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pnrData.passengers.map((p: any, idx: number) => (
                    <tr key={idx}>
                      <td className="p-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.age} Yrs | {p.gender}</p>
                      </td>
                      <td className="p-4 font-mono text-sm text-slate-600 dark:text-slate-400">{p.bookingStatus}</td>
                      <td className="p-4">
                        <span className={`font-mono text-sm font-bold px-2 py-1 rounded ${p.currentStatus === 'CNF' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700'}`}>
                          {p.currentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        {p.currentStatus === 'CNF' ? (
                          <div className="flex gap-2 items-center">
                            <span className="font-bold text-slate-900 dark:text-white">{p.coach}</span>
                            <span className="text-slate-300">|</span>
                            <span className="font-bold text-slate-900 dark:text-white">{p.berth}</span>
                            <span className="text-xs text-slate-500 ml-1">({p.type})</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
