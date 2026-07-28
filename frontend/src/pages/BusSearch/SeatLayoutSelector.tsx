import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface Seat {
  id: string;
  seatNumber: string;
  row: number;
  column: number;
  seatClass: string;
  price: number;
  isAvailable: boolean;
  deck?: 'LOWER' | 'UPPER';
}

interface DeckLayout {
  rows: number;
  columns: number;
  seats: Seat[];
}

interface SeatLayoutSelectorProps {
  layout: {
    lowerDeck?: DeckLayout;
    upperDeck?: DeckLayout;
    // Fallback for flat layout
    rows?: number;
    columns?: number;
    seats?: Seat[];
  };
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

export default function SeatLayoutSelector({ layout, selectedSeats, onSeatSelect }: SeatLayoutSelectorProps) {
  const hasDecks = !!layout.lowerDeck || !!layout.upperDeck;
  const [activeDeck, setActiveDeck] = useState<'LOWER' | 'UPPER'>('LOWER');
  const [viewFilter, setViewFilter] = useState<'ALL' | 'AVAILABLE' | 'BOOKED' | 'SELECTED'>('ALL');

  const currentLayoutData = hasDecks 
    ? (activeDeck === 'LOWER' ? layout.lowerDeck : layout.upperDeck) 
    : layout;

  if (!currentLayoutData) return null;

  // Group seats by row and column to render a grid
  const grid: (Seat | null)[][] = Array.from({ length: currentLayoutData.rows || 0 }, () => Array(currentLayoutData.columns || 0).fill(null));
  
  (currentLayoutData.seats || []).forEach(seat => {
    if (seat.row <= (currentLayoutData.rows || 0) && seat.column <= (currentLayoutData.columns || 0)) {
      grid[seat.row - 1][seat.column - 1] = seat;
    }
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 dark:text-white">Select Seats</h3>
        <div className="flex items-center gap-5 text-xs font-medium text-slate-500">
          <span className="mr-1 uppercase tracking-wider text-[10px] font-bold">Filter View:</span>
          
          <button 
            onClick={() => setViewFilter(viewFilter === 'AVAILABLE' ? 'ALL' : 'AVAILABLE')}
            className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${viewFilter === 'AVAILABLE' ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            <div className="w-6 h-4 bg-white border border-slate-300 rounded shadow-sm"></div> Available
          </button>
          
          <button 
            onClick={() => setViewFilter(viewFilter === 'BOOKED' ? 'ALL' : 'BOOKED')}
            className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${viewFilter === 'BOOKED' ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            <div className="w-6 h-4 bg-slate-200 border border-slate-300 rounded shadow-sm"></div> Booked
          </button>
          
          <button 
            onClick={() => setViewFilter(viewFilter === 'SELECTED' ? 'ALL' : 'SELECTED')}
            className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${viewFilter === 'SELECTED' ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            <div className="w-6 h-4 bg-blue-600 border border-blue-600 rounded shadow-sm"></div> Selected
          </button>
        </div>
      </div>

      {hasDecks && (
        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button 
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeDeck === 'LOWER' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              onClick={() => setActiveDeck('LOWER')}
              disabled={!layout.lowerDeck}
            >
              Lower Deck
            </button>
            <button 
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeDeck === 'UPPER' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              onClick={() => setActiveDeck('UPPER')}
              disabled={!layout.upperDeck}
            >
              Upper Deck
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeDeck}
          initial={{ opacity: 0, x: activeDeck === 'UPPER' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeDeck === 'UPPER' ? -20 : 20 }}
          transition={{ duration: 0.2 }}
          className="border-4 border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 max-w-sm mx-auto relative"
        >
          {/* Steering Wheel Indicator (Only show on lower deck if decks exist) */}
          {(!hasDecks || activeDeck === 'LOWER') && (
            <div className="absolute top-4 right-8 w-6 h-6 border-2 border-slate-400 rounded-full flex items-center justify-center opacity-50">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-3">
                {row.map((seat, cIdx) => {
                  const isAisle = cIdx === 1; // Add extra margin after column 2

                  if (!seat) {
                    return <div key={`${rIdx}-${cIdx}`} className={`w-12 h-12 ${isAisle ? 'mr-8' : ''}`}></div>; 
                  }

                  const isSelected = selectedSeats.includes(seat.id);
                  const isSleeper = seat.seatClass === 'SLEEPER';

                  let isVisible = true;
                  if (viewFilter === 'AVAILABLE' && !seat.isAvailable) isVisible = false;
                  if (viewFilter === 'BOOKED' && seat.isAvailable) isVisible = false;
                  if (viewFilter === 'SELECTED' && !isSelected) isVisible = false;

                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={seat.isAvailable ? { scale: 1.05 } : {}}
                      whileTap={seat.isAvailable ? { scale: 0.95 } : {}}
                      disabled={!seat.isAvailable}
                      onClick={() => onSeatSelect(seat.id)}
                      className={`
                        relative flex items-center justify-center transition-colors border-2
                        ${isSleeper ? 'w-12 h-24 rounded-lg' : 'w-12 h-12 rounded-t-xl rounded-b-sm'}
                        ${isAisle ? 'mr-8' : ''}
                        ${!seat.isAvailable ? 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-700 cursor-not-allowed' : ''}
                        ${seat.isAvailable && !isSelected ? 'bg-white border-slate-300 hover:border-blue-400 dark:bg-slate-900 dark:border-slate-600' : ''}
                        ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/50' : ''}
                        ${!isVisible ? 'opacity-20 pointer-events-none' : ''}
                      `}
                      title={`Seat ${seat.seatNumber} - ₹${seat.price}`}
                    >
                      {isSelected && <Check size={16} className={isSleeper ? 'mb-8' : ''} />}
                      
                      {/* Visual styling */}
                      {isSleeper ? (
                        <>
                          <div className={`absolute top-1 left-1 right-1 h-4 rounded-sm ${isSelected ? 'bg-blue-500' : !seat.isAvailable ? 'bg-slate-300 dark:bg-slate-700' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                          <span className="absolute bottom-2 text-[10px] font-bold opacity-60">{seat.seatNumber}</span>
                        </>
                      ) : (
                        <>
                           <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-t-sm ${isSelected ? 'bg-blue-500' : !seat.isAvailable ? 'bg-slate-300 dark:bg-slate-700' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                           <span className="absolute text-[10px] font-bold opacity-60">{seat.seatNumber}</span>
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
