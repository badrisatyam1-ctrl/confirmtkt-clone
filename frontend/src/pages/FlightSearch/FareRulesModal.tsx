import { motion } from 'framer-motion';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FareRulesModalProps {
  onClose: () => void;
}

export default function FareRulesModal({ onClose }: FareRulesModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Fare Rules & Policies
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <ShieldAlert className="text-orange-500" size={18} /> Cancellation Policy
            </h3>
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30 rounded-lg p-4 text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex justify-between border-b border-orange-100 dark:border-orange-800/30 pb-2">
                <span>0 - 2 hours before departure</span>
                <span className="font-bold">Non-Refundable</span>
              </div>
              <div className="flex justify-between border-b border-orange-100 dark:border-orange-800/30 pb-2 pt-1">
                <span>2 hours to 3 days before</span>
                <span className="font-bold">₹3,500 Fee</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>3 days to 365 days</span>
                <span className="font-bold">₹3,000 Fee</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <CheckCircle2 className="text-green-500" size={18} /> Date Change Policy
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg p-4 text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-600 pb-2">
                <span>0 - 2 hours before departure</span>
                <span className="font-bold">Not Allowed</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-600 pb-2 pt-1">
                <span>2 hours to 3 days before</span>
                <span className="font-bold">₹3,000 + Fare Diff</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>3 days to 365 days</span>
                <span className="font-bold">₹2,500 + Fare Diff</span>
              </div>
            </div>
          </div>

        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center">
          <Button onClick={onClose} className="w-full sm:w-auto">I Understand</Button>
        </div>
      </motion.div>
    </div>
  );
}
