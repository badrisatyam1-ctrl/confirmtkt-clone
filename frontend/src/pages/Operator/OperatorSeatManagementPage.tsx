import { useState } from 'react';
import { Search, MapPin, Calendar, Bus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for a 2x2 Seater Bus
const SEAT_LAYOUT = [
  ['1A', '1B', 'space', '1C', '1D'],
  ['2A', '2B', 'space', '2C', '2D'],
  ['3A', '3B', 'space', '3C', '3D'],
  ['4A', '4B', 'space', '4C', '4D'],
  ['5A', '5B', 'space', '5C', '5D'],
  ['6A', '6B', 'space', '6C', '6D'],
  ['7A', '7B', 'space', '7C', '7D'],
  ['8A', '8B', '8C', '8D', '8E'], // Back row is fully connected
];

// Map of seat status
const MOCK_SEAT_STATUS: Record<string, 'AVAILABLE' | 'BOOKED' | 'BLOCKED'> = {
  '1A': 'BOOKED',
  '1B': 'BOOKED',
  '2C': 'BLOCKED',
  '2D': 'BLOCKED',
  '4A': 'BOOKED',
  '8E': 'BOOKED',
};

export default function OperatorSeatManagementPage() {
  const [selectedTrip, setSelectedTrip] = useState('TRP-101');
  const [seatStatusMap, setSeatStatusMap] = useState(MOCK_SEAT_STATUS);
  const [hasChanges, setHasChanges] = useState(false);

  // Toggle block/unblock for available seats
  const handleSeatClick = (seatId: string) => {
    const currentStatus = seatStatusMap[seatId] || 'AVAILABLE';
    
    // Can only toggle between AVAILABLE and BLOCKED. Can't change BOOKED seats here.
    if (currentStatus === 'BOOKED') return;

    setSeatStatusMap(prev => ({
      ...prev,
      [seatId]: currentStatus === 'AVAILABLE' ? 'BLOCKED' : 'AVAILABLE'
    }));
    setHasChanges(true);
  };

  const getSeatColor = (status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED') => {
    switch(status) {
      case 'BOOKED': return 'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500';
      case 'BLOCKED': return 'bg-red-100 text-red-600 border border-red-300 dark:bg-red-900/30 dark:border-red-800';
      case 'AVAILABLE': return 'bg-white text-slate-700 border border-slate-300 hover:border-amber-500 hover:text-amber-600 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Seat Management</h1>
          <p className="text-slate-500">Block or unblock seats for specific trips.</p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white animate-in fade-in zoom-in duration-200">
              <Save size={16} /> Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Trip Selector Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="space-y-1 flex-1 md:w-64">
            <label className="text-xs font-semibold text-slate-500 uppercase">Select Trip</label>
            <select 
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="TRP-101">TRP-101 (Delhi → Manali)</option>
              <option value="TRP-102">TRP-102 (Manali → Delhi)</option>
              <option value="TRP-103">TRP-103 (Delhi → Jaipur)</option>
            </select>
          </div>
        </div>

        {/* Trip Summary Snippet */}
        <div className="flex items-center gap-6 px-4 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-amber-500" />
            <div className="text-sm font-semibold">Delhi → Manali</div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <div className="text-sm font-semibold">26 Jul, 18:00</div>
          </div>
          <div className="flex items-center gap-2">
            <Bus size={16} className="text-slate-400" />
            <div className="text-sm font-semibold">KA-01-AB-1234</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Seat Legend & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Legend</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-t-lg rounded-b-sm flex items-center justify-center ${getSeatColor('AVAILABLE')}`}></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-t-lg rounded-b-sm flex items-center justify-center ${getSeatColor('BOOKED')}`}></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Booked (Cannot modify)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-t-lg rounded-b-sm flex items-center justify-center ${getSeatColor('BLOCKED')}`}></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Blocked (By Operator)</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-slate-500 leading-relaxed bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-400 p-3 rounded border border-amber-200 dark:border-amber-900/50">
              Click on an available seat to block it from customer booking. Click a blocked seat to unblock it.
            </p>
          </div>
        </div>

        {/* Interactive Seat Map */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex justify-center">
          <div className="w-full max-w-sm">
            <div className="mb-6 flex justify-end px-8">
              <div className="w-10 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-b-2 border-slate-300 dark:border-slate-700 rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-700">
              <div className="space-y-4">
                {SEAT_LAYOUT.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-between">
                    {row.map((seatId, colIndex) => {
                      if (seatId === 'space') {
                        return <div key={`space-${rowIndex}-${colIndex}`} className="w-8 md:w-10"></div>;
                      }

                      const status = seatStatusMap[seatId] || 'AVAILABLE';

                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={status === 'BOOKED'}
                          className={`
                            relative w-10 h-12 flex items-center justify-center text-xs font-bold transition-all
                            rounded-t-xl rounded-b-sm border-b-4 border-slate-300/50
                            ${getSeatColor(status)}
                            ${status === 'AVAILABLE' ? 'hover:-translate-y-1 shadow-sm' : ''}
                          `}
                          title={`Seat ${seatId} - ${status}`}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
