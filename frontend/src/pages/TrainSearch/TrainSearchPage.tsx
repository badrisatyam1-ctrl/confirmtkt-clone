import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Train, Clock, MapPin, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrainScheduleModal from './TrainScheduleModal';

// Mock data for train search
const MOCK_TRAINS = [
  {
    id: 'trip-101',
    trainNumber: '12951',
    trainName: 'Rajdhani Express',
    originStation: 'NDLS (New Delhi)',
    destinationStation: 'MMCT (Mumbai Central)',
    departureTime: '16:25',
    arrivalTime: '08:15 (+1)',
    duration: '15h 50m',
    availableClasses: ['1A', '2A', '3A'],
    availability: {
      '1A': { status: 'AVL-12', fare: 4850, available: 12 },
      '2A': { status: 'WL-4', fare: 2950, available: 0 },
      '3A': { status: 'RAC-15', fare: 2150, available: 0 },
    }
  },
  {
    id: 'trip-102',
    trainNumber: '12909',
    trainName: 'Garib Rath Express',
    originStation: 'NZM (Nizamuddin)',
    destinationStation: 'BDTS (Bandra Terminus)',
    departureTime: '15:35',
    arrivalTime: '08:10 (+1)',
    duration: '16h 35m',
    availableClasses: ['3A', 'CC'],
    availability: {
      '3A': { status: 'AVL-45', fare: 1050, available: 45 },
      'CC': { status: 'AVL-120', fare: 850, available: 120 },
    }
  }
];

export default function TrainSearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin') || 'New Delhi';
  const destination = searchParams.get('destination') || 'Mumbai';
  const dateParam = searchParams.get('date');
  const dateDisplay = dateParam ? new Date(dateParam).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '26 Jul, 2026';

  const [expandedTrain, setExpandedTrain] = useState<string | null>(null);
  const [selectedTrainForSchedule, setSelectedTrainForSchedule] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTrain(prev => prev === id ? null : id);
  };

  const handleBook = (tripId: string, seatClass: string) => {
    // Navigate to checkout passing class in state/query
    navigate(`/train/booking/${tripId}?class=${seatClass}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
              <Train size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{origin} → {destination}</h1>
              <p className="text-slate-500">{dateDisplay} | 2 Passengers</p>
            </div>
          </div>
          <Button variant="outline">Modify Search</Button>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {MOCK_TRAINS.map(train => (
            <motion.div 
              key={train.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{train.trainName}</h2>
                      <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                        {train.trainNumber}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-8 mt-6">
                      <div>
                        <p className="text-xl font-bold text-slate-800 dark:text-white">{train.departureTime}</p>
                        <p className="text-xs text-slate-500">{train.originStation}</p>
                      </div>
                      
                      <div className="flex flex-col items-center px-4">
                        <p className="text-xs text-slate-400 mb-1">{train.duration}</p>
                        <div className="w-24 h-px bg-slate-300 dark:bg-slate-700 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-1 text-slate-400">
                            <Clock size={12} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-slate-800 dark:text-white">{train.arrivalTime}</p>
                        <p className="text-xs text-slate-500 text-right">{train.destinationStation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col justify-center items-end gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                    <Button 
                      variant="ghost" 
                      className="text-blue-600 dark:text-blue-400 text-sm h-8"
                      onClick={() => setSelectedTrainForSchedule(train.trainNumber)}
                    >
                      Route / Schedule
                    </Button>
                    <Button 
                      onClick={() => toggleExpand(train.id)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 w-full md:w-auto"
                    >
                      Check Availability {expandedTrain === train.id ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                    </Button>
                  </div>

                </div>
              </div>

              {/* Expandable Availability Section */}
              <AnimatePresence>
                {expandedTrain === train.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20"
                  >
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Select Class</h4>
                      <div className="flex flex-wrap gap-4">
                        {train.availableClasses.map(cls => {
                          const avl = (train.availability as any)[cls];
                          const isAvailable = avl.available > 0;
                          const statusColor = isAvailable 
                            ? 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50' 
                            : 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800/50';

                          return (
                            <div key={cls} className={`flex flex-col border rounded-xl p-4 w-40 transition-colors ${statusColor}`}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-lg">{cls}</span>
                                <span className="font-semibold">₹{avl.fare}</span>
                              </div>
                              <span className={`text-sm font-bold mb-4 ${isAvailable ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                {avl.status}
                              </span>
                              <Button 
                                size="sm" 
                                className={`w-full ${isAvailable ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'}`}
                                onClick={() => handleBook(train.id, cls)}
                              >
                                Book Now
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedTrainForSchedule && (
        <TrainScheduleModal 
          trainNumber={selectedTrainForSchedule} 
          onClose={() => setSelectedTrainForSchedule(null)} 
        />
      )}
    </div>
  );
}
