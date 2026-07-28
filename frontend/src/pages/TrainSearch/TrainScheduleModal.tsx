import { motion } from 'framer-motion';
import { X, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrainScheduleModalProps {
  trainNumber: string;
  onClose: () => void;
}

const MOCK_SCHEDULE = [
  { station: 'New Delhi (NDLS)', arr: 'Starts', dep: '16:25', day: 1, dist: 0 },
  { station: 'Mathura Jn (MTJ)', arr: '18:00', dep: '18:05', day: 1, dist: 141 },
  { station: 'Kota Jn (KOTA)', arr: '21:00', dep: '21:10', day: 1, dist: 465 },
  { station: 'Ratlam Jn (RTM)', arr: '00:30', dep: '00:33', day: 2, dist: 732 },
  { station: 'Vadodara Jn (BRC)', arr: '04:10', dep: '04:18', day: 2, dist: 993 },
  { station: 'Surat (ST)', arr: '05:53', dep: '05:58', day: 2, dist: 1122 },
  { station: 'Mumbai Central (MMCT)', arr: '08:15', dep: 'Ends', day: 2, dist: 1385 },
];

export default function TrainScheduleModal({ trainNumber, onClose }: TrainScheduleModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Train Schedule
            </h2>
            <p className="text-slate-500 text-sm mt-1">Train: {trainNumber}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="relative">
            {/* Vertical Line connecting stops */}
            <div className="absolute left-[15px] top-[24px] bottom-[24px] w-0.5 bg-slate-200 dark:bg-slate-700"></div>

            {MOCK_SCHEDULE.map((stop, idx) => (
              <div key={idx} className="flex gap-6 mb-8 last:mb-0 relative z-10">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-2 border-white dark:border-slate-900 flex items-center justify-center font-bold text-xs mt-1">
                  {stop.day}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{stop.station}</h3>
                  <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-slate-400" /> Arr: <span className="font-semibold text-slate-800 dark:text-slate-200">{stop.arr}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-slate-400" /> Dep: <span className="font-semibold text-slate-800 dark:text-slate-200">{stop.dep}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-slate-400" /> {stop.dist} km
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
