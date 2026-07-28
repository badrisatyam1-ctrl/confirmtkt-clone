import { useState } from 'react';
import { Plane, Users, Utensils, Briefcase, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Airplane Layout
const SEAT_ROWS = 15;
const SEAT_COLS = ['A', 'B', 'C', 'D', 'E', 'F'];
const PREMIUM_ROWS = [1, 2, 3];
const EMERGENCY_EXIT_ROWS = [10, 11];

interface FlightSeatSelectorProps {
  passengers: number;
  onSeatsSelected: (seats: string[]) => void;
}

export default function FlightSeatSelector({ passengers, onSeatsSelected }: FlightSeatSelectorProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats] = useState<Set<string>>(new Set(['2A', '2B', '5C', '10D', '10E', '10F']));

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.has(seatId)) return;
    
    let newSelection = [...selectedSeats];
    if (newSelection.includes(seatId)) {
      newSelection = newSelection.filter(id => id !== seatId);
    } else {
      if (newSelection.length < passengers) {
        newSelection.push(seatId);
      } else {
        newSelection.shift(); // Remove oldest to add new (sliding window)
        newSelection.push(seatId);
      }
    }
    
    setSelectedSeats(newSelection);
    onSeatsSelected(newSelection);
  };

  const getSeatStyle = (seatId: string, rowIndex: number) => {
    const isBooked = bookedSeats.has(seatId);
    const isSelected = selectedSeats.includes(seatId);
    const isPremium = PREMIUM_ROWS.includes(rowIndex);
    const isExit = EMERGENCY_EXIT_ROWS.includes(rowIndex);

    if (isBooked) return 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300 dark:bg-slate-800 dark:border-slate-700';
    if (isSelected) return 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-110';
    if (isPremium) return 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 dark:bg-purple-900/30 dark:border-purple-700/50';
    if (isExit) return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:border-green-700/50';
    
    return 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-blue-900/30';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Plane className="rotate-90" /> Select Seats
        </h3>
        <span className="text-sm font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full">
          {selectedSeats.length} / {passengers} Selected
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 text-sm justify-center">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-white border border-slate-300 dark:bg-slate-900"></div> Available</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-600"></div> Selected</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800"></div> Booked</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-purple-100 border border-purple-300"></div> Premium (₹500)</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div> XL Seat (₹800)</div>
      </div>

      {/* Airplane Hull Container */}
      <div className="mx-auto w-full max-w-sm relative">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-4 border-slate-200 dark:border-slate-700 -z-10 -m-6"></div>
        
        {/* Cockpit Indicator */}
        <div className="h-12 border-b-2 border-slate-200 dark:border-slate-700 mb-8 mx-12 rounded-t-[50%]"></div>

        <div className="space-y-3 pb-8">
          {Array.from({ length: SEAT_ROWS }).map((_, rIdx) => {
            const rowNumber = rIdx + 1;
            const isExit = EMERGENCY_EXIT_ROWS.includes(rowNumber);
            
            return (
              <div key={rowNumber}>
                {isExit && (
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-red-500 my-4 border-y border-red-200 dark:border-red-900/30 py-1 bg-red-50 dark:bg-red-900/10 px-2 rounded">
                    <span>Exit</span>
                    <span>Exit</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-4">
                  
                  {/* Left Side (A, B, C) */}
                  <div className="flex gap-2">
                    {SEAT_COLS.slice(0, 3).map(col => {
                      const seatId = `${rowNumber}${col}`;
                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          disabled={bookedSeats.has(seatId)}
                          className={`w-10 h-10 rounded-t-lg rounded-b flex items-center justify-center text-xs font-bold transition-all border-b-4 ${getSeatStyle(seatId, rowNumber)}`}
                        >
                          {col}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle */}
                  <div className="w-8 flex items-center justify-center font-mono text-xs font-bold text-slate-400">
                    {rowNumber}
                  </div>

                  {/* Right Side (D, E, F) */}
                  <div className="flex gap-2">
                    {SEAT_COLS.slice(3, 6).map(col => {
                      const seatId = `${rowNumber}${col}`;
                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          disabled={bookedSeats.has(seatId)}
                          className={`w-10 h-10 rounded-t-lg rounded-b flex items-center justify-center text-xs font-bold transition-all border-b-4 ${getSeatStyle(seatId, rowNumber)}`}
                        >
                          {col}
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
